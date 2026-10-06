#!/usr/bin/env python3
"""
Validate OpenEvidence research/benchmark data files.

Guards the tracker's data integrity: catches duplicate records, malformed
dates, missing required fields, and broken JSON before they reach the site.

Usage:
    python3 scripts/validate_data.py            # validate, print report
    python3 scripts/validate_data.py --quiet    # only print failures
    python3 scripts/validate_data.py --json     # machine-readable report

Exit codes:
    0 = clean
    1 = validation errors found
    2 = could not read/parse a data file

Wire this into every update run:  if it exits non-zero, the update is broken.
"""

import argparse
import json
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = {
    "research.json": ROOT / "data" / "research.json",
    "benchmarks.json": ROOT / "data" / "benchmarks.json",
}

# Required on every record in both files.
REQUIRED = ("id", "title")

# ISO-ish dates we accept. Anything else is flagged.
DATE_OK = re.compile(r"^\d{4}(-\d{2}(-\d{2})?)?$")
# Fields that should hold a date when present.
DATE_FIELDS = ("published", "updated", "date")

# arXiv id embedded in an id/url field, e.g. arxiv:2609.32810 or /abs/2609.32810
ARXIV_RE = re.compile(r"(\d{4}\.\d{4,5})")
PMID_RE = re.compile(r"\b(\d{7,8})\b")


def norm_title(t: str) -> str:
    """Normalise a title for duplicate comparison."""
    t = unicodedata.normalize("NFKD", str(t or "")).lower()
    t = re.sub(r"[\u2010-\u2015-]", " ", t)      # dashes -> space
    t = re.sub(r"[^a-z0-9 ]+", " ", t)            # strip punctuation
    t = re.sub(r"\s+", " ", t).strip()
    return t


def pick_id(kind: str, e: dict):
    """Best available identity for an entry."""
    for k in ("pmid", "doi", "arxiv_id"):
        v = e.get(k)
        if v:
            return f"{k}:{str(v).strip()}"
    ident = str(e.get("id") or "").strip()
    if ident:
        return ident
    blob = f"{e.get('url','')} {e.get('pdf_url','')}"
    m = ARXIV_RE.search(blob)
    if m:
        return f"arxiv:{m.group(1)}"
    return ""


def validate_file(name: str, path: Path):
    errors, warnings = [], []
    if not path.exists():
        return None, [f"{name}: file not found at {path}"], []

    try:
        raw = path.read_text(encoding="utf-8")
        data = json.loads(raw)
    except json.JSONDecodeError as ex:
        return None, [f"{name}: INVALID JSON — {ex}"], []

    items = data if isinstance(data, list) else (
        data.get("studies") or data.get("research") or data.get("benchmarks") or []
    )
    if not isinstance(items, list):
        return None, [f"{name}: unexpected structure ({type(items).__name__})"], []

    id_counter = Counter()
    title_counter = defaultdict(list)
    pmid_counter = defaultdict(list)

    for i, e in enumerate(items):
        where = f"{name}[{i}]"
        if not isinstance(e, dict):
            errors.append(f"{where}: entry is {type(e).__name__}, not an object")
            continue

        for f in REQUIRED:
            if not str(e.get(f) or "").strip():
                errors.append(f"{where}: missing required field '{f}'")

        for f in DATE_FIELDS:
            v = e.get(f)
            if v in (None, ""):
                continue
            if not isinstance(v, str) or not DATE_OK.match(v.strip()):
                errors.append(f"{where} ({e.get('id','?')}): malformed {f} = {v!r}")

        ident = pick_id(name, e)
        if ident:
            id_counter[ident] += 1

        nt = norm_title(e.get("title"))
        if nt:
            title_counter[nt].append(ident or f"{name}[{i}]")

        pm = str(e.get("pmid") or "").strip()
        if pm:
            pmid_counter[pm].append(e.get("title", "")[:70])

        # an entry claiming a pmid that isn't a plausible pmid
        if pm and not PMID_RE.fullmatch(pm):
            warnings.append(f"{where}: suspicious pmid {pm!r}")

        if e.get("source") == "pubmed" and not pm:
            warnings.append(
                f"{where}: source=pubmed but no pmid — will evade dedup "
                f"({str(e.get('title'))[:60]!r})"
            )

    dup_ids = {k: c for k, c in id_counter.items() if c > 1}
    dup_titles = {k: v for k, v in title_counter.items() if len(v) > 1}
    dup_pmids = {k: v for k, v in pmid_counter.items() if len(v) > 1}

    for k, c in sorted(dup_ids.items()):
        errors.append(f"{name}: duplicate id '{k}' x{c}")
    for k, v in sorted(dup_titles.items()):
        errors.append(f"{name}: duplicate title x{len(v)} — {k[:80]!r}")
    for k, v in sorted(dup_pmids.items()):
        errors.append(f"{name}: duplicate pmid {k} x{len(v)}")

    stats = {
        "file": name,
        "entries": len(items),
        "unique_ids": len(id_counter),
        "duplicate_id_groups": len(dup_ids),
        "duplicate_title_groups": len(dup_titles),
        "duplicate_pmid_groups": len(dup_pmids),
        "redundant_records": sum(c - 1 for c in dup_ids.values()),
    }
    return stats, errors, warnings


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quiet", action="store_true")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    report, all_errors, all_warnings = {}, [], []
    for name, path in FILES.items():
        stats, errs, warns = validate_file(name, path)
        report[name] = stats
        all_errors += errs
        all_warnings += warns

    if args.json:
        print(json.dumps(
            {"stats": report, "errors": all_errors, "warnings": all_warnings}, indent=2))
    else:
        for name, s in report.items():
            if s:
                print(f"{name}: {s['entries']} entries, {s['unique_ids']} unique ids, "
                      f"{s['redundant_records']} redundant")
        if all_warnings and not args.quiet:
            print(f"\n{len(all_warnings)} warning(s):")
            for w in all_warnings[:25]:
                print(f"  ⚠ {w}")
            if len(all_warnings) > 25:
                print(f"  … and {len(all_warnings) - 25} more")
        if all_errors:
            print(f"\n{len(all_errors)} ERROR(s):")
            for e in all_errors[:40]:
                print(f"  ✗ {e}")
            if len(all_errors) > 40:
                print(f"  … and {len(all_errors) - 40} more")
        else:
            print("\n✓ validation clean")

    if any(s is None for s in report.values()):
        sys.exit(2)
    sys.exit(1 if all_errors else 0)


if __name__ == "__main__":
    main()
