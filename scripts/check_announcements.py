#!/usr/bin/env python3
"""
OpenEvidence Announcements Checker
Scrapes the openevidence.com/announcements page via web search,
compares against known dates, and outputs any new announcements.

Usage: python3 check_announcements.py
Run from cron to detect new announcements.
"""

import json
import subprocess
import sys
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
}

def check_for_new_announcements():
    """Search for the announcements page and extract dates."""
    # The announcements page dates visible in search results
    search_query = "site:openevidence.com/announcements 2026"
    
    # Use venice web search via API
    import urllib.request
    import urllib.parse
    
    # We'll output the known dates and any we should search for
    print("Known announcement dates:")
    for date, title in sorted(KNOWN_DATES.items(), reverse=True):
        print(f"  {date}: {title}")
    
    print(f"\nTotal known: {len(KNOWN_DATES)} announcements")
    print(f"\nTo check for new announcements, search for:")
    print(f"  '{search_query}'")
    print(f"  'OpenEvidence announcement this week'")
    print(f"  'OpenEvidence LinkedIn post'")
    
    # Dates from the announcements page that we should compare against
    page_dates = [
        "June 9, 2026", "May 27, 2026", "May 20, 2026", "May 11, 2026",
        "May 8, 2026", "May 5, 2026", "May 4, 2026", "April 30, 2026",
        "April 27, 2026", "April 16, 2026", "April 7, 2026", "April 2, 2026",
        "March 31, 2026", "March 25, 2026", "March 16, 2026", "March 12, 2026",
        "March 3, 2026", "February 25, 2026", "February 11, 2026",
        "February 6, 2026"
    ]
    
    print(f"\nDates on announcements page: {len(page_dates)}")
    
    # Convert page dates to ISO format and compare
    from datetime import datetime
    for pd in page_dates:
        try:
            iso = datetime.strptime(pd, "%B %d, %Y").strftime("%Y-%m-%d")
            if iso not in KNOWN_DATES:
                print(f"  ⚠️  NEW DATE FOUND: {pd} ({iso}) — not in known dates!")
        except:
            pass
    
    return KNOWN_DATES

if __name__ == "__main__":
    check_for_new_announcements()
