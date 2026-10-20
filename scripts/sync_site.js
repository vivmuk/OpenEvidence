#!/usr/bin/env node
/**
 * Sync the site's numeric components from the data the search agents write.
 *
 * Sources of truth:
 *   data/metrics.csv        metric observations over time
 *   data/timeline.js        events (fallback evidence for "latest")
 *   data/partnerships.csv   partner rows
 *   data/competitors.csv    competitor rows
 *   data/research.json      research papers
 *   data/benchmarks.json    benchmark studies
 *   data/publications.js    PubMed papers mentioning OpenEvidence
 *   data/timeline.js        timeline entries
 *   data/sources.js         source index
 *
 * Emits:
 *   data/metrics.js         window.siteMetrics = { generated, latest, series, counts }
 *
 * Usage:
 *   node scripts/sync_site.js            write data/metrics.js
 *   node scripts/sync_site.js --check    exit 1 if data/metrics.js is stale
 *   node scripts/sync_site.js --print    print to stdout, write nothing
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const OUT = path.join(DATA, 'metrics.js');

// ------------------------------------------------------------------ helpers

function read(file) {
  return fs.readFileSync(path.join(DATA, file), 'utf8');
}

function loadJsVar(file, varName) {
  const ctx = vm.createContext({});
  try {
    vm.runInContext(read(file), ctx, { timeout: 5000 });
    return ctx[varName] || [];
  } catch (e) {
    console.warn(`  ! ${file}: ${e.message}`);
    return [];
  }
}

function loadJson(file) {
  try {
    return JSON.parse(read(file));
  } catch (e) {
    console.warn(`  ! ${file}: ${e.message}`);
    return [];
  }
}

/** Minimal CSV parser that tolerates unquoted commas in the last column. */
function parseCsv(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const cells = [];
    let cur = '';
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (quoted && line[i + 1] === '"') { cur += '"'; i++; }
        else quoted = !quoted;
      } else if (ch === ',' && !quoted) {
        cells.push(cur); cur = '';
      } else {
        cur += ch;
      }
    }
    cells.push(cur);
    rows.push(cells);
  }
  return rows;
}

/** "15B", "1B+", "$1.02B", "42M", "65%", "760000" -> number */
function parseValue(raw) {
  const s = String(raw || '').replace(/[$,\s+]/g, '');
  const m = s.match(/^(-?\d+(?:\.\d+)?)([BMKbmk])?%?$/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  const mult = { B: 1e9, M: 1e6, K: 1e3 }[(m[2] || '').toUpperCase()] || 1;
  return n * mult;
}

function firstUrl(s) {
  const m = String(s || '').match(/https?:\/\/[^\s,]+/);
  return m ? m[0] : '';
}

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
}

