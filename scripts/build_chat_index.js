#!/usr/bin/env node
/**
 * Build the semantic chat index.
 *
 * Two artefacts:
 *   data/chatCorpus.js   the passages themselves (text + metadata)
 *   data/chatVectors.js  int8-quantised embeddings, one row per passage
 *
 * The embeddings MUST come from the same model the browser uses, or the query
 * vector and the corpus vectors land in different spaces and every score is
 * noise. So this script runs the exact model the client loads:
 * Xenova/all-MiniLM-L6-v2, quantised, mean pooling, normalised.
 *
 * Usage:
 *   npm install @xenova/transformers        (once)
 *   node scripts/build_chat_index.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const MODEL = 'Xenova/all-MiniLM-L6-v2';
const DIMS = 384;

/* ------------------------------------------------------------------ corpus */

// Which site page each data file belongs to, for "read more" deep links.
// The tracker files hold the site's own findings — a timeline entry about a
// valuation, a competitor's model, an FDA classification. The research files
// hold hundreds of generic clinical papers whose jargon matches almost any
// medical query and drowns out the answers. So tracker content gets a small
// prior at query time, and research is still reachable when the question is
// genuinely about studies.
const PRIOR = {
  tracker: 0.12,
  research: 0.0
};

const PAGE_OF = {
  'timeline.js': '/timeline',
  'competitors.js': '/competitors',
  'emergingTrends.js': '/global',
  'globalTimeline.js': '/global',
  'globalMatrix.js': '/global',
  'globalRegions.js': '/global',
  'regulatory.js': '/global',
  'publications.js': '/publications',
  'signals.js': '/',
  'sources.js': '/sources',
  'products.js': '/products',
  'partners.js': '/partnerships',
  'publishers.js': '/publishers',
  'oeFeatures.js': '/features',
  'dxTimeline.js': '/features',
  'benchmarks.js': '/benchmarks',
  'modelStack.js': '/models',
  'phaFreeTier.js': '/personal-health-agents',
  'phaPlayers.js': '/personal-health-agents',
  'phaResearch.js': '/personal-health-agents',
  'phaSources.js': '/personal-health-agents',
  'phaTimeline.js': '/personal-health-agents',
  'abridgePartners.js': '/abridge',
  'abridgeProducts.js': '/abridge',
  'abridgeResearch.js': '/abridge',
  'abridgeSources.js': '/abridge',
  'abridgeTimeline.js': '/abridge',
  'sctPublished.js': '/sct',
  'sctResults.js': '/sct',
  'pharma.js': '/pharma',
  'future.js': '/future'
};

// Human label for the kind of record.
const KIND_OF = {
  'timeline.js': 'Timeline', 'competitors.js': 'Competitor', 'emergingTrends.js': 'Trend',
  'globalTimeline.js': 'Global timeline', 'globalMatrix.js': 'Availability matrix',
  'globalRegions.js': 'Region', 'regulatory.js': 'Regulation', 'publications.js': 'Publication',
  'signals.js': 'Signal', 'sources.js': 'Source', 'products.js': 'Product',
  'partners.js': 'Partner', 'publishers.js': 'Publisher', 'oeFeatures.js': 'Feature',
  'dxTimeline.js': 'Feature', 'benchmarks.js': 'Benchmark', 'modelStack.js': 'Model stack',
  'phaFreeTier.js': 'Free tier', 'phaPlayers.js': 'Platform', 'phaResearch.js': 'Research',
  'phaSources.js': 'Source', 'phaTimeline.js': 'Timeline', 'abridgePartners.js': 'Partner',
  'abridgeProducts.js': 'Product', 'abridgeResearch.js': 'Research', 'abridgeSources.js': 'Source',
  'abridgeTimeline.js': 'Timeline', 'sctPublished.js': 'SCT benchmark', 'sctResults.js': 'SCT result',
  'pharma.js': 'Pharma', 'future.js': 'Forecast'
};

function loadJsVar(file, varName) {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(DATA, file), 'utf8'), ctx, { filename: file });
  return ctx[varName];
}

/** First non-empty string among a list of candidate field names. */
function pick(obj, names) {
  for (const n of names) {
    const v = obj[n];
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (typeof v === 'number') return String(v);
  }
  return '';
}

