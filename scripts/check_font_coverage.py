from __future__ import annotations

import html
import re
from pathlib import Path

from fontTools.ttLib import TTFont


root = Path(__file__).resolve().parents[1]
visible = set()
for path in (root / "public").glob("*case-study.html"):
    text = path.read_text(encoding="utf-8")
    text = re.sub(r"<script[\s\S]*?</script>|<style[\s\S]*?</style>", "", text)
    text = html.unescape(re.sub(r"<[^>]+>", "", text))
    visible.update(char for char in text if "\u4e00" <= char <= "\u9fff")

covered = set()
for path in (root / "public" / "fonts").glob("*.woff"):
    font = TTFont(path)
    for table in font["cmap"].tables:
        covered.update(chr(codepoint) for codepoint in table.cmap)

missing = sorted(visible - covered)
print(f"visible_cjk={len(visible)} covered={len(visible & covered)} missing={len(missing)}")
print("".join(missing))