function monthYear(iso) {
  const d = new Date(iso + 'T00:00:00Z');
  if (isNaN(d)) return iso;
  return d.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

// --------------------------------------------------------------- normalise

const METRIC_KEYS = [
  [/^valuation$/i, 'valuation'],
  [/^total funding$/i, 'total_funding'],
  [/^(arr|annualized revenue)$/i, 'revenue'],
  [/^(monthly consultations|consultations monthly)$/i, 'consultations'],
  [/^registered physicians$/i, 'physicians'],
  [/^physician adoption$/i, 'physician_adoption'],
  [/^single[- ]day record$/i, 'single_day'],
];

function canonicalMetric(name) {
  const n = String(name || '').trim();
  for (const [re, key] of METRIC_KEYS) if (re.test(n)) return key;
  return null;
}

// ------------------------------------------------------------------ series

function buildSeries(rows) {
  const byKey = {};
  for (const r of rows) {
    const key = canonicalMetric(r.metric);
    const value = parseValue(r.value);
    if (!key || value === null || !r.date) continue;
    (byKey[key] = byKey[key] || []).push({
      date: r.date,
      value,
      unit: r.unit,
      source: firstUrl(r.source),
    });
  }

  // Deduplicate on date (last observation wins), then sort ascending.
  const dedupe = list => {
    const seen = new Map();
    for (const x of list) seen.set(x.date, x);
    return [...seen.values()].sort((a, b) => a.date.localeCompare(b.date));
  };

  const s = {};
  for (const [key, list] of Object.entries(byKey)) s[key] = dedupe(list);
  return s;
}

// --------------------------------------------------------------- formatting

function fmtMoney(n) {
  if (n >= 1e9) return '$' + trim(n / 1e9) + 'B';
  if (n >= 1e6) return '$' + trim(n / 1e6) + 'M';
  if (n >= 1e3) return '$' + trim(n / 1e3) + 'K';
  return '$' + n;
}

function trim(n) {
  return Number(n.toFixed(2)).toString();
}

function fmtCount(n) {
  if (n >= 1e9) return trim(n / 1e9) + 'B';
  if (n >= 1e6) return trim(n / 1e6) + 'M';
  if (n >= 1e3) return trim(n / 1e3) + 'K';
  return String(n);
}

const DISPLAY = {
  valuation: fmtMoney,
  total_funding: fmtMoney,
  revenue: fmtMoney,
  consultations: fmtCount,
  physicians: fmtCount,
  physician_adoption: n => trim(n) + '%',
  single_day: fmtCount,
};

// ------------------------------------------------------------------- build

function build() {
  const csv = parseCsv(read('metrics.csv'));
  const header = csv[0].map(h => h.trim().toLowerCase());
  const idx = {
    date: header.indexOf('date'),
    metric: header.indexOf('metric'),
    value: header.indexOf('value'),
    unit: header.indexOf('unit'),
  };
  const sourceIdx = header.findIndex(h => h.includes('source'));

  const rows = csv.slice(1).map(cells => ({
    date: (cells[idx.date] || '').trim(),
    metric: (cells[idx.metric] || '').trim(),
    value: (cells[idx.value] || '').trim(),
    unit: (cells[idx.unit] || '').trim(),
    source: sourceIdx >= 0 ? cells.slice(sourceIdx).join(',') : '',
  }));

  const series = buildSeries(rows);
  const dates = rows.map(r => r.date).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();

  // Latest observation per canonical metric. Prefer the newest date; on a tie,
  // prefer the numeric over a suffixed approximation ("1B+").
  const latest = {};
  for (const [key, list] of Object.entries(series)) {
    if (!list.length) continue;
    const last = list[list.length - 1];
    const display = (DISPLAY[key] || fmtCount)(last.value);
    latest[key] = {
      value: last.value,
      display,
      date: last.date,
      month: monthYear(last.date),
      source: last.source,
      sourceHost: hostOf(last.source),
    };
  }

  // Chart-ready series (unit-scaled to what the charts plot).
  const chart = {
    consultations: {
      labels: (series.consultations || []).map(x => monthYear(x.date)),
      values: (series.consultations || []).map(x => Math.round(x.value)),
    },
    physicians: {
      labels: (series.physicians || []).map(x => monthYear(x.date)),
      values: (series.physicians || []).map(x => Math.round(x.value)),
    },
    valuation_b: {
      labels: (series.valuation || []).map(x => monthYear(x.date)),
      values: (series.valuation || []).map(x => Number((x.value / 1e9).toFixed(2))),
    },
    revenue_m: {
      labels: (series.revenue || []).map(x => monthYear(x.date)),
      values: (series.revenue || []).map(x => Number((x.value / 1e6).toFixed(1))),
    },
    funding_m: {
      labels: (series.total_funding || []).map(x => monthYear(x.date)),
      values: (series.total_funding || []).map(x => Math.round(x.value / 1e6)),
    },
  };

  // Entity counts the pages quote in prose.
  const partners = parseCsv(read('partnerships.csv')).slice(1).filter(r => r.length > 1 && r[1]);
  const competitors = parseCsv(read('competitors.csv')).slice(1).filter(r => r.length > 1 && r[0]);
  const research = loadJson('research.json');
  const benchmarks = loadJson('benchmarks.json');
  const publications = loadJsVar('publications.js', 'publicationsData');
  const timeline = loadJsVar('timeline.js', 'timelineData');
  const sources = loadJsVar('sources.js', 'sourcesData');

  const counts = {
    partners: partners.length,
    competitors: competitors.length,
    research: Array.isArray(research) ? research.length : 0,
    benchmarks: Array.isArray(benchmarks) ? benchmarks.length : 0,
    publications: publications.length,
    timeline: timeline.length,
    sources: sources.length,
  };

  return {
    // Deterministic, data-derived stamp. A wall-clock timestamp here would make
    // --check fail at every UTC midnight even when nothing changed.
    dataThrough: dates.length ? dates[dates.length - 1] : '',
    latest,
    series: chart,
    counts,
  };
}

// -------------------------------------------------------------------- main

const args = new Set(process.argv.slice(2));

if (args.has('--help')) {
  console.log('Usage: node scripts/sync_site.js [--check|--print]');
  process.exit(0);
}

const metrics = build();

// The repo bans em/en dashes in rendered copy, and the pre-commit healer
// (scripts/fix_copy_tells.py) rewrites them out of data/*.js after we write.
// Normalise here too, using the same policy, so the generated file is
// byte-identical before and after that pass and --check stays meaningful.
function deDash(text) {
  return text
    .replace(/(\d)\s*[\u2014\u2013]\s*(\d)/g, '$1-$2')
    .replace(/\s*[\u2014\u2013]\s*/g, ' - ');
}

const body = deDash(JSON.stringify(metrics, null, 2));
const output = deDash(
  '// GENERATED by scripts/sync_site.js - do not edit by hand.\n' +
  '// Source of truth: data/metrics.csv and the entity files next to it.\n' +
  '// Regenerated on every commit by .git/hooks/pre-commit.\n' +
  `var siteMetrics = ${body};\n`
);

if (args.has('--print')) {
  process.stdout.write(output);
  process.exit(0);
}

const previous = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';

if (args.has('--check')) {
  if (previous !== output) {
    console.error('data/metrics.js is stale. Run: node scripts/sync_site.js');
    process.exit(1);
  }
  console.log('data/metrics.js is up to date.');
  process.exit(0);
}

fs.writeFileSync(OUT, output);
const latest = metrics.latest;
console.log('Wrote data/metrics.js');
for (const [k, v] of Object.entries(latest)) {
  console.log(`  ${k.padEnd(20)} ${String(v.display).padEnd(8)} ${v.date}`);
}
console.log('  counts:', JSON.stringify(metrics.counts));
