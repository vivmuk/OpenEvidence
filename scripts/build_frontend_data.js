#!/usr/bin/env node
/**
 * Build the front-end data layer for the OE Insights site.
 *
 * Emits three derived data files from the existing sources, so the browser
 * does no ranking or aggregation work at runtime and the results are
 * reproducible from the repo:
 *
 *   data/signals.js       materiality-ranked recent events  (feature 1)
 *   data/search-index.js  cross-entity index for Cmd+K      (feature 2)
 *   data/scoreboard.js    head-to-head competitive standing (feature 4)
 *
 * Confidence is attached to signals and scoreboard rows (feature 3) using a
 * single vocabulary: confirmed | reported | inferred.
 *
 * Usage:  node scripts/build_frontend_data.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');

// ---------------------------------------------------------------- loaders

/** Read a `var NAME = [...]` JS data file into a real array. */
function loadJsVar(file, varName) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8');
  const ctx = vm.createContext({});
  try {
    vm.runInContext(src, ctx, { timeout: 5000 });
    return ctx[varName] || [];
  } catch (e) {
    console.warn(`  ! could not load ${file}: ${e.message}`);
    return [];
  }
}

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA, file), 'utf8'));
  } catch (e) {
    console.warn(`  ! could not load ${file}: ${e.message}`);
    return [];
  }
}

// ------------------------------------------------------------ vocabulary

const BASE = {
  Funding: 46, Partnership: 52, Product: 48, Metric: 40,
  Legal: 38, Regulatory: 38, Benchmark: 34, Research: 12, Other: 18,
};

// Named competitors. Mentioning one alongside a comparative verb is the
// strongest signal a tracker like this can carry.
const COMPETITORS = [
  'Doximity', 'UpToDate', 'ChatGPT for Clinicians', 'iatroX', 'Abridge',
  'OpenAI', 'Anthropic', 'Perplexity', 'Google', 'Medscape', 'Elsevier',
];

const COMPARATIVE = /\b(outperform|surpass|beat|beats|better than|worse than|head-to-head|versus|vs\.?|compared?|comparison|more accurate|less accurate|higher|lower)\b/i;

// Source tiers drive confidence.
const PRIMARY = [
  'openevidence.com', 'businesswire', 'prnewswire', 'reuters', 'nature.com',
  'jamanetwork', 'nejm.org', 'fda.gov', 'sec.gov', 'bloomberg',
];
const SECONDARY = [
  'fiercehealthcare', 'statnews', 'beckershospitalreview', 'axios', 'cnbc',
  'forbes', 'nytimes', 'endpoints', 'medcitynews', 'techcrunch', 'sacra.com',
  'unite.ai', 'medium.com', 'substack.com',
];

function confidenceOf(url, src) {
  const u = String(url || '').toLowerCase();
  if (PRIMARY.some(h => u.includes(h))) return 'confirmed';
  if (SECONDARY.some(h => u.includes(h))) return 'reported';
  if (u) return 'reported';
  return 'inferred';
}

const CONF_LABEL = {
  confirmed: 'Confirmed', reported: 'Reported', inferred: 'Inferred',
};

// Some records store list-ish fields as a plain string, others as an array.
// Both shapes occur in the data, so normalise rather than assume.
const asArray = v => (Array.isArray(v) ? v : (v === null || v === undefined || v === '' ? [] : [String(v)]));
const asText = v => asArray(v).join(' ');

// ------------------------------------------------------- feature 1: signals

function scoreEvent(e) {
  let score = BASE[e.cat] || BASE.Other;
  const text = `${e.title || ''} ${e.desc || ''}`;

  // This tracker is about OpenEvidence. A story that isn't about OE at all is
  // context, not signal, and should not lead the feed.
  const aboutOE = /openevidence/i.test(text);
  if (aboutOE) score += 22;
  else score -= 16;

  const named = COMPETITORS.filter(c => text.includes(c));
  if (named.length) score += 6;
  // A comparative claim involving a competitor is the headline case.
  if (named.length && COMPARATIVE.test(text)) score += 30;
  if (/\b(valuation|raise|series [a-e]|funding round|\$\d+\s?[mb])\b/i.test(text)) score += 8;
  if (/\b(health system|hospital|deploys?|rollout|integrates?)\b/i.test(text)) score += 6;
  if (/\b(nature medicine|jama|nejm|annals)\b/i.test(text)) score += 10;
  if (e.url) score += 3;
  if (e.new) score += 4;

  // Routine sweeps should never lead the feed.
  if (/^(weekly|daily)\b/i.test(e.title || '')) score -= 24;
  if (/\b\d+ new (pubmed|arxiv|clinical ai) papers\b/i.test(text)) score -= 20;

  return Math.max(1, Math.min(100, Math.round(score)));
}

