#!/usr/bin/env node
/**
 * Audit the site data files for shape drift.
 *
 * The tracker jobs rewrite data files, and a page renderer that expects one
 * shape will silently produce an empty section (or throw) when a file starts
 * mixing shapes. This evaluates each data file for real and reports entries
 * that lack the fields the corresponding page renderer dereferences.
 *
 * Usage: node scripts/check_data_shapes.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

// [data file, exported var, required fields, page that consumes it]
const TARGETS = [
  ['data/competitors.js', 'competitorsData', ['badge', 'name', 'stats', 'type', 'desc', 'url'], 'competitors.html'],
  ['data/benchmarks.js', 'benchmarksData', ['title', 'url'], 'benchmarks.html'],
  ['data/products.js', 'productsData', ['name', 'category', 'desc', 'url'], 'products.html'],
  ['data/publications.js', 'publicationsData', ['title', 'url'], 'publications.html'],
  ['data/whatsNew.js', 'whatsNewData', ['title'], 'index.html'],
];

let problems = 0;

for (const [file, varName, required, page] of TARGETS) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) {
    console.log(`SKIP ${file} (missing)`);
    continue;
  }
  const ctx = { console };
  vm.createContext(ctx);
  try {
    vm.runInContext(fs.readFileSync(full, 'utf8'), ctx, { filename: file });
  } catch (e) {
    console.log(`FAIL ${file} does not evaluate: ${e.message}`);
    problems++;
    continue;
  }
  const data = ctx[varName];
  if (!Array.isArray(data)) {
    console.log(`FAIL ${file} does not export an array named ${varName}`);
    problems++;
    continue;
  }
  const bad = [];
  data.forEach((entry, i) => {
    if (!entry || typeof entry !== 'object') { bad.push([i, ['<not an object>'], '']); return; }
    const missing = required.filter((f) => entry[f] === undefined || entry[f] === null);
    if (missing.length) {
      const label = entry.title || entry.name || entry.company || '';
      bad.push([i, missing, String(label).slice(0, 60)]);
    }
  });
  const status = bad.length ? 'FAIL' : 'ok  ';
  console.log(`${status} ${file.padEnd(26)} ${String(data.length).padStart(4)} entries, ` +
              `${bad.length} malformed  -> ${page}`);
  bad.slice(0, 8).forEach(([i, missing, label]) => {
    console.log(`       #${i} missing ${missing.join(', ')}  ${label ? '<- ' + label : ''}`);
  });
  if (bad.length) problems += bad.length;
}

console.log(problems ? `\n${problems} malformed entr(ies) found.` : '\nAll data files match their renderers.');
process.exit(problems ? 1 : 0);
