# Model Stack — Monthly Refresh Runbook

Purpose: keep the `/models` tab current. Vendor model stacks churn fast — a
model named in a blog post months ago may have been replaced twice since — so
this page needs a monthly re-check, not an annual one.

Repo: `/home/vivgates/OpenEvidence`
Page: `models.html`
Data: `data/modelStack.js`
Agent mirror: `data/models.json`

**Two hard-won rules for this job, read them before you start:**

1. **Use `edit` or `exec`, never `apply_patch`,** for files in this repo. `apply_patch` is sandboxed to the agent's own workspace and always fails here with `Path escapes sandbox root`. Retrying it burns the job's entire time budget.
2. **Stay inside the job's 600-second budget.** Search in as few calls as possible, then edit, validate, commit and push without re-reading files you already have.

## What this page is

One entry per clinical AI tool: the underlying model, how confident we are, and
a dated clickable source for every claim. The whole value of the page is that
the claims are sourced, so **a refresh that drops the sourcing has destroyed the
page.** Keep every citation.

## Guardrails

- **Never fabricate a model name.** If a vendor does not disclose the model, the
  entry stays `model: null` with `confidence: "undisclosed"`. An honest "not
  disclosed" is the finding; a guessed base model is worse than nothing.
- **Every claim keeps its citation.** If you update a model, update the source
  that supports it and the date. If you cannot find a better source, leave the
  entry alone — an old-but-cited claim beats a new-but-unsourced one.
- **Most recent dated statement wins** when sources conflict. Keep the losing
  claim visible in `conflict` with the resolution explained. Do not silently
  drop it.
- **Verify URLs.** A citation to a page you could not actually read is not a
  citation. See "Bot-blocked pages" below.
- Vendor statement outranks press, which outranks your own inference.
- Update `asOf` on every entry you touch, and set `updated` in the JSON mirror.
- Do not run benchmarks. Do not invent metrics.

## Scope note: this job also refreshes the free-tier block

The `/models` page is the clinician-facing side. The **consumer** side — what a
patient actually gets on a free account — lives on the Personal Health Agents
page in a separate tab, "Free Tier", backed by `data/phaFreeTier.js` (mirrored
into `data/pha.json` as `freeTierDefaults`).

**Refresh that block in the same pass.** It goes stale faster than the clinician
side, because every lab ships a new default and the free tier is usually the
last surface to be updated. The four surfaces are ChatGPT, Claude, Gemini, and
Google Search / AI Mode. For each, the question is always the same: **which
model runs for a logged-out or free user**, not which model the vendor is
marketing.

Free-tier defaults are where vendor pages contradict each other most often, so
the conflict rule matters more here than anywhere else on the site. A pricing
page is usually the freshest source; a help-centre article often lags the
rollout by weeks.

## 1. Decide what actually needs re-checking

Do not re-research all 19 tools every month. Most entries are stable for
quarters. Work through this list:

1. **Read the current file first.** `node -e` to load `data/modelStack.js` and
   print each tool with its `model`, `confidence` and `asOf`. The `asOf` dates
   tell you what has been stale longest.
2. **Prioritise by volatility.** Highest churn first:
   - ChatGPT for Clinicians, Claude for Healthcare, Copilot Health — frontier
     labs ship new families every few weeks; these are the ones most likely to
     be stale.
   - UpToDate Expert AI, Microsoft Dragon Copilot, Microsoft Copilot Health —
     Microsoft and Wolters Kluwer publish little; re-check but expect no change.
   - OpenEvidence, Abridge, Doximity Ask, Ambience, Nabla, Heidi Health,
     Vera Health, Glass Health, UpDoc, Epic AI — usually stable, but a model
     *release* by any of these is worth a targeted search.
3. **Run one broad sweep** for anything new, then drill into specific tools.

## 2. Search and scrape

Both helpers read the Venice key from `~/.hermes/config.yaml` **in-process**, so
the credential never appears on a command line, in `ps`, or in shell history.
There is nothing to extract and nothing to export.