function buildSignals(timeline) {
  const seen = new Set();
  const out = [];
  for (const e of timeline) {
    const key = `${e.date}|${e.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const named = COMPETITORS.filter(c => `${e.title} ${e.desc}`.includes(c));
    out.push({
      date: e.date,
      cat: e.cat || 'Other',
      title: e.title,
      desc: (e.desc || '').slice(0, 300),
      src: e.src || '',
      url: e.url || '',
      score: scoreEvent(e),
      confidence: confidenceOf(e.url, e.src),
      competitors: named,
      comparative: named.length > 0 && COMPARATIVE.test(`${e.title} ${e.desc}`),
    });
  }
  // Rank by materiality first, then recency. Keep a bounded feed.
  out.sort((a, b) => (b.score - a.score) || String(b.date).localeCompare(String(a.date)));
  return out.slice(0, 60);
}

// --------------------------------------------------- feature 2: search index

function buildIndex({ timeline, competitors, partners, research, benchmarks }) {
  const idx = [];
  const push = (type, label, sub, href, ext) =>
    idx.push({ t: type, l: String(label).slice(0, 120), s: String(sub || '').slice(0, 90), h: href, x: ext ? 1 : 0 });

  const PAGES = [
    ['Overview', '/'], ['Timeline', '/timeline'], ['Funding', '/funding'],
    ['Products', '/products'], ['Features', '/features'], ['Competitors', '/competitors'],
    ['Partnerships', '/partnerships'], ['Publishers', '/publishers'], ['Tech Stack', '/tech'],
    ['Pharma', '/pharma'], ['Benchmarks', '/benchmarks'], ['SCT Benchmark', '/sct'],
    ['Publications', '/publications'], ['Doximity Ask', '/doximity'],
    ['Global Landscape', '/global'], ['Future', '/future'], ['Sources', '/sources'],
  ];
  for (const [label, href] of PAGES) push('Page', label, 'Section', href);

  for (const c of competitors) push('Competitor', c.name, c.type || '', '/competitors');
  for (const p of partners) push('Partner', p.name, p.type || '', '/partnerships');

  for (const r of research) {
    const sub = [r.source, r.journal, r.published].filter(Boolean).join(' · ');
    push('Paper', r.title, sub, r.url || '/publications', !!r.url);
  }
  for (const b of benchmarks) {
    const sub = [b.source, b.journal, b.published].filter(Boolean).join(' · ');
    push('Benchmark', b.title, sub, b.url || '/benchmarks', !!b.url);
  }
  for (const t of timeline) push('Event', t.title, `${t.date} · ${t.cat}`, '/timeline');

  // de-dupe on type+label
  const seen = new Set();
  return idx.filter(e => {
    const k = `${e.t}|${e.l}`;
    if (seen.has(k)) return false;
    seen.add(k); return true;
  });
}

// ------------------------------------------------- feature 4: scoreboard

function positionOf(text) {
  const t = String(text || '');
  if (!/openevidence/i.test(t)) return null;
  const oeWins = /\b(openevidence[^.]{0,80}(outperform|surpass|better|higher|more accurate|superior|excel)|outperform\w*[^.]{0,60}openevidence)\b/i.test(t);
  const otherWins = /\b(gpt|gemini|claude|chatgpt|doximity|uptodate|general[- ]purpose|frontier)[^.]{0,90}(outperform|surpass|better|higher|more accurate|superior)\b/i.test(t);
  if (otherWins && !oeWins) return 'competitor';
  if (oeWins && !otherWins) return 'oe';
  return 'mixed';
}

function buildScoreboard(benchmarks, research) {
  const rows = [];
  for (const b of [...benchmarks, ...research]) {
    const blob = `${b.title || ''} ${asText(b.key_findings)} ${asText(b.abstract)} ${asText(b.key_findings_summary)}`;
    if (!/openevidence/i.test(blob)) continue;
    const pos = positionOf(blob);
    if (!pos) continue;
    rows.push({
      title: b.title,
      journal: b.journal || b.source || '',
      published: b.published || '',
      tools: b.tools_evaluated || '',
      position: pos,
      confidence: confidenceOf(b.url, b.source),
      url: b.url || '',
      finding: (asArray(b.key_findings)[0] || asText(b.abstract) || '').slice(0, 260),
    });
  }
  rows.sort((a, b) => String(b.published).localeCompare(String(a.published)));
  const tally = { oe: 0, mixed: 0, competitor: 0 };
  rows.forEach(r => { tally[r.position] = (tally[r.position] || 0) + 1; });
  return { generated: new Date().toISOString().slice(0, 10), total: rows.length, tally, rows: rows.slice(0, 40) };
}

// ------------------------------------------------------------------- main

function banner(name, note) {
  return `// AUTO-GENERATED by scripts/build_frontend_data.js — do not edit by hand.\n` +
         `// ${note}\n`;
}

function main() {
  const timeline = loadJsVar('timeline.js', 'timelineData');
  const competitors = loadJsVar('competitors.js', 'competitorsData');
  const partners = loadJsVar('partners.js', 'partnersData');
  const research = loadJson('research.json');
  const benchmarks = loadJson('benchmarks.json');

  console.log('sources:',
    `timeline=${timeline.length}`, `competitors=${competitors.length}`,
    `partners=${partners.length}`, `research=${research.length}`, `benchmarks=${benchmarks.length}`);

  const signals = buildSignals(timeline);
  const index = buildIndex({ timeline, competitors, partners, research, benchmarks });
  const scoreboard = buildScoreboard(benchmarks, research);

  fs.writeFileSync(path.join(DATA, 'signals.js'),
    banner('signals.js', 'Materiality-ranked events. score 1-100; confidence: confirmed|reported|inferred.') +
    `var signalsData = ${JSON.stringify(signals, null, 1)};\n`);

  fs.writeFileSync(path.join(DATA, 'search-index.js'),
    banner('search-index.js', 'Cmd+K index. t=type l=label s=sub h=href x=external') +
    `var searchIndexData = ${JSON.stringify(index)};\n`);

  fs.writeFileSync(path.join(DATA, 'scoreboard.js'),
    banner('scoreboard.js', 'Head-to-head standing derived from evaluation studies.') +
    `var scoreboardData = ${JSON.stringify(scoreboard, null, 1)};\n`);

  console.log(`signals:    ${signals.length} (top score ${signals[0] ? signals[0].score : 0})`);
  console.log(`index:      ${index.length} entries`);
  console.log(`scoreboard: ${scoreboard.rows.length} studies`, JSON.stringify(scoreboard.tally));
  console.log('top 3 signals:');
  signals.slice(0, 3).forEach(s => console.log(`  [${s.score}] ${s.confidence} · ${s.title.slice(0, 70)}`));
}

main();
