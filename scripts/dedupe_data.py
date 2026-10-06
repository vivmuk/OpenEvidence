#!/usr/bin/env python3
"""
Repair OpenEvidence data files: merge duplicates, normalise dates, backfill ids.

Why this exists
---------------
The daily/weekly update jobs deduplicate by matching PMID and arXiv id. PubMed
records were being written *without* a pmid field, so every one of them was
invisible to the dedup check and got re-added on the next sweep. This repairs
the backlog and normalises what's there.

What it does
------------
1. Backfills a missing `pmid` from `id`/`url` when it's clearly present.
2. Normalises `published`/`updated` to YYYY-MM-DD / YYYY-MM / YYYY.
3. Merges records that share a normalised id OR a normalised title.
4. Writes a .bak alongside each changed file.

Duplicates are merged by keeping the most complete record and filling any of
its empty fields from the others (list fields are unioned).

Usage:
    python3 scripts/dedupe_data.py            # dry run (default) — report only
    python3 scripts/dedupe_data.py --apply    # write changes
"""

import argparse
import json
import re
import shutil
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = [ROOT / "data" / "research.json", ROOT / "data" / "benchmarks.json"]

DATE_FIELDS = ("published", "updated", "date")
LIST_FIELDS = ("key_findings", "tags", "authors_list")
ARXIV_IN_URL = re.compile(r"(\d{4}\.\d{4,5})")
PMID_IN_TEXT = re.compile(r"pmid[:\s/]*(\d{7,8})", re.I)
YMD = re.compile(r"(\d{4})-(\d{2})-(\d{2})")
YM = re.compile(r"(\d{4})-(\d{2})\b")
Y = re.compile(r"\b(19|20)(\d{2})\b")


def norm_title(t):
    t = re.sub(r"[^a-z0-9 ]+", " ", str(t or "").lower())
    return re.sub(r"\s+", " ", t).strip()


def _valid(y, m=None, d=None):
    if not (1900 <= int(y) <= 2100):
        return False
    if m is not None and not (1 <= int(m) <= 12):
        return False
    if d is not None and not (1 <= int(d) <= 31):
        return False
    return True


def fix_date(v):
    """Return (normalised, changed?).

    Never invents precision. '2026-06-2026 (online)' is June 2026, not the
    20th of June -- only downshift to the precision actually present.
    """
    if not isinstance(v, str) or not v.strip():
        return v, False
    s = v.strip()
    if re.fullmatch(r"\d{4}(-\d{2}(-\d{2})?)?", s):
        return s, False

    # Drop trailing qualifiers: '2026-09-03 (Matters Arising)' -> '2026-09-03'
    core = re.sub(r"\s*\([^)]*\)\s*", " ", s).strip()
    core = re.sub(r"\s*(online|epub|print)\s*$", "", core, flags=re.I).strip()

    # Mangled year-month-year, e.g. '2026-06-2026' -> '2026-06'
    m = re.fullmatch(r"(\d{4})-(\d{2})-(\d{4})", core)
    if m and _valid(m.group(1), m.group(2)):
        return f"{m.group(1)}-{m.group(2)}", True

    m = YMD.search(core)
    if m and _valid(*m.groups()):
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}", True

    m = YM.search(core)
    if m and _valid(m.group(1), m.group(2)):
        return f"{m.group(1)}-{m.group(2)}", True

    m = Y.search(core)
    if m:
        year = f"{m.group(1)}{m.group(2)}"
        if _valid(year):
            return year, True

    return v, True


def completeness(e):
    """Score how filled-in a record is; used to choose the merge survivor."""
    n = 0
    for k, v in e.items():
        if v in (None, "", [], {}):
            continue
        n += 3 if isinstance(v, (list, dict)) else 1
    return n


def merge_group(group):
    """Merge duplicate records, returning (merged_record, notes)."""
    notes = []
    group = sorted(group, key=completeness, reverse=True)
    keep = dict(group[0])
    for other in group[1:]:
        for k, v in other.items():
            if keep.get(k) in (None, "", [], {}):
                keep[k] = v
                notes.append(f"filled {k}")
            elif isinstance(v, list) and isinstance(keep.get(k), list):
                for item in v:
                    if item not in keep[k]:
                        keep[k].append(item)
                        notes.append(f"merged list item in {k}")
    keep.pop("new", None) if False else None
    return keep, notes


