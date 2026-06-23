# OpenEvidence Insights

A comprehensive dashboard tracking OpenEvidence — the fastest-growing medical AI platform in history.

## What's Here

- **`index.html`** — Full interactive dashboard (static, no build step)
- **`data/timeline.csv`** — Chronological event log with sources
- **`data/partnerships.csv`** — All partnerships with dates and types
- **`data/metrics.csv`** — Adoption metrics over time
- **`data/competitors.csv`** — Competitor landscape comparison

## Dashboard Sections

1. **Key Stats** — Valuation, physicians, consultations, revenue, funding, hospitals, partners, employees
2. **Adoption Metrics** — Interactive charts for consultations, physicians, valuation, revenue, funding
3. **Master Timeline** — Every major event filterable by category, with source links
4. **Funding Tracker** — Waterfall chart + table of 4 funding rounds ($1B → $12B)
5. **Product Launches** — DeepConsult, Visits, Coding Intelligence, Dotflows, Voice Mode, more
6. **Competitive Landscape** — 10 competitors with mini-profiles (ChatGPT, Doximity, Abridge, etc.)
7. **Partnership Ecosystem** — 25+ content partners, 3 health systems, tech infrastructure
8. **Tech Stack** — Known vs Inferred (Next.js, Vercel, Baseten, GCP, Epic FHIR)
9. **Future Roadmap** — Released, in-development, and inferred future directions
10. **Source Index** — 35+ verified sources

## Auto-Updates

A cron job runs every Sunday at 5 PM ET to:
1. Search for new OpenEvidence news from the past week
2. Update CSVs with new events
3. Rebuild the static site
4. Push to GitHub → auto-deploys via GitHub Pages

## Brand Colors

- Primary: `#E4643D` (Flame Pea — OpenEvidence orange)
- Dark: `#0C130D` (Marshland)

## Data Sources

Sacra, PRNewswire, Forbes, CNBC, Bloomberg Law, Vercel Blog, Baseten, Wikipedia, OpenEvidence.com, NBC News, NYT, Fierce Healthcare, Healthcare IT News, Business Insider, TechCrunch, and more.

## Built By

Kriya — AI assistant for Vivek. Not affiliated with OpenEvidence Inc.
