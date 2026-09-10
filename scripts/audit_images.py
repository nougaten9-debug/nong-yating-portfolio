from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SOURCE_SUFFIXES = {".tsx", ".ts", ".css", ".html"}
IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}


def route_for(path: Path) -> str:
    value = path.as_posix()
    if "OpeningAnimation" in value:
        return "Opening Animation"
    if "resume" in value:
        return "06 Resume & Contact"
    if "ai-lab" in value:
        return "05 AI Lab"
    if "content" in value:
        return "04 Content"
    if "about" in value:
        return "02 About Me"
    if "projects" in value:
        return "03 Projects / project detail"
    if "home" in value or path.name in {"page.tsx", "globals.css"}:
        return "Home"
    return value


def image_dimensions(path: Path) -> tuple[int | None, int | None, str]:
    if path.suffix.lower() == ".svg":
        text = path.read_text(encoding="utf-8", errors="ignore")
        viewbox = re.search(r"viewBox=[\"']([^\"']+)", text, re.I)
        if viewbox:
            nums = viewbox.group(1).replace(",", " ").split()
            if len(nums) == 4:
                return round(float(nums[2])), round(float(nums[3])), "SVG"
        return None, None, "SVG"
    try:
        with Image.open(path) as image:
            return image.width, image.height, image.format or path.suffix[1:].upper()
    except Exception:
        return None, None, path.suffix[1:].upper()


def main() -> None:
    source_files = [
        path
        for base in (ROOT / "app", ROOT / "components", PUBLIC)
        if base.exists()
        for path in base.rglob("*")
        if path.is_file() and path.suffix.lower() in SOURCE_SUFFIXES
    ]
    source_text = {
        path: path.read_text(encoding="utf-8", errors="ignore") for path in source_files
    }

    records = []
    for path in PUBLIC.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in IMAGE_SUFFIXES:
            continue
        rel = path.relative_to(ROOT).as_posix()
        public_url = "/" + path.relative_to(PUBLIC).as_posix()
        used_by = []
        for source_path, text in source_text.items():
            if public_url in text or path.name in text:
                used_by.append(source_path.relative_to(ROOT).as_posix())
        width, height, detected_format = image_dimensions(path)
        pages = sorted({route_for(Path(item)) for item in used_by})
        first_screen = public_url in {
            "/assets/home-base-bw.png",
            "/assets/opening/desk_final_transparent.png",
        }
        records.append(
            {
                "file": path.name,
                "path": rel,
                "url": public_url,
                "format": detected_format,
                "width": width,
                "height": height,
                "bytes": path.stat().st_size,
                "megabytes": round(path.stat().st_size / 1024 / 1024, 3),
                "used_by": used_by,
                "pages": pages,
                "first_screen": first_screen,
            }
        )

    records.sort(key=lambda item: item["bytes"], reverse=True)
    summary = {
        "count": len(records),
        "total_bytes": sum(item["bytes"] for item in records),
        "total_megabytes": round(sum(item["bytes"] for item in records) / 1024 / 1024, 3),
        "over_500kb": sum(item["bytes"] > 500 * 1024 for item in records),
        "over_1mb": sum(item["bytes"] > 1024 * 1024 for item in records),
        "over_3mb": sum(item["bytes"] > 3 * 1024 * 1024 for item in records),
        "records": records,
    }
    report_dir = ROOT / "reports"
    report_dir.mkdir(exist_ok=True)
    report_name = sys.argv[1] if len(sys.argv) > 1 else "image-audit-before.json"
    report_path = report_dir / report_name
    report_path.write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps({key: value for key, value in summary.items() if key != "records"}, ensure_ascii=False, indent=2))
    print(f"report={report_path}")
    for item in records[:30]:
        marker = ">3MB" if item["bytes"] > 3 * 1024 * 1024 else ">1MB" if item["bytes"] > 1024 * 1024 else ">500KB" if item["bytes"] > 500 * 1024 else ""
        print(f"{item['megabytes']:>7.3f} MB {item['width']}x{item['height']} {marker:>6} {item['path']}")


if __name__ == "__main__":
    main()