/** Flatten a nested structure into readable prose, for embedding. */
function flatten(value, depth) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    if (depth <= 0) return '';
    return value.map((v) => flatten(v, depth - 1)).filter(Boolean).join('; ');
  }
  if (typeof value === 'object') {
    if (depth <= 0) return '';
    const parts = [];
    for (const k of Object.keys(value)) {
      const v = flatten(value[k], depth - 1);
      if (v) parts.push(k + ': ' + v);
    }
    return parts.join('; ');
  }
  return '';
}

const TITLE_FIELDS = ['title', 'name', 'heading', 'tool', 'platform'];
const BODY_FIELDS = ['desc', 'description', 'notes', 'findings', 'summary', 'body', 'text', 'abstract'];
const ORG_FIELDS = ['vendor', 'org', 'organization', 'company', 'src', 'source', 'journal', 'publisher', 'type', 'cat', 'region', 'category'];
const DATE_FIELDS = ['date', 'asOf', 'updated', 'published', 'launched', 'year'];
const URL_FIELDS = ['url', 'href', 'link'];

function buildPassages() {
  const passages = [];

  for (const file of Object.keys(PAGE_OF)) {
    const full = path.join(DATA, file);
    if (!fs.existsSync(full)) continue;

    let arr = null;
    for (const varName of Object.keys(vm.runInContext('({})', vm.createContext({})) || {})) { /* noop */ }
    // find the single array variable in the file
    const ctx = {};
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(full, 'utf8'), ctx, { filename: file });
    const arrays = Object.keys(ctx).filter((k) => Array.isArray(ctx[k]) && ctx[k].length &&
      ctx[k][0] && typeof ctx[k][0] === 'object');
    if (!arrays.length) continue;
    arr = ctx[arrays[0]];

    const page = PAGE_OF[file];
    const kind = KIND_OF[file];

    arr.forEach((entry, i) => {
      if (!entry || typeof entry !== 'object') return;
      const title = pick(entry, TITLE_FIELDS);
      let body = pick(entry, BODY_FIELDS);
      if (!body) {
        // fall back to a flattened rendering of whatever fields exist
        body = flatten(entry, 3);
      }
      if (!title && !body) return;

      // Skip the search index's own passthrough duplicates: whatsNew mirrors timeline.
      const date = pick(entry, DATE_FIELDS);
      const org = pick(entry, ORG_FIELDS);
      const url = pick(entry, URL_FIELDS);
      const stats = Array.isArray(entry.stats) ? entry.stats : null;
      const extra = stats ? stats.map((s) => s.l + ': ' + s.v).join('; ') : '';

      const text = [title, body, extra].filter(Boolean).join(' — ').replace(/\s+/g, ' ').trim();
      if (text.length < 12) return;

      passages.push({
        id: passages.length,
        kind,
        page,
        title: title || text.slice(0, 90),
        text: text.slice(0, 1600),
        date,
        org,
        url,
        pri: PRIOR.tracker
      });
    });
  }

  // research.json and benchmarks.json carry the bulk of the corpus.
  const research = JSON.parse(fs.readFileSync(path.join(DATA, 'research.json'), 'utf8'));
  research.forEach((e) => {
    const title = pick(e, ['title', 'name']);
    const body = pick(e, ['findings', 'summary', 'desc', 'description', 'abstract']) || flatten(e, 2);
    if (!title && !body) return;
    const text = [title, body].filter(Boolean).join(' — ').replace(/\s+/g, ' ').trim();
    if (text.length < 12) return;
    passages.push({
      id: passages.length,
      kind: 'Research',
      page: '/publications',
      title: title || text.slice(0, 90),
      text: text.slice(0, 1600),
      date: pick(e, ['date', 'published', 'asOf', 'updated']),
      org: pick(e, ['journal', 'source', 'venue', 'authors']),
      url: pick(e, ['url']),
      pri: PRIOR.research
    });
  });

  const bench = JSON.parse(fs.readFileSync(path.join(DATA, 'benchmarks.json'), 'utf8'));
  const benchArr = Array.isArray(bench) ? bench : (bench.benchmarks || bench.studies || []);
  benchArr.forEach((e) => {
    const title = pick(e, ['title', 'name']);
    const body = pick(e, ['findings', 'summary', 'desc', 'description']) || flatten(e, 2);
    if (!title && !body) return;
    const text = [title, body].filter(Boolean).join(' — ').replace(/\s+/g, ' ').trim();
    if (text.length < 12) return;
    passages.push({
      id: passages.length,
      kind: 'Benchmark',
      page: '/benchmarks',
      title: title || text.slice(0, 90),
      text: text.slice(0, 1600),
      date: pick(e, ['date', 'published', 'updated']),
      org: pick(e, ['journal', 'source']),
      url: pick(e, ['url']),
      pri: PRIOR.research
    });
  });

  return passages;
}