Search with the Venice search helper. It runs on **Exa** via Venice (zero data
retention, no Exa account needed, Venice bills $0.01/call) and returns
**publication dates**, which is what makes the conflict rule decidable.

```bash
python3 /home/vivgates/.openclaw/workspace-kriya/scripts/venice_search.py \
  --provider exa \
  --limit 8 \
  --max-chars 900 \
  --query "<QUERY>" \
  --query "<QUERY>"
```

It prints a JSON array of `{title, url, date, snippet}` to stdout and dedupes by
URL. Put every query for one tool in a single call — a multi-query sweep in one
invocation is much cheaper than several.

Scrape a specific page to read it in full:

```bash
python3 /home/vivgates/.openclaw/workspace-kriya/scripts/venice_scrape.py "https://example.com/page"
```

For each tool, search for something like:

- `"<tool> model" "<tool> underlying model" "<tool> model update"`
- `"<tool> model strategy" "<tool> engineering blog"`
- For the big labs: `"<vendor> model release notes" "<vendor> models in chat"`

Prefer the vendor's own pages — release notes, help centre, model cards,
engineering blog, product page. Press is acceptable when the vendor does not
publish it.

### Bot-blocked pages

`curl` gets **403** on many vendor pages (OpenAI, Microsoft, Wolters Kluwer,
Doximity, Reuters, Forbes, Becker's). **That is a bot block, not a dead link** —
do not drop those citations. The scrape helper above fetches them fine, with
real content. Verify with it.

A page you genuinely cannot read with the scrape helper (a hard DataDome wall,
for example) is a different matter: if a claim rests solely on it, narrow or
rewrite the claim to what a readable source supports, and say so in `conflict`.

### Verify quotes

Every citation carries a `quote` field — a short verbatim snippet from the
source. After you change a citation, confirm the snippet is actually in the
fetched text. A quote that is not in the source is a broken citation.

## 3. Edit the data file

`data/modelStack.js` is a plain JS array. Keep the shape and the key order:

```js
{
  tool, vendor, category, model, modelFamily, confidence, asOf,
  userSelectable, notes, conflict, stack: [{l, v}], 
  citations: [{title, url, date, kind, quote}],
  alternatives: [{model, note, url, date}]
}
```

- `model` — the model name, or `null` when not disclosed.
- `modelFamily` — the family the model belongs to (e.g. "GPT-6", "Claude 5.5").
- `confidence` — `disclosed` | `reported` | `inferred` | `undisclosed`.
- `asOf` — the date the claim is true, `YYYY-MM-DD`.
- `userSelectable` — true when the user picks the model or reasoning tier.
- `notes` — 2–4 sentences on the current state.
- `conflict` — the conflict and how it was resolved. Keep the losing claim.
- `stack` — short `{l, v}` rows: model, retrieval, hosting, tiering, etc.
- `citations` — every claim, with a verbatim `quote`.
- `alternatives` — previous versions, superseded models, comparison baselines.

Keep entries in the existing order. New tools go at the end of the most
relevant group; do not reshuffle.

The file starts with a comment block explaining the confidence vocabulary and
the conflict rule — keep it, and update its date line.

### Refreshing the free-tier block

Same file conventions as `data/modelStack.js`:

```js
{
  platform, vendor, freeDefault, paidDefault, healthAccess, freeTierLimits,
  healthNote, confidence, asOf, notes, conflict, citations, alternatives
}
```

`freeDefault` is the model a free user gets. `paidDefault` is the contrast —
the gap between the two is the point of the section, so state both.

Then regenerate `data/pha.json`, keeping its existing blocks and adding
`freeTierDefaults`:

```bash
node - <<'JS'
const fs = require('fs'), vm = require('vm');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data/phaFreeTier.js', 'utf8'), ctx, {filename:'phaFreeTier.js'});
const old = JSON.parse(fs.readFileSync('data/pha.json', 'utf8'));
fs.writeFileSync('data/pha.json', JSON.stringify(Object.assign({}, old, {
  updated: '<TODAY YYYY-MM-DD>',
  freeTierDefaults: ctx.phaFreeTierData
}), null, 2));
JS
```

And update the Personal Health Agents page's "Last updated" line if it carries
a date.

## 4. Regenerate the mirror and validate

```bash
cd /home/vivgates/projects/OpenEvidence
node - <<'JS'
const fs = require('fs'), vm = require('vm');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data/modelStack.js', 'utf8'), ctx, { filename: 'modelStack.js' });
const out = {
  title: 'Model stack',
  updated: '<TODAY YYYY-MM-DD>',
  description: 'Which underlying model powers each clinical AI tool, with dated, clickable primary-source citations.',
  conflictRule: 'Where sources disagree, the most recent dated statement wins; the losing claim is kept and shown.',
  confidenceVocabulary: {
    disclosed: 'The vendor states the model.',
    reported: 'A credible third party states the model.',
    inferred: 'Deduced from other evidence; the reasoning is shown.',
    undisclosed: 'No public statement — an honest answer, not a gap.'
  },
  tools: ctx.modelStackData
};
fs.writeFileSync('data/models.json', JSON.stringify(out, null, 2));
JS
node --check data/modelStack.js
node -e "JSON.parse(require('fs').readFileSync('data/models.json'))"
```

Then check the page still renders:

```bash
node --check data/modelStack.js
python3 - <<'PY'
import re, io
s = io.open('models.html', encoding='utf-8').read()
blocks = re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', s, re.S)
io.open('/tmp/models_inline.js', 'w', encoding='utf-8').write('\n'.join(blocks))
PY
node --check /tmp/models_inline.js
```

**No relative-path regressions.** Every path in every page must stay relative
(`/shared.js` breaks the GitHub Pages deployment, which is served from the
`/OpenEvidence/` subpath). The pre-commit hook blocks root-relative paths in
`*.html`, so a regression cannot merge — but read the block message if it fires
rather than working around it.

## 5. Render-check

```bash
cd /home/vivgates/projects/OpenEvidence
PORT=3001 node server.js &
```

Then confirm the page renders with the expected card count and no console
errors:

```bash
chromium --headless --disable-gpu --no-sandbox --virtual-time-budget=10000 \
  --dump-dom http://localhost:3001/models > /tmp/models_dom.html
grep -o 'class="model-card"' /tmp/models_dom.html | wc -l
```

The card count should equal the number of entries in the data file. Check the
browser console for errors — `oeNewBadge is not defined` means `shared.js` did
not load, which breaks the page.

## 6. Commit and push

```bash
cd /home/vivgates/projects/OpenEvidence
git add -A
git commit -m "Refresh model stack: <what changed> (YYYY-MM-DD)"
git push origin main
```

Railway auto-deploys `main` to `https://oe.up.railway.app` and GitHub Pages to
`https://vivmuk.github.io/OpenEvidence/`. Verify both after the push:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://oe.up.railway.app/models
curl -s -o /dev/null -w "%{http_code}\n" https://vivmuk.github.io/OpenEvidence/models
```

Both must be 200, and the live page must show the new content — a stale CDN
cache can serve the previous build for a few minutes.

## 7. Report

Under 150 words to Telegram:

- what changed (which tools, which models, old → new)
- anything you could not re-verify, and why
- which files changed
- if nothing changed: say so and make **no commit**

## Failure modes worth knowing

| Symptom | Cause | Fix |
|---|---|---|
| `oeNewBadge is not defined` | `shared.js` did not load | check the script order and that paths are relative |
| A citation returns 403 to `curl` | bot block, not a dead link | verify with `venice_scrape.py`; keep the citation |
| A citation returns an empty page | hard bot wall | narrow the claim to what a readable source supports |
| Card count does not match entry count | render error | check the browser console |
| Commit blocked: "root-relative path" | someone wrote `/shared.js` | make it relative; do not work around the gate |
