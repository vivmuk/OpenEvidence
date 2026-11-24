#!/usr/bin/env node
/**
 * Guard: every page that renders from a data file must actually render.
 *
 * This exists because of a family of silent failures, not one bug:
 *
 *   - The homepage "What's New" panel rendered EMPTY because data/whatsNew.js
 *     was rewritten in a flat shape while renderWhatsNew() still expected the
 *     older batch shape.
 *   - The competitors grid rendered EMPTY because data/competitors.js gained
 *     news-shaped entries and the renderer did c.stats.map on every entry.
 *   - Two publication cards rendered blank because their entries used the
 *     search-index shape.
 *   - The site search index listed "undefined" for the same mixed array.
 *
 * In every case the DATA looked healthy - it parsed, it had the right count,
 * it looked right in the file - and the page was blank. So this script runs
 * each page's own render function against the real data file and fails if it
 * throws, emits no items, or emits "undefined".
 *
 * Usage: node scripts/check_pages_render.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

// [page, data file, exported var, render fn name in the page, id to read]
const PAGES = [
  ['index.html', 'data/whatsNew.js', 'whatsNewData', 'renderWhatsNew', 'whatsNewContent'],
  ['competitors.html', 'data/competitors.js', 'competitorsData', null, 'competitorGrid'],
  ['publications.html', 'data/publications.js', 'publicationsData', null, 'pubList'],
  ['products.html', 'data/products.js', 'productsData', null, 'productsList'],
  ['benchmarks.html', 'data/benchmarks.js', 'benchmarksData', null, 'benchmarkList'],
];

let failures = 0;

for (const [page, dataFile, varName, fnName, containerId] of PAGES) {
  const pagePath = path.join(ROOT, page);
  const dataPath = path.join(ROOT, dataFile);
  if (!fs.existsSync(pagePath) || !fs.existsSync(dataPath)) {
    console.log(`SKIP ${page} (missing ${fs.existsSync(pagePath) ? dataFile : page})`);
    continue;
  }
  const html = fs.readFileSync(pagePath, 'utf8');
  const dataSrc = fs.readFileSync(dataPath, 'utf8');

  let rendered = '';
  const ctx = {
    console,
    Date,
    String,
    Number,
    Math,
    Array,
    JSON,
    Object,
    document: {
      getElementById: (id) => (id === containerId
        ? { set innerHTML(v) { rendered = v; } }
        : null),
      querySelector: () => null,
      querySelectorAll: () => [],
    },
    window: { addEventListener: (ev, fn) => { if (ev === 'load') ctx.__load = fn; } },
    addEventListener: (ev, fn) => { if (ev === 'load') ctx.__load = fn; },
    oeNewBadge: () => '',
  };
  vm.createContext(ctx);

  try {
    vm.runInContext(dataSrc, ctx, { filename: dataFile });
  } catch (e) {
    console.log(`FAIL ${dataFile} does not evaluate: ${e.message}`);
    failures++;
    continue;
  }
  if (typeof ctx[varName] === 'undefined') {
    console.log(`FAIL ${dataFile} does not export ${varName}`);
    failures++;
    continue;
  }

  // Extract the page's render code: the named function, or the whole inline
  // script block that assigns into the container.
  let code = '';
  if (fnName) {
    const m = html.match(new RegExp(`function ${fnName}\\(\\)\\s*\\{[\\s\\S]*?\\n\\}`));
    if (!m) { console.log(`FAIL ${page}: ${fnName}() not found`); failures++; continue; }
    code = m[0];
  } else {
    // take the last inline <script> block in the page
    const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    code = blocks.filter((b) => b.includes(containerId)).pop() || '';
    if (!code) { console.log(`FAIL ${page}: no inline script writes ${containerId}`); failures++; continue; }
  }

  try {
    vm.runInContext(code, ctx, { filename: page });
    if (typeof ctx[fnName || '__anon'] === 'function') ctx[fnName || '__anon']();
    else if (ctx.__load) ctx.__load();
  } catch (e) {
    console.log(`FAIL ${page} render threw against the real data:`);
    console.log(`       ${e && e.message ? e.message : String(e)}`);
    console.log(`       The page and ${dataFile} disagree about the data shape.`);
    failures++;
    continue;
  }

  const entries = Array.isArray(ctx[varName]) ? ctx[varName].length : 0;
  const cards = (rendered.match(/class="[a-z-]*(card|item|competitor|feature)/g) || []).length;
  const undefinedCount = (rendered.match(/undefined/g) || []).length;

  if (cards === 0) {
    console.log(`FAIL ${page}: rendered NO items from ${entries} data entries - the section would be empty.`);
    failures++;
    continue;
  }
  if (undefinedCount > 0) {
    console.log(`FAIL ${page}: rendered HTML contains "undefined" x${undefinedCount} - a field is missing.`);
    failures++;
    continue;
  }
  console.log(`ok   ${page.padEnd(20)} ${String(entries).padStart(4)} entries -> ${String(cards).padStart(3)} rendered cards`);
}

if (failures) {
  console.log(`\n${failures} page(s) would render empty or malformed.`);
  process.exit(1);
}
console.log('\nAll page renderers produce content from their real data files.');
