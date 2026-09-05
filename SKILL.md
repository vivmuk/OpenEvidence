# OpenEvidence Insights — Agent Skill

> **Purpose:** Progressive-disclosure guide for any AI agent visiting the OpenEvidence Insights website.  
> **Start here.** This file is short. Follow the numbered layers in order; each layer links to deeper resources only when needed.  
> **Last updated:** 2026-09-05

---

## 0. One-sentence identity

This is an **unofficial tracker dashboard** for OpenEvidence (the AI clinical-decision-support platform), maintained by Kriya for Vivek. It aggregates public announcements, partnerships, funding, adoption metrics, competitors, research papers, and benchmark studies.

---

## 1. First pass — get oriented (read these two files)

Read in this order. Together they give you the full narrative without drowning you in rows.

1. **`/OPENEVIDENCE_CONTEXT.md`** — The single-file snapshot.  
   - What it covers: company overview, funding, adoption metrics, complete feature timeline (2023–2026), partnerships, competitive landscape, research/benchmarks, and site structure.  
   - When to use it: answering any broad question about OpenEvidence.  
   - Last updated: see file header.

2. **`/llms.txt`** — The machine manifest.  
   - What it covers: all JSON/CSV data endpoints, research methodology, and agent notes.  
   - When to use it: when you need to know *where* the raw data lives or how it is updated.

---

## 2. If you need chronology — use the timeline endpoints

The site is organized around a **descending chronological timeline** (newest first).

| Endpoint | Format | Best for |
|----------|--------|----------|
| `/api/timeline` | JSON | Full event log with categories and sources |
| `/data/timeline.csv` | CSV | Raw, human-readable spreadsheet |
| `/timeline` | HTML page | Visual timeline with filters |

**Context-management rule:** Load `/api/timeline` only when the user asks for *dates, sequences, or "what happened when."* Otherwise stay in `OPENEVIDENCE_CONTEXT.md`.

---

## 3. If you need a specific domain — pick one deeper page

Each page below is self-contained and links back to the data endpoints it uses.

| Page | Data source | Use case |
|------|-------------|----------|
| `/funding` | `OPENEVIDENCE_CONTEXT.md` §1, §2 | Funding rounds, valuation, investors |
| `/products` | `data/products.js` | Product descriptions and launch dates |
| `/features` | `data/oeFeatures.js` | Feature grid with icons and descriptions |
| `/partnerships` | `/api/partnerships` or `data/partnerships.csv` | All content, society, health-system, and tech partners |
| `/competitors` | `/api/competitors` or `data/competitors.js` | Competitive landscape and threat levels |
| `/benchmarks` | `data/benchmarks.json` | Clinical-AI benchmark studies |
| `/publications` | `data/publications.js`, `data/research.json` | PubMed / arXiv papers mentioning clinical AI |
| `/sct` | `data/sctResults.js` | Deep dive on the Stanford-Harvard NOHARM safety study |
| `/doximity` | `doximity.html` + context file | Biggest competitor analysis |
| `/global` | `data/global_landscape.csv`, `data/globalTimeline.js` | Global CDS landscape |
| `/tech` | `OPENEVIDENCE_CONTEXT.md` §8 | Tech stack and infrastructure |
| `/pharma` | `data/pharma.js` | Ad platform, Amaro, Veeva |
| `/future` | `data/future.js` | Released, in-development, and inferred roadmap |
| `/sources` | `data/sources.js` | All cited sources with URLs |

---

## 4. If you need raw data — use the JSON/CSV endpoints

### Pre-built JSON (largest datasets)
- `/data/research.json` — consolidated research (PubMed + arXiv + Semantic Scholar)
- `/data/benchmarks.json` — benchmark and evaluation studies

### API endpoints (parsed from CSV on-the-fly)
- `/api/timeline`
- `/api/competitors`
- `/api/partnerships`
- `/api/metrics`
- `/api/global_landscape`

### Direct CSV
- `/data/timeline.csv`
- `/data/competitors.csv`
- `/data/partnerships.csv`
- `/data/metrics.csv`
- `/data/global_landscape.csv`
- `/data/publications.csv`

**Progressive rule:** Prefer the API/JSON endpoint matching the user's question. Only load multiple large JSON files if the question explicitly requires cross-referencing them.

---

## 5. Important constraints and policies

1. **Do not fabricate.** If a web search is unavailable, skip gracefully rather than invent data.
2. **Respect the NOHARM policy.** The user explicitly asked NOT to run or re-run the NOHARM benchmark from this site.
3. **Timeline order is descending** almost everywhere (newest first). Check `date` fields before assuming chronological order.
4. **This is an unofficial tracker.** Do not present it as OpenEvidence Inc.'s official website; official site is `openevidence.com`.
5. **Web search path.** If you must search the live web for OpenEvidence news, use the Venice API (`POST api.venice.ai/api/v1/augment/search`) or Grok X search; do not rely on DuckDuckGo (CAPTCHA blocks).

---

## 6. Quick-start checklist for agents

1. Read `/OPENEVIDENCE_CONTEXT.md` for the big picture.
2. Read `/llms.txt` if you need endpoint metadata.
3. Use `/api/timeline` only for chronological queries.
4. Use the domain page (§3) for the specific topic the user asked about.
5. Load raw JSON/CSV (§4) only when precise filtering or large-scale analysis is required.
6. Never run the NOHARM benchmark.
7. Cite sources from `data/sources.js` or the original URL in the timeline row.
