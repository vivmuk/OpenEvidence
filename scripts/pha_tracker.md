# Personal Health Agents Daily Tracker — Runbook

Purpose: keep `/personal-health-agents` current on consumer-facing health AI: platform launches, device-maker agents, triage and coaching evidence, regulation and privacy.

Repo: `/home/vivgates/OpenEvidence`
Page: `personal-health-agents.html`
Data: `data/phaTimeline.js`, `data/phaPlayers.js`, `data/phaResearch.js`, `data/phaSources.js`
Agent mirror: `data/pha.json`
Related but separate: physician-facing clinical AI (OpenEvidence, Abridge, Doximity) stays on its own pages.

## Guardrails

- Every new item needs a real date, a URL and a source name. No speculation, no invented metrics.
- Vendor claims are labelled as vendor claims. Independent studies go in Research with a caveat.
- Distinguish consumer/wellness products from regulated clinical products; say which one a story is.
- If nothing new: no commit, and report exactly `No new personal health agent updates today.`
- Do not run benchmarks.

## 1. Pull the Venice key

```bash
VENICE_KEY=$(sed -n 's/^[[:space:]]*api_key:[[:space:]]*//p' ~/.hermes/config.yaml | head -1)
```

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
curl -s -H "Authorization: Bearer $VENICE_KEY" -X POST -H "Content-Type: application/json" \
  -d '{"url":"<URL>"}' https://api.venice.ai/api/v1/augment/scrape
```

## 2. Searches every run

1. `personal health agent 2026 launch`
2. `OpenAI health ChatGPT medical records`
3. `Microsoft Copilot Health update`
4. `Apple Health AI agent Apple Intelligence`
5. `Google personal health agent research`
6. `AI health coach wearable Oura WHOOP`
7. `AI symptom checker triage study 2026`
8. `ambient home health monitoring AI`
9. `FDA digital health AI guidance personal health`
10. `consumer health data privacy consent state law AI`
11. `personal health agent safety evaluation`
12. `AI health agent arXiv preprint 2026`

Primary pages worth fetching: `https://www.abridge.com` is irrelevant here; use vendor newsrooms (openai.com, microsoft.ai, apple.com/newsroom), Google Research blog, `nature.com` health AI, `statnews.com`, `fiercehealthcare.com`, `beckershospitalreview.com`, `mobihealthnews.com`.

## 3. Dedupe

Match existing entries by URL, title and date. Update a player card rather than adding a duplicate when an existing product ships a new capability.

## 4. Update the data

- `data/phaTimeline.js` — prepend newest first: `{date,cat,title,desc,src,url,new:true}` with `cat` one of Product, Research, Regulatory, Trend, Competitor, Metric. Remove `new:true` from entries older than 14 days.
- `data/phaPlayers.js` — add or refresh a player: `{name,type,badge,stats:[{l,v}],desc,url}`.
- `data/phaResearch.js` — independent studies and regulatory analysis: `{title,type,date,venue,finding,caveat,url}`.
- `data/phaSources.js` — append new source URLs.
- Regenerate the agent mirror:

```bash
cd /home/vivgates/OpenEvidence && node - <<'JS'
const fs=require('fs'),vm=require('vm');
const ctx={};vm.createContext(ctx);
for(const f of ['phaTimeline.js','phaPlayers.js','phaResearch.js','phaSources.js']){
  vm.runInContext(fs.readFileSync('data/'+f,'utf8'),ctx,{filename:f});
}
const old=JSON.parse(fs.readFileSync('data/pha.json','utf8'));
const out=Object.assign({},old,{
  timeline:ctx.phaTimelineData, players:ctx.phaPlayersData,
  research:ctx.phaResearchData, sources:ctx.phaSourcesData,
  updated:new Date().toISOString().slice(0,10)
});
fs.writeFileSync('data/pha.json',JSON.stringify(out,null,2));
JS
```

Also refresh the `Last updated` line in `personal-health-agents.html`.

## 5. Validate and deploy

```bash
cd /home/vivgates/OpenEvidence
node --check data/phaTimeline.js
node --check data/phaPlayers.js
node --check data/phaResearch.js
node --check data/phaSources.js
node -e "JSON.parse(require('fs').readFileSync('data/pha.json'))"
git add personal-health-agents.html data/pha*.js data/pha.json
git commit -m "Personal health agents update: <date> — <summary>"
git push origin main
```

HTTPS push with the `gh` credential helper. Never switch the remote to SSH.

## 6. Report

Telegram-friendly, under 150 words:
- `Personal health agents — <date>`
- Count of new items
- Top 3 bullets: date, headline, why it matters
- Which files changed
