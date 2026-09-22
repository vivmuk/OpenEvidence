#!/usr/bin/env python3
"""
OpenEvidence Announcements Checker
Uses the Venice Augment scrape/search APIs to detect new announcements
on openevidence.com/announcements and compare against known dates.

Usage: python3 scripts/check_announcements.py
"""

import json
import os
import re
import sys
import time
import urllib.request
from datetime import datetime

# Known announcement dates (update this list as new ones are found)
KNOWN_DATES = {
    "2023-11-17": "Elsevier ClinicalKey AI Partnership",
    "2025-02-19": "NEJM Partnership + Series A",
    "2025-06-05": "JAMA Network Partnership",
    "2025-11-05": "NCCN Partnership",
    "2025-12-11": "ACEP Partnership",
    "2026-02-06": "Clinical Trial Matching",
    "2026-02-11": "Sutter Health Deployment",
    "2026-02-25": "Doctor Dialer Wide Release",
    "2026-03-03": "Wiley + Cochrane Partnership",
    "2026-03-10": "1M Consultations Milestone",
    "2026-03-12": "NORD Partnership",
    "2026-03-16": "AAO-HNS Partnership",
    "2026-03-24": "Coding Intelligence Launch",
    "2026-03-25": "Coding Intelligence (announcements page)",
    "2026-03-31": "Mount Sinai Deployment",
    "2026-04-02": "Tandem Partnership",
    "2026-04-07": "Dotflows Launch",
    "2026-04-16": "Wiley Neurology Expansion",
    "2026-04-27": "NCCN Treatment Algorithms",
    "2026-04-30": "EU/UK Withdrawal",
    "2026-05-04": "ACOG Partnership",
    "2026-05-05": "GINA Partnership",
    "2026-05-08": "SNO Partnership",
    "2026-05-11": "SSO Partnership",
    "2026-05-20": "STAT Breakthrough Summit",
    "2026-05-27": "ASCO Guidelines Integration",
    "2026-06-09": "AAO Partnership",
    "2026-06-23": "Pathway Labs EchoNext FDA + Partnership",
    "2026-07-08": "AC Forum Partnership",
    "2026-07-09": "NewYork-Presbyterian / Columbia / Weill Cornell",
    "2026-07-10": "EvidenceGrade",
    "2026-07-13": "Mount Sinai Enterprise-Wide",
    "2026-07-15": "AAP Partnership (Pediatrics)",
    "2026-07-16": "Boston Children's Hospital Collaboration",
    "2026-07-20": "NOHARM Study Result",
    "2026-07-23": "LA County Department of Public Health",
    "2026-07-28": "Education Platform (CE & MOC Credits)",
    "2026-08-05": "Springer Nature Partnership",
    "2026-08-06": "OneOncology Partnership",
    "2026-08-10": "OpenEvidence Games (MedMini & Synapses)",
    "2026-08-19": "Patient Take-Homes",
    "2026-09-03": "OpenEvidence Model Family (Osler/Sackett/Snow/Darwin)",
    "2026-09-11": "MINC#NIMC Canadian physician verification partnership",
    "2026-09-15": "Penn Medicine partnership",
    "2026-09-16": "MSK precision oncology partnership",
    "2026-09-22": "UTMB health system collaboration",
}


def load_auth():
    """Read VENICE_INFERENCE_KEY from ~/.hermes/config.yaml."""
    path = os.path.expanduser("~/.hermes/config.yaml")
    with open(path) as f:
        for line in f:
            if "VENICE_INFERENCE_KEY" in line and ":" in line:
                return line.split(":", 1)[1].strip().strip('"').strip("'")
    raise RuntimeError("VENICE_INFERENCE_KEY not found in ~/.hermes/config.yaml")


AUTH = load_auth()


def venice_post(path, payload, timeout=30):
    """POST to a Venice API endpoint and return parsed JSON."""
    req = urllib.request.Request(
        f"https://api.venice.ai/api/v1{path}",
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {AUTH}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode())


def scrape_announcements_page():
    """Scrape openevidence.com/announcements and extract dated items."""
    try:
        data = venice_post("/augment/scrape", {"url": "https://www.openevidence.com/announcements"})
        content = data.get("content", "")
    except Exception as e:
        print(f"scrape failed: {e}")
        return []

    # Pattern: **Title** ... Month DD, YYYY
    pattern = re.compile(
        r"\*\*(?P<title>[^*]+)\*\*.*?\b(?P<month>January|February|March|April|May|June|July|August|September|October|November|December)\s+(?P<day>\d{1,2}),\s+(?P<year>\d{4})\b",
        re.DOTALL,
    )
    found = []
    for m in pattern.finditer(content):
        title = " ".join(m.group("title").split())
        date_str = f"{m.group('year')}-{datetime.strptime(m.group('month'), '%B').month:02d}-{int(m.group('day')):02d}"
        found.append({"date": date_str, "title": title})
    return found


def search_for_announcements():
    """Use Venice search as a secondary source for announcements."""
    queries = [
        "OpenEvidence announcement 2026",
        "OpenEvidence partnership 2026",
        "OpenEvidence news 2026",
    ]
    results = []
    for q in queries:
        try:
            data = venice_post("/augment/search", {"query": q, "limit": 5, "search_provider": "brave"})
            for r in data.get("results", []):
                results.append({"query": q, "title": r.get("title"), "url": r.get("url"), "content": r.get("content", "")[:200]})
        except Exception as e:
            print(f"search query '{q}' failed: {e}")
    return results


def main():
    print("OpenEvidence Announcements Checker")
    print("=" * 40)

    # 1. Scrape official announcements page (best source)
    page_items = scrape_announcements_page()
    print(f"\nFound {len(page_items)} dated items on announcements page:")
    new_from_page = []
    for item in page_items:
        print(f"  {item['date']}: {item['title']}")
        if item["date"] not in KNOWN_DATES:
            new_from_page.append(item)

    if new_from_page:
        print("\n⚠️  NEW dates from announcements page (not in KNOWN_DATES):")
        for item in new_from_page:
            print(f"  {item['date']}: {item['title']}")
    else:
        print("\n✅ No new dates on announcements page.")

    # 2. Search as secondary signal
    search_results = search_for_announcements()
    print(f"\nSearch returned {len(search_results)} result snippets.")

    # 3. Doximity Ask tracking queries
    print("\nDoximity Ask tracking queries:")
    print("  'Doximity Ask update 2026'")
    print("  'site:technology.doximity.com/articles doximity-ask'")
    print("  'site:blog.doximity.com clinical AI 2026'")
    print("  'Doximity Clinical AI Suite health system 2026'")
    print("  'Doximity PeerCheck physician review 2026'")

    return new_from_page


if __name__ == "__main__":
    main()
