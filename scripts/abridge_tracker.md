# Abridge Daily Tracker — Runbook

Purpose: keep the `/abridge` tab current on Abridge features, partnerships, customers, funding, evidence, and competitive moves.

Repo: `/home/vivgates/OpenEvidence`
Page: `abridge.html`
Data: `data/abridgeTimeline.js`, `data/abridgeProducts.js`, `data/abridgePartners.js`, `data/abridgeResearch.js`, `data/abridgeSources.js`
Agent mirror: `data/abridge.json`

## Guardrails

- Every new item needs a real date, a URL, and a source name. No speculation.
- Company claims are labeled as company-reported. Independent studies go in Research with a caveat.
- Do not run benchmarks. Do not invent metrics.
- If nothing new: make no commit and report one line.

## 1. Pull the Venice key

```bash
VENICE_KEY=$(sed -n 's/^[[:space:]]*api_key:[[:space:]]*//p' ~/.hermes/config.yaml | head -1)
```

If that returns an empty value, inspect the provider block in `~/.hermes/config.yaml` and use the Venice key from it.

Search with the Venice search helper. It runs on **Exa** via Venice (zero data
retention, no Exa account needed, Venice bills $0.01/call) and returns
**publication dates** — Brave leaves `date` empty, and this tracker dedupes and
ages entries by date, so the date is the field that matters most.

```bash
python3 /home/vivgates/.openclaw/workspace-kriya/scripts/venice_search.py \
  --provider exa \
  --limit 8 \
  --max-chars 700 \
  --query "<QUERY>" \
  --query "<QUERY>"
```

It prints a JSON array of `{title, url, date, snippet}` to stdout and dedupes by
URL, so run every query in one call with repeated `--query` flags. `snippet` is
the page text truncated to `--max-chars`, which keeps the context budget flat.
Use `date` as the publication date; when it is empty, take the date from the
snippet text or from the source page.

Scrape when `web_fetch` fails:

```bash
curl -s -H "Authorization: Bearer ***" -X POST -H "Content-Type: application/json" \
  -d '{"url":"<URL>"}' https://api.venice.ai/api/v1/augment/scrape
```

## 2. Sources to check every run

Direct:
- `https://www.abridge.com/press`
- `https://www.abridge.com/press-release/` pages linked from press
- `https://www.abridge.com/product` and `https://www.abridge.com/platform/clinicians`
- Abridge LinkedIn / X posts if search surfaces them

Coverage searches (Venice):
1. `Abridge new feature launch 2026`
2. `Abridge partnership health system 2026`
3. `Abridge enterprise agreement 2026`
4. `Abridge VA Epic Cerner contract 2026`
5. `Abridge NVIDIA Eli Lilly 2026`
6. `Abridge clinical decision support update`
7. `Abridge revenue cycle coding CDI`
8. `Abridge funding valuation 2026`
9. `Abridge KLAS 2026`
10. `Abridge news this week`
11. `Abridge Fierce Healthcare Becker's MobiHealthNews Healthcare Dive`
12. `Abridge ambient AI competitors 2026`

Treat these as high-signal: new health-system enterprise agreements, VA task orders, Epic/NVIDIA/Lilly/UpToDate/NEJM/JAMA deals, new product modules (CDS, nursing, inpatient, pre-bill, prior auth, life sciences), funding, executive changes, legal/regulatory events, independent evaluations.

## 3. Dedupe

Compare against existing entries by URL, title, and date. Do not add the same announcement twice. Update an existing product card instead of adding a duplicate when the news is a capability update.

## 4. Update the data

### Timeline — `data/abridgeTimeline.js`

Prepend newest first:

```js
{date:"YYYY-MM-DD",cat:"Product|Partnership|Funding|Research|Milestone|Competitor|Company",title:"...",desc:"...",src:"...",url:"https://...",new:true}
```

Keep descriptions to 2-4 sentences. Remove `new:true` from entries older than 14 days so the badge stays meaningful.

### Products — `data/abridgeProducts.js`

Add a card for a genuinely new module or mark an existing one `status:"live"` when it ships. Include `date`, `desc`, `url`.

### Partners — `data/abridgePartners.js`

Add new customers, content partners, technology partners, government contracts, and investors. Use a `type` string that starts with one of: `Health system`, `Content`, `Technology`, `Investor`, `Federal`/`Government`.

### Research — `data/abridgeResearch.js`

Only independent studies or evaluations. Include `title`, `type`, `date`, `finding`, `caveat`, `url`.

### Sources — `data/abridgeSources.js`

Append any new source URL.

### Regenerate the agent mirror

```bash
cd /home/vivgates/OpenEvidence && node - <<'JS'
const fs=require('fs'),vm=require('vm');
const ctx={};vm.createContext(ctx);
for(const f of ['abridgeTimeline.js','abridgeProducts.js','abridgePartners.js','abridgeResearch.js','abridgeSources.js']){
  vm.runInContext(fs.readFileSync('data/'+f,'utf8'),ctx,{filename:f});
}
const old=JSON.parse(fs.readFileSync('data/abridge.json','utf8'));
const out=Object.assign({},old,{
  products:ctx.abridgeProductsData,
  partners:ctx.abridgePartnersData,
  research:ctx.abridgeResearchData,
  timeline:ctx.abridgeTimelineData,
  sources:ctx.abridgeSourcesData,
  updated:new Date().toISOString().slice(0,10)
});
fs.writeFileSync('data/abridge.json',JSON.stringify(out,null,2));
JS
```

This preserves the company, stats, and funding blocks already in `abridge.json` while refreshing the tracked arrays.

### Footer date

Update the last-updated line in `abridge.html` to today's date (ET).

## 5. Validate and deploy

```bash
cd /home/vivgates/OpenEvidence
node --check data/abridgeTimeline.js
node --check data/abridgeProducts.js
node --check data/abridgePartners.js
node --check data/abridgeResearch.js
node --check data/abridgeSources.js
node -e "JSON.parse(require('fs').readFileSync('data/abridge.json'))"
git add abridge.html data/abridge*.js data/abridge.json
git commit -m "Abridge update: <date> — <summary>"
git push origin main
```

HTTPS push with the `gh` credential helper. Never switch the remote to SSH.

## 6. Report

Telegram-friendly, under 150 words:
- `Abridge update — <date>`
- Count of new items
- Top 3 bullets: date, headline, why it matters
- `Updated: timeline / products / partners / research / sources`
- If no news: `No new Abridge updates today.` No commit.