def process(path, apply_changes):
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        print(f"{path.name}: not a list, skipping")
        return None

    stats = defaultdict(int)
    date_fixes, pmid_backfills = [], []

    # ---- pass 1: backfill ids + normalise dates -------------------------
    for e in data:
        if not isinstance(e, dict):
            continue
        if not str(e.get("pmid") or "").strip():
            blob = f"{e.get('id','')} {e.get('url','')} {e.get('pdf_url','')}"
            m = PMID_IN_TEXT.search(blob)
            if not m:
                m = ARXIV_IN_URL.search(blob) and None
            if m:
                e["pmid"] = m.group(1)
                stats["pmid_backfilled"] += 1
                pmid_backfills.append((e.get("title", "")[:60], m.group(1)))

        for f in DATE_FIELDS:
            if f in e:
                new, changed = fix_date(e[f])
                if changed:
                    date_fixes.append((f, e[f], new, str(e.get("title", ""))[:50]))
                    e[f] = new
                    stats["dates_normalised"] += 1

    # ---- pass 2: group duplicates --------------------------------------
    by_key = defaultdict(list)
    for i, e in enumerate(data):
        if not isinstance(e, dict):
            continue
        keys = []
        ident = str(e.get("id") or "").strip()
        if ident:
            keys.append(("id", ident))
        # Identity fields must match the validator's pick_id(), otherwise a
        # record can be "duplicate" to the validator yet invisible to the merge.
        for f in ("pmid", "doi", "arxiv_id"):
            v = str(e.get(f) or "").strip()
            if v:
                keys.append((f, v))
        nt = norm_title(e.get("title"))
        if nt:
            keys.append(("title", nt))
        for k in keys:
            by_key[k].append(i)

    seen_groups, drop = [], set()
    for key, idxs in by_key.items():
        if len(idxs) < 2:
            continue
        idxs = [i for i in idxs if i not in drop]
        if len(idxs) < 2:
            continue
        merged, notes = merge_group([data[i] for i in idxs])
        survivor = idxs[0]
        data[survivor] = merged
        for i in idxs[1:]:
            drop.add(i)
        seen_groups.append((key, len(idxs), merged.get("title", "")[:60]))
        stats["records_merged"] += len(idxs) - 1

    kept = [e for i, e in enumerate(data) if i not in drop]
    stats["before"] = len(data)
    stats["after"] = len(kept)

    print(f"\n=== {path.name} ===")
    print(f"  entries:  {stats['before']} -> {stats['after']} "
          f"(-{stats['before'] - stats['after']})")
    print(f"  pmid backfilled:  {stats['pmid_backfilled']}")
    print(f"  dates normalised: {stats['dates_normalised']}")
    print(f"  duplicate groups merged: {len(seen_groups)}")
    for key, n, title in seen_groups[:15]:
        print(f"    · {key[0]}={key[1][:46]!r} x{n} — {title}")
    if len(seen_groups) > 15:
        print(f"    … and {len(seen_groups) - 15} more")
    if date_fixes:
        print("  date fixes:")
        for f, old, new, title in date_fixes[:10]:
            print(f"    · {f}: {old!r} -> {new!r}  ({title})")

    if apply_changes and (drop or date_fixes or pmid_backfills):
        shutil.copy2(path, path.with_suffix(path.suffix + ".bak"))
        path.write_text(json.dumps(kept, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"  ✓ written (backup: {path.name}.bak)")

    return stats


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="write changes (default: dry run)")
    args = ap.parse_args()

    print("DRY RUN — no files written" if not args.apply else "APPLYING CHANGES")
    for p in FILES:
        if p.exists():
            process(p, args.apply)
    if not args.apply:
        print("\nRe-run with --apply to write.")


if __name__ == "__main__":
    main()
