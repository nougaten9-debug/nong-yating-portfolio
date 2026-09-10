from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
BACKUP = ROOT / ".source-assets-original"
SOURCE_DIRS = (ROOT / "app", ROOT / "components", PUBLIC)
RASTER_SUFFIXES = {".png", ".jpg", ".jpeg"}
TEXT_SUFFIXES = {".tsx", ".ts", ".css", ".html"}


def max_dimensions(path: Path) -> tuple[int, int]:
    rel = path.relative_to(PUBLIC).as_posix()
    if rel.startswith("assets/home-") or rel == "assets/desk-base.jpg":
        return 1920, 1200
    if rel.startswith("assets/about-") or "/白底/" in f"/{rel}" or "/原/" in f"/{rel}":
        return 900, 1125
    if rel.startswith("assets/content/"):
        return 900, 1200
    if rel.startswith("assets/ai-lab/books/"):
        return 900, 1200
    if rel.startswith("assets/ai-lab/reader/"):
        return 1800, 1400
    if rel.endswith("resume-contact/portrait.jpg"):
        return 900, 1260
    if rel.startswith("assets/resume-contact/"):
        return 1920, 1200
    if rel.startswith("assets/projects/"):
        return 1920, 1800
    if rel.startswith("assets/opening/"):
        return 1920, 1200
    return 1920, 1400


def resized(image: Image.Image, bounds: tuple[int, int]) -> Image.Image:
    copy = image.copy()
    copy.thumbnail(bounds, Image.Resampling.LANCZOS)
    return copy


def has_alpha(image: Image.Image) -> bool:
    return image.mode in ("RGBA", "LA") or (
        image.mode == "P" and "transparency" in image.info
    )


def convert(path: Path) -> dict:
    rel = path.relative_to(PUBLIC)
    backup = BACKUP / rel
    backup.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, backup)

    destination = path.with_suffix(".webp")
    before = path.stat().st_size
    with Image.open(path) as source:
        source.load()
        alpha = has_alpha(source)
        image = resized(source, max_dimensions(path))
        if alpha:
            image = image.convert("RGBA")
            image.save(destination, "WEBP", quality=92, alpha_quality=100, method=6)
            encoding = "transparent-q92"
        else:
            image = image.convert("RGB")
            quality = 90 if "projects" in rel.as_posix() else 88
            image.save(destination, "WEBP", quality=quality, method=6)
            encoding = f"photo-q{quality}"
        width, height = image.size
    after = destination.stat().st_size
    return {
        "source": path.relative_to(ROOT).as_posix(),
        "backup": backup.relative_to(ROOT).as_posix(),
        "optimized": destination.relative_to(ROOT).as_posix(),
        "before_bytes": before,
        "after_bytes": after,
        "saved_percent": round((1 - after / before) * 100, 2),
        "width": width,
        "height": height,
        "encoding": encoding,
    }


def update_references() -> list[str]:
    changed = []
    asset_pattern = re.compile(r"(/assets/[^\"'\s)]+?)\.(png|jpe?g)(?=([?\"'\s)]|$))", re.I)
    for base in SOURCE_DIRS:
        if not base.exists():
            continue
        for path in base.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            updated = asset_pattern.sub(lambda match: f"{match.group(1)}.webp", text)
            if updated != text:
                path.write_text(updated, encoding="utf-8")
                changed.append(path.relative_to(ROOT).as_posix())
    return changed


def main() -> None:
    sources = sorted(
        path
        for path in PUBLIC.rglob("*")
        if path.is_file() and path.suffix.lower() in RASTER_SUFFIXES
    )
    manifest = [convert(path) for path in sources]
    changed = update_references()

    # Remove deployable originals only after every optimized file exists. The exact
    # originals remain recoverable under .source-assets-original/.
    for item in manifest:
        source = ROOT / item["source"]
        optimized = ROOT / item["optimized"]
        backup = ROOT / item["backup"]
        if optimized.exists() and backup.exists():
            source.unlink()

    report_dir = ROOT / "reports"
    report_dir.mkdir(exist_ok=True)
    payload = {
        "files": len(manifest),
        "before_bytes": sum(item["before_bytes"] for item in manifest),
        "after_bytes": sum(item["after_bytes"] for item in manifest),
        "saved_percent": round(
            (1 - sum(item["after_bytes"] for item in manifest) / sum(item["before_bytes"] for item in manifest)) * 100,
            2,
        ),
        "changed_reference_files": changed,
        "images": sorted(manifest, key=lambda item: item["before_bytes"], reverse=True),
    }
    (report_dir / "image-optimization.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps({key: value for key, value in payload.items() if key not in {"images", "changed_reference_files"}}, ensure_ascii=False, indent=2))
    print(f"changed_reference_files={len(changed)}")


if __name__ == "__main__":
    main()
