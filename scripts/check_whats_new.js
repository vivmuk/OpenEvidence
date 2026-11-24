#!/usr/bin/env node
/**
 * Guard: the homepage "What's New" panel must actually render.
 *
 * This exists because of a real outage that was invisible in the data:
 * data/whatsNew.js was rewritten by a tracker job in the flat
 * {date, category, title, desc} shape while index.html's renderWhatsNew()
 * still expected the older {date, updated, items:[...]} batch shape. The
 * renderer threw on batch.items.forEach, the panel rendered EMPTY, and the
 * data file looked perfectly healthy - so every tracker job kept appending
 * to a panel nobody could see.
 *
 * This script runs the homepage's own render function against the real data
 * file and fails if it throws or produces no items. Add it to the pre-commit
 * gate so the mismatch is caught the moment a data file changes shape.
 *
 * Usage: node scripts/check_whats_new.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const whatsNewJs = fs.readFileSync(path.join(ROOT, 'data', 'whatsNew.js'), 'utf8');

// Pull the render function (and anything it needs) out of the page.
const fnMatch = indexHtml.match(/function renderWhatsNew\(\)\s*\{[\s\S]*?\n\}/);
if (!fnMatch) {
  console.error('FAIL: renderWhatsNew() not found in index.html');
  process.exit(1);
}

// The data and the renderer must share ONE context: the renderer reads the
// global `whatsNewData`, so evaluating them separately makes the renderer
// see an undefined global and silently render nothing.
const vm = require('vm');
let rendered = '';
const ctx = {
  console,
  Date,
  String,
  document: {
    getElementById: (id) => (id === 'whatsNewContent' ? { set innerHTML(v) { rendered = v; } } : null),
  },
};
vm.createContext(ctx);

try {
  vm.runInContext(whatsNewJs, ctx, { filename: 'data/whatsNew.js' });
} catch (e) {
  console.error('FAIL: data/whatsNew.js failed to evaluate: ' + (e && e.message ? e.message : String(e)));
  process.exit(1);
}

if (typeof ctx.whatsNewData === 'undefined') {
  console.error('FAIL: data/whatsNew.js does not define whatsNewData');
  process.exit(1);
}

try {
  vm.runInContext(fnMatch[0], ctx, { filename: 'index.html#renderWhatsNew' });
  ctx.renderWhatsNew();
} catch (e) {
  console.error('FAIL: renderWhatsNew() threw against the real data file:');
  console.error('  ' + (e && e.message ? e.message : String(e)));
  console.error('  This is the shape-mismatch failure: the renderer and');
  console.error('  data/whatsNew.js disagree about the data structure.');
  process.exit(1);
}

const itemCount = (rendered.match(/class="wn-item"/g) || []).length;
const titleCount = (rendered.match(/class="wn-title"/g) || []).length;
const dataCount = Array.isArray(ctx.whatsNewData) ? ctx.whatsNewData.length : 0;

if (itemCount === 0) {
  console.error('FAIL: renderWhatsNew() produced no items from ' + dataCount + ' data entries.');
  console.error('  The panel would render EMPTY on the homepage.');
  process.exit(1);
}

if (itemCount !== titleCount) {
  console.error('FAIL: ' + itemCount + ' cards but ' + titleCount + ' titles - malformed markup.');
  process.exit(1);
}

if (rendered.includes('undefined')) {
  console.error('FAIL: rendered HTML contains "undefined" - a field is missing from the data.');
  process.exit(1);
}

console.log(`OK: What's New renders ${itemCount} item(s) from ${dataCount} data entr(ies).`);