/* ----------------------------------------------------------------- embed */

async function embedAll(texts) {
  const { pipeline, env } = require('@xenova/transformers');
  env.cacheDir = path.join(ROOT, '.cache', 'transformers');
  env.allowLocalModels = false;
  const embedder = await pipeline('feature-extraction', MODEL, { quantized: true });
  // Batch it. Feeding the whole corpus as one tensor allocates a very large
  // intermediate and the process gets killed on a large corpus.
  const BATCH = 64;
  const out = [];
  for (let i = 0; i < texts.length; i += BATCH) {
    const slice = texts.slice(i, i + BATCH);
    const res = await embedder(slice, { pooling: 'mean', normalize: true });
    const rows = res.tolist();
    for (const r of rows) out.push(r);
    if ((i / BATCH) % 5 === 0) {
      process.stdout.write(`  embedded ${Math.min(i + BATCH, texts.length)}/${texts.length}\n`);
    }
  }
  return out;
}

function quantize(vectors) {
  // int8 per-vector scale. Cosine similarity is preserved closely enough for
  // ranking, and the payload drops to a quarter of float32.
  const rows = vectors.map((v) => {
    let max = 0;
    for (const x of v) max = Math.max(max, Math.abs(x));
    const scale = max / 127 || 1;
    const q = new Int8Array(v.length);
    for (let i = 0; i < v.length; i++) q[i] = Math.max(-127, Math.min(127, Math.round(v[i] / scale)));
    return { q, s: scale };
  });
  return rows;
}

function main() {
  const passages = buildPassages();
  console.log(`  passages: ${passages.length}`);
  if (!passages.length) { console.error('  no passages built'); process.exit(1); }

  // The title is the identifying signal — "OpenEvidence Raises $250M at $15B
  // Valuation" — while the body is supporting detail. Embedding the title
  // twice keeps it dominant without needing a second vector per passage.
  const texts = passages.map((p) => {
    const t = p.title || '';
    const body = p.text.replace(t, '').trim().slice(0, 600);
    return (t + ' | ' + t + ' | ' + body).slice(0, 1000);
  });
  console.time('  embed');
  embedAll(texts).then((vectors) => {
    console.timeEnd('  embed');
    if (vectors.length !== passages.length || vectors[0].length !== DIMS) {
      console.error('  unexpected embedding shape'); process.exit(1);
    }
    const rows = quantize(vectors);

    const corpusBanner = '// AUTO-GENERATED by scripts/build_chat_index.js — do not edit by hand.\n' +
      '// Semantic chat corpus. v=vector index into chatVectorsData.\n';
    fs.writeFileSync(path.join(DATA, 'chatCorpus.js'),
      corpusBanner + 'var chatCorpusData = ' + JSON.stringify(passages) + ';\n');

    // Store as a flat Int8Array in base64 for a compact payload.
    const flat = new Int8Array(rows.length * DIMS);
    rows.forEach((r, i) => flat.set(r.q, i * DIMS));
    const scales = rows.map((r) => Math.round(r.s * 1e6) / 1e6);
    const vecBanner = '// AUTO-GENERATED by scripts/build_chat_index.js — do not edit by hand.\n' +
      `// ${rows.length} x ${DIMS} int8 embeddings, per-row scale, base64. Model: ${MODEL}.\n`;
    fs.writeFileSync(path.join(DATA, 'chatVectors.js'),
      vecBanner + 'var chatVectorsData = {n:' + rows.length + ',d:' + DIMS +
      ',s:' + JSON.stringify(scales) +
      ',v:"' + Buffer.from(flat.buffer).toString('base64') + '"};\n');

    const cs = fs.statSync(path.join(DATA, 'chatCorpus.js')).size;
    const vs = fs.statSync(path.join(DATA, 'chatVectors.js')).size;
    console.log(`  chatCorpus.js  ${(cs / 1024).toFixed(0)} KB`);
    console.log(`  chatVectors.js ${(vs / 1024).toFixed(0)} KB`);
    console.log(`  total          ${((cs + vs) / 1024).toFixed(0)} KB`);
  }).catch((e) => { console.error('  embed failed:', e.message); process.exit(1); });
}

main();
