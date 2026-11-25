from pathlib import Path
import re

html = Path("out/index.html").read_text(encoding="utf-8")
assets = []
for pattern in [r'href="([^"]+)"', r'src="([^"]+)"']:
    for url in re.findall(pattern, html):
        if any(token in url for token in ["_next", "projects/", "Resume", "icon", "opengraph"]):
            assets.append(url)

print("ASSET URLS")
print("\n".join(assets[:30]))

print("\nMETADATA")
for tag in re.findall(r"<meta[^>]+>", html):
    if "og:" in tag or "twitter:" in tag or "canonical" in tag:
        print(tag[:300])

print("\nKEY FILES")
for file in sorted(Path("out").rglob("*")):
    if file.is_file() and (
        file.name.startswith("opengraph")
        or file.name.startswith("icon")
        or "Resume" in file.name
        or "arc-charger" in file.name
        or file.name == ".nojekyll"
    ):
        print(file.as_posix(), file.stat().st_size)
