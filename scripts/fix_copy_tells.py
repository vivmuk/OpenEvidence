#!/usr/bin/env python3
"""
Strip design-tell punctuation from site copy.

The frontend-design-taste doctrine bans the em-dash outright ("Zero. Anywhere
visible. This is the single most-violated tell."). The research jobs write all
the site's prose, so the dashes accumulate automatically. This removes them
from rendered copy without mangling ranges or code.

Replacement policy:
  '2020—2024'  (between digits)  -> '2020-2024'   a range keeps its hyphen
  'foo — bar'  (spaced, mid-line) -> 'foo - bar'  spaced hyphen, reads clean
  'foo—bar'    (unspaced words)   -> 'foo - bar'  same, spaced for legibility
  en-dash         treated identically

Usage:
    python3 scripts/fix_copy_tells.py            # dry run
    python3 scripts/fix_copy_tells.py --apply    # rewrite files
"""

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGETS = sorted(
    list(ROOT.glob("*.html"))
    + [p for p in (ROOT / "data").glob("*.js") if p.is_file()]
)

EM = "\u2014"   # —
EN = "\u2013"   # –

# digit—digit -> hyphen (ranges, years, scores)
RANGE = re.compile(rf"(\d)\s*[{EM}{EN}]\s*(\d)")
# space + dash + space -> spaced hyphen
SPACED = re.compile(rf"\s*[{EM}{EN}]\s*")
# any surviving dash -> spaced hyphen
BARE = re.compile(rf"[{EM}{EN}]")


def clean(text: str):
    n_range = len(RANGE.findall(text))
    text = RANGE.sub(r"\1-\2", text)
    n_spaced = len(SPACED.findall(text))
    text = SPACED.sub(" - ", text)
    text = BARE.sub(" - ", text)
    return text, n_range, n_spaced


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    total_files = total_dashes = 0
    for p in TARGETS:
        try:
            original = p.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        count = original.count(EM) + original.count(EN)
        if not count:
            continue

        fixed, n_range, n_spaced = clean(original)
        total_files += 1
        total_dashes += count
        rel = p.relative_to(ROOT)
        print(f"  {str(rel):<34} {count:>4} dash(es)  "
              f"({n_range} range, {n_spaced} spaced)")

        if args.apply:
            p.write_text(fixed, encoding="utf-8")

    print(f"\n{'fixed' if args.apply else 'would fix'}: "
          f"{total_dashes} dashes across {total_files} files")
    if not args.apply and total_dashes:
        print("Re-run with --apply to write.")


if __name__ == "__main__":
    main()
