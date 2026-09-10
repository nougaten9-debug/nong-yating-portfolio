from __future__ import annotations

import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MODULES = ROOT / "node_modules"
TARGET = ROOT / "public" / "fonts" / "case-study"


def copy_font_package(package: Path, prefix: str, family_from: str, family_to: str) -> str:
    target_files = TARGET / prefix
    target_files.mkdir(parents=True, exist_ok=True)
    for source in (package / "files").glob("*.woff2"):
        shutil.copy2(source, target_files / source.name)
    css = (package / "index.css").read_text(encoding="utf-8")
    css = css.replace("./files/", f"./{prefix}/")
    css = css.replace(family_from, family_to)
    return css


def main() -> None:
    TARGET.mkdir(parents=True, exist_ok=True)
    pieces = [
        copy_font_package(
            MODULES / "@fontsource-variable" / "noto-sans-sc",
            "noto-sans-sc",
            "Noto Sans SC Variable",
            "Noto Sans SC",
        ),
        copy_font_package(
            MODULES / "@fontsource-variable" / "noto-serif-sc",
            "noto-serif-sc",
            "Noto Serif SC Variable",
            "Noto Serif SC",
        ),
    ]

    lxgw_package = MODULES / "lxgw-wenkai-webfont"
    lxgw_target = TARGET / "lxgw-wenkai"
    lxgw_target.mkdir(exist_ok=True)
    for source in (lxgw_package / "files").glob("lxgwwenkai-regular-*.woff2"):
        shutil.copy2(source, lxgw_target / source.name)
    lxgw_css = (lxgw_package / "lxgwwenkai-regular.css").read_text(encoding="utf-8")
    pieces.append(lxgw_css.replace("./files/", "./lxgw-wenkai/"))

    caveat_source = MODULES / "@fontsource" / "caveat" / "files" / "caveat-latin-400-normal.woff2"
    caveat_target = TARGET / "caveat-latin-400-normal.woff2"
    shutil.copy2(caveat_source, caveat_target)
    pieces.append("""
@font-face {
  font-family: 'Caveat';
  font-style: normal;
  font-display: swap;
  font-weight: 400 700;
  src: url('./caveat-latin-400-normal.woff2') format('woff2');
}
""")

    (TARGET / "fonts.css").write_text("\n".join(pieces), encoding="utf-8")
    print(f"files={sum(1 for path in TARGET.rglob('*') if path.is_file())}")
    print(f"bytes={sum(path.stat().st_size for path in TARGET.rglob('*') if path.is_file())}")


if __name__ == "__main__":
    main()
