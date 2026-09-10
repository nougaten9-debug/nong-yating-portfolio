from __future__ import annotations

import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def enrich(path: Path) -> None:
    html = path.read_text(encoding="utf-8")
    first_asset_image = True

    def replace(match: re.Match[str]) -> str:
        nonlocal first_asset_image
        tag = match.group(0)
        src_match = re.search(r'src=["\'](/assets/[^"\']+\.webp)["\']', tag, re.I)
        if not src_match:
            return tag
        file_path = PUBLIC / src_match.group(1).lstrip("/")
        if not file_path.exists():
            return tag
        with Image.open(file_path) as image:
            width, height = image.size
        additions = []
        if not re.search(r"\bwidth=", tag):
            additions.append(f'width="{width}"')
        if not re.search(r"\bheight=", tag):
            additions.append(f'height="{height}"')
        if not re.search(r"\bdecoding=", tag):
            additions.append('decoding="async"')
        if not re.search(r"\bloading=", tag):
            if first_asset_image:
                additions.extend(('loading="eager"', 'fetchpriority="high"'))
            else:
                additions.append('loading="lazy"')
        first_asset_image = False
        return tag[:-1].rstrip() + " " + " ".join(additions) + ">"

    updated = re.sub(r"<img\b[^>]*>", replace, html, flags=re.I)
    path.write_text(updated, encoding="utf-8")


for html_path in PUBLIC.glob("*case-study.html"):
    enrich(html_path)
