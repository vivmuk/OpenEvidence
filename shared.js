
// === SHARED JS (loaded on all pages) ===
var chartColor = '#E4643D';
var chartColorLight = 'rgba(228,100,61,0.15)';

// === THEME (light is default; dark is the override) ======================
function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function cssVar(name, fallback) {
  var v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return (v && v.trim()) || fallback;
}

function getThemeColors() {
  return {
    text: cssVar('--oe-chart-ink', '#1A2520'),
    grid: cssVar('--oe-grid-line', 'rgba(0,0,0,0.07)'),
    bg: cssVar('--oe-dark-card', '#FFFFFF'),
    tooltipBg: cssVar('--oe-tooltip-bg', '#1A2520'),
    tooltipText: cssVar('--oe-tooltip-text', '#E8E6E1'),
    tooltipBorder: cssVar('--oe-tooltip-border', '#2D3D32'),
  };
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('oe-theme', theme); } catch (e) {}
  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode';
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
  // Charts bake their colours in at construction, so they must be rebuilt.
  if (typeof buildPageCharts === 'function') buildPageCharts();
}

function toggleTheme() {
  applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

// Restore the reader's choice before first paint of the charts.
(function restoreTheme() {
  var saved = null;
  try { saved = localStorage.getItem('oe-theme'); } catch (e) {}
  var theme = saved || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode';
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  });
})();

let charts = [];

function makeChart(id, labels, data, label, type='line') {
  const el = document.getElementById(id);
  if (!el) { console.warn('[OE] Chart canvas #' + id + ' not found'); return null; }
  const ctx = el.getContext('2d');
  const tc = getThemeColors();
  return new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        borderColor: chartColor,
        backgroundColor: chartColorLight,
        borderWidth: 2,
        fill: type === 'line',
        tension: 0.3,
        pointBackgroundColor: chartColor,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tc.tooltipBg,
          titleColor: chartColor,
          bodyColor: tc.tooltipText,
          borderColor: tc.tooltipBorder,
          borderWidth: 1,
        }
      },
      scales: {
        x: { grid: { color: tc.grid }, ticks: { color: tc.text } },
        y: { grid: { color: tc.grid }, ticks: { color: tc.text } }
      }
    }
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}

// Close sidebar on nav link click (mobile)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.sidebar .nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) toggleSidebar();
    });
  });
});

// === DATA FRESHNESS (derived, not hardcoded) ==============================
// Every page used to hardcode "Updated: <date>" in the sidebar, so all 17
// pages drifted out of sync with the data. Derive it from whatsNew.js instead.
function parseWhatsNewDate(s) {
  var t = Date.parse(String(s || '').replace(/(\d)(st|nd|rd|th)/i, '$1'));
  return isNaN(t) ? null : new Date(t);
}

function renderFreshness() {
  if (typeof whatsNewData === 'undefined' || !whatsNewData.length) return;
  var newest = whatsNewData[0];
  var d = parseWhatsNewDate(newest.date);
  if (!d) return;

  var days = Math.max(0, Math.floor((Date.now() - d.getTime()) / 86400000));
  var state = days <= 2 ? 'fresh' : (days <= 7 ? 'aging' : 'stale');
  var ago = days === 0 ? 'today' : (days === 1 ? '1 day ago' : days + ' days ago');

  document.querySelectorAll('.updated-info').forEach(function (el) {
    el.classList.remove('fresh', 'aging', 'stale');
    el.classList.add('freshness', state);
    el.setAttribute('title', 'Newest tracked entry: ' + newest.date);
    el.innerHTML = '<span class="freshness-dot"></span>Data current to ' +
      newest.date + ' · ' + ago;
  });

  // Hero "Last updated" line: add a matching status chip if the page has one.
  var hero = document.querySelector('.hero .updated');
  if (hero) hero.setAttribute('data-freshness', state);
}

document.addEventListener('DOMContentLoaded', renderFreshness);

// === SIGNAL FEED (materiality-ranked) =====================================
function signalTier(score) {
  if (score >= 85) return 1;
  if (score >= 70) return 2;
  if (score >= 55) return 3;
  return 4;
}

function renderSignals() {
  var host = document.getElementById('signalFeed');
  if (!host || typeof signalsData === 'undefined' || !signalsData.length) return;
  var limit = parseInt(host.getAttribute('data-limit') || '8', 10);

  var html = '<h2>Top <span class="accent">Signals</span></h2>';
  html += '<p class="section-sub">Ranked by materiality, not recency. Competitive results and ' +
          'announcements outrank routine research sweeps.</p>';
  html += '<ul class="signal-list">';

  signalsData.slice(0, limit).forEach(function (s, i) {
    var tier = signalTier(s.score);
    var title = s.url
      ? '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.title + '</a>'
      : s.title;
    var flags = [];
    if (s.comparative) flags.push('<span class="sig-flag">head-to-head</span>');
    if (s.competitors && s.competitors.length) flags.push(s.competitors.slice(0, 3).join(', '));

    html += '<li class="signal-item tier-' + tier + '">';
    html += '<div class="signal-rank">' + (i + 1) + '</div>';
    html += '<div class="signal-body">';
    html += '<div class="signal-title">' + title + '</div>';
    if (s.desc) html += '<div class="signal-desc">' + s.desc + '</div>';
    html += '<div class="signal-meta">';
    html += '<span class="sig-cat">' + (s.cat || '') + '</span>';
    html += '<span>' + (s.date || '') + '</span>';
    if (s.src) html += '<span>' + s.src + '</span>';
    html += '<span class="confidence ' + s.confidence + '">' + s.confidence + '</span>';
    if (flags.length) html += '<span>' + flags.join(' &middot; ') + '</span>';
    html += '</div></div></li>';
  });
  html += '</ul>';
  host.innerHTML = html;
}

// === COMPETITIVE SCOREBOARD ===============================================
function renderScoreboard() {
  var host = document.getElementById('scoreboard');
  if (!host || typeof scoreboardData === 'undefined') return;
  var d = scoreboardData, t = d.tally || {};

  var html = '<h2>Head-to-Head <span class="accent">Standing</span></h2>';
  html += '<p class="section-sub">Derived from ' + (d.total || (d.rows || []).length) +
          ' published evaluation studies that name OpenEvidence. Position is inferred from each ' +
          'study\u2019s reported findings, so treat it as a reading of the evidence, not a verdict.</p>';

  html += '<div class="score-tally">';
  html += '<div class="tally oe"><div class="n">' + (t.oe || 0) + '</div><div class="k">OpenEvidence ahead</div></div>';
  html += '<div class="tally mixed"><div class="n">' + (t.mixed || 0) + '</div><div class="k">Mixed / no clear leader</div></div>';
  html += '<div class="tally competitor"><div class="n">' + (t.competitor || 0) + '</div><div class="k">Competitor ahead</div></div>';
  html += '</div>';

  html += '<ul class="score-rows">';
  (d.rows || []).slice(0, 12).forEach(function (r) {
    var label = { oe: 'OE ahead', mixed: 'Mixed', competitor: 'Competitor' }[r.position] || r.position;
    var title = r.url ? '<a href="' + r.url + '" target="_blank" rel="noopener">' + r.title + '</a>' : r.title;
    html += '<li class="score-row">';
    html += '<div class="pos ' + r.position + '">' + label + '</div>';
    html += '<div><div class="r-title">' + title + '</div>';
    if (r.finding) html += '<div class="r-finding">' + r.finding + '</div>';
    html += '<div class="r-meta">';
    if (r.journal) html += '<span>' + r.journal + '</span>';
    if (r.published) html += '<span>' + r.published + '</span>';
    html += '<span class="confidence ' + r.confidence + '">' + r.confidence + '</span>';
    html += '</div></div></li>';
  });
  html += '</ul>';
  host.innerHTML = html;
}

// === GLOBAL MATRIX: filter, sort, change-highlight ========================
function initMatrix() {
  var table = document.getElementById('globalMatrix');
  var bar = document.getElementById('matrixToolbar');
  if (!table || typeof globalMatrixData === 'undefined') return;

  var REGIONS = ['us','eu','uk','cn','in','jp','sea','latam','mea'];
  var REGION_LABEL = { us:'US', eu:'EU', uk:'UK', cn:'China', in:'India', jp:'Japan', sea:'SE Asia', latam:'LATAM', mea:'MEA' };
  var state = { region: 'all', avail: 'all', sort: 'name', q: '' };

  var toolbar = bar || document.createElement('div');
  if (!bar) { toolbar.className = 'matrix-toolbar'; toolbar.id = 'matrixToolbar';
              table.parentNode.parentNode.insertBefore(toolbar, table.parentNode); }

  toolbar.innerHTML =
    '<label for="mxRegion">Region</label><select id="mxRegion"><option value="all">All</option>' +
    REGIONS.map(function(r){ return '<option value="'+r+'">'+REGION_LABEL[r]+'</option>'; }).join('') + '</select>' +
    '<label for="mxAvail">Status</label><select id="mxAvail">' +
      '<option value="all">Any</option><option value="yes">Available</option>' +
      '<option value="partial">Partial</option><option value="no">Unavailable</option>' +
      '<option value="blocked">Blocked</option></select>' +
    '<label for="mxSort">Sort</label><select id="mxSort">' +
      '<option value="name">Name</option><option value="yes">Most available</option></select>' +
    '<input id="mxQ" type="search" placeholder="Filter platforms" aria-label="Filter platforms">' +
    '<span class="spacer"></span><span class="count" id="mxCount"></span>';

  function render() {
    var rows = globalMatrixData.slice();
    if (state.q) rows = rows.filter(function(r){ return r.platform.toLowerCase().indexOf(state.q) >= 0; });
    if (state.avail !== 'all') {
      rows = rows.filter(function(r){
        if (state.region !== 'all') return (r[state.region] || 'no') === state.avail;
        // Region = All. Available/Unavailable only mean something as a
        // whole-of-market claim; "in at least one region" matches all 42 rows
        // and makes the control look broken.
        if (state.avail === 'yes' || state.avail === 'no') {
          return REGIONS.every(function(k){ return (r[k] || 'no') === state.avail; });
        }
        return REGIONS.some(function(k){ return r[k] === state.avail; });
      });
    }
    if (state.sort === 'yes') {
      rows.sort(function(a,b){
        var c = function(r){ return REGIONS.filter(function(k){ return r[k]==='yes'; }).length; };
        return c(b) - c(a) || a.platform.localeCompare(b.platform);
      });
    } else {
      rows.sort(function(a,b){ return a.platform.localeCompare(b.platform); });
    }

    // Movements since the previous weekly snapshot, keyed platform|region.
    var changeMap = {};
    var changes = (typeof matrixChangesData !== 'undefined' && matrixChangesData.changes) || [];
    changes.forEach(function(c){ changeMap[c.platform + '|' + c.region] = c; });

    var head = '<thead><tr><th>Platform</th>' + REGIONS.map(function(r){
      return '<th title="'+REGION_LABEL[r]+'">'+REGION_LABEL[r]+'</th>'; }).join('') + '</tr></thead>';
    var body = '<tbody>' + rows.map(function(r){
      var cells = REGIONS.map(function(k){
        var v = r[k] || 'no';
        var glyph = { yes:'\u2713', no:'\u2717', partial:'~', blocked:'\u2298' }[v] || v;
        var cls = { yes:'yes', no:'no', partial:'partial', blocked:'blocked' }[v] || '';
        var ch = changeMap[r.platform + '|' + k];
        if (ch) {
          cls += ' changed';
          var was = ch.from || 'not listed';
          return '<td class="'+cls+'" title="'+REGION_LABEL[k]+': '+v+' (was '+was+')">'+glyph+'</td>';
        }
        return '<td class="'+cls+'" title="'+REGION_LABEL[k]+': '+v+'">'+glyph+'</td>';
      }).join('');
      var moved = REGIONS.some(function(k){ return changeMap[r.platform + '|' + k]; });
      return '<tr' + (moved ? ' class="matrix-changed"' : '') + '><td><strong>'+r.platform+'</strong></td>'+cells+'</tr>';
    }).join('') + '</tbody>';

    table.innerHTML = head + body;
    var c = document.getElementById('mxCount');
    if (c) {
      var scope = '';
      if (state.avail !== 'all') {
        var verb = { yes: 'available', no: 'unavailable', partial: 'partial', blocked: 'blocked' }[state.avail];
        scope = state.region === 'all'
          ? ' \u00b7 ' + verb + (state.avail === 'yes' || state.avail === 'no' ? ' in every region' : ' in at least one region')
          : ' \u00b7 ' + verb + ' in ' + REGION_LABEL[state.region];
      }
      var moved = '';
      if (typeof matrixChangesData !== 'undefined' && matrixChangesData.changeCount) {
        moved = ' \u00b7 ' + matrixChangesData.changeCount + ' moved since ' +
                (matrixChangesData.baselineWeek || 'last snapshot');
      }
      c.textContent = rows.length + ' of ' + globalMatrixData.length + ' platforms' + scope + moved;
    }
  }

  toolbar.addEventListener('input', function(e){
    var id = e.target.id;
    if (id === 'mxQ') state.q = e.target.value.trim().toLowerCase();
    if (id === 'mxRegion') state.region = e.target.value;
    if (id === 'mxAvail') state.avail = e.target.value;
    if (id === 'mxSort') state.sort = e.target.value;
    render();
  });
  toolbar.addEventListener('change', function(e){ e.target.dispatchEvent(new Event('input', {bubbles:true})); });
  render();
}

// === COMMAND PALETTE (Cmd/Ctrl+K) ==========================================
function fuzzyScore(needle, hay) {
  needle = needle.toLowerCase(); hay = hay.toLowerCase();
  var idx = hay.indexOf(needle);
  if (idx === 0) return 1000;
  if (idx > 0) return 500 - idx;
  var i = 0, score = 0;
  for (var c = 0; c < hay.length && i < needle.length; c++) {
    if (hay[c] === needle[i]) { score += 2; i++; }
  }
  return i === needle.length ? score : -1;
}

function initPalette() {
  if (document.getElementById('paletteOverlay')) return;

  // The search index is ~110KB. Don't pay for it on page load; fetch it the
  // first time someone actually opens the palette.
  var indexState = (typeof searchIndexData !== 'undefined' && searchIndexData.length) ? 'ready' : 'idle';
  function ensureIndex(cb) {
    if (indexState === 'ready') return cb();
    if (indexState === 'loading') { document.addEventListener('oe-index-ready', cb, { once: true }); return; }
    indexState = 'loading';
    var s = document.createElement('script');
    s.src = '/data/search-index.js';
    s.onload = function () {
      indexState = (typeof searchIndexData !== 'undefined' && searchIndexData.length) ? 'ready' : 'failed';
      document.dispatchEvent(new Event('oe-index-ready'));
      cb();
    };
    s.onerror = function () { indexState = 'failed'; cb(); };
    document.head.appendChild(s);
  }

  var overlay = document.createElement('div');
  overlay.className = 'palette-overlay';
  overlay.id = 'paletteOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Search OpenEvidence Insights');
  overlay.innerHTML =
    '<div class="palette"><input class="palette-input" id="paletteInput" type="text" ' +
    'placeholder="Search pages, papers, benchmarks, partners\u2026" aria-label="Search" ' +
    'autocomplete="off" spellcheck="false">' +
    '<ul class="palette-results" id="paletteResults" role="listbox"></ul>' +
    '<div class="palette-hint"><span><kbd>\u2191</kbd><kbd>\u2193</kbd> navigate</span>' +
    '<span><kbd>\u21B5</kbd> open</span><span><kbd>esc</kbd> close</span></div></div>';
  document.body.appendChild(overlay);

  // Trigger button lives in the sidebar footer, so it appears on every page.
  var foot = document.querySelector('.sidebar-footer');
  if (foot && !foot.querySelector('.palette-trigger')) {
    var btn = document.createElement('button');
    btn.className = 'palette-trigger';
    btn.type = 'button';
    btn.innerHTML = '<span>Search\u2026</span><kbd>Ctrl K</kbd>';
    btn.addEventListener('click', openPalette);
    foot.insertBefore(btn, foot.firstChild);
  }

  var input = document.getElementById('paletteInput');
  var results = document.getElementById('paletteResults');
  var matches = [], cursor = 0;

  function search(q) {
    if (typeof searchIndexData === 'undefined') return [];
    if (!q) return searchIndexData.slice(0, 20);
    var scored = [];
    for (var i = 0; i < searchIndexData.length; i++) {
      var e = searchIndexData[i];
      var s = Math.max(fuzzyScore(q, e.l) , Math.floor(fuzzyScore(q, e.s || '') / 2));
      if (s > 0) scored.push([s, e]);
    }
    scored.sort(function(a, b){ return b[0] - a[0]; });
    return scored.slice(0, 30).map(function(p){ return p[1]; });
  }

  function paint() {
    if (!matches.length) { results.innerHTML = '<li class="palette-empty">No matches</li>'; return; }
    results.innerHTML = matches.map(function(e, i) {
      return '<li class="palette-item" role="option" data-i="' + i + '" aria-selected="' + (i === cursor) + '">' +
        '<span class="palette-kind">' + e.t + '</span>' +
        '<span class="palette-label">' + e.l + '</span>' +
        (e.s ? '<span class="palette-sub">' + e.s + '</span>' : '') + '</li>';
    }).join('');
    var sel = results.querySelector('[aria-selected="true"]');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }

  function go(e) {
    if (!e) return;
    if (e.x && /^https?:/.test(e.h)) window.open(e.h, '_blank', 'noopener');
    else window.location.href = e.h;
    closePalette();
  }

  function refresh() {
    if (typeof searchIndexData === 'undefined') { matches = []; cursor = 0; paint(); return; }
    matches = search(input.value.trim().toLowerCase()); cursor = 0; paint();
  }

  input.addEventListener('input', refresh);
  input.addEventListener('keydown', function(ev) {
    if (ev.key === 'ArrowDown') { ev.preventDefault(); cursor = Math.min(cursor + 1, matches.length - 1); paint(); }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); cursor = Math.max(cursor - 1, 0); paint(); }
    else if (ev.key === 'Enter') { ev.preventDefault(); go(matches[cursor]); }
    else if (ev.key === 'Escape') { closePalette(); }
  });
  results.addEventListener('click', function(ev) {
    var li = ev.target.closest('.palette-item');
    if (li) go(matches[parseInt(li.getAttribute('data-i'), 10)]);
  });
  overlay.addEventListener('click', function(ev) { if (ev.target === overlay) closePalette(); });

  document.addEventListener('keydown', function(ev) {
    if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') { ev.preventDefault(); openPalette(); }
    else if (ev.key === 'Escape' && overlay.classList.contains('open')) closePalette();
  });

  window.openPalette = openPalette;
  window.closePalette = closePalette;
  function openPalette() {
    overlay.classList.add('open');
    input.value = '';
    matches = [];
    results.innerHTML = '<li class="palette-empty">Loading index\u2026</li>';
    input.focus();
    ensureIndex(function () { refresh(); });
  }
  function closePalette() { overlay.classList.remove('open'); }
}

document.addEventListener('DOMContentLoaded', function () {
  renderSignals();
  renderScoreboard();
  initMatrix();
  initPalette();
});

// === REGIONAL COVERAGE =====================================================
// A coverage view over the availability matrix. Not a geographic map: a real
// map needs a vendored basemap and country-level data the tracker doesn't hold.
function initRegionCoverage() {
  var host = document.getElementById('regionCoverage');
  if (!host || typeof globalMatrixData === 'undefined' || !globalMatrixData.length) return;
  var REGIONS = ['us', 'eu', 'uk', 'cn', 'in', 'jp', 'sea', 'latam', 'mea'];
  var LABEL = { us:'US', eu:'EU', uk:'UK', cn:'China', in:'India', jp:'Japan', sea:'SE Asia', latam:'LATAM', mea:'MEA' };
  var total = globalMatrixData.length;

  var rows = REGIONS.map(function (k) {
    var c = { yes: 0, partial: 0, no: 0, blocked: 0 };
    globalMatrixData.forEach(function (r) { c[r[k] || 'no']++; });
    return { k: k, c: c, score: c.yes + c.partial * 0.5 };
  });
  rows.sort(function (a, b) { return b.score - a.score; });

  var html = '<h2>Regional <span class="accent">Coverage</span></h2>';
  html += '<p class="section-sub">Share of the ' + total + ' tracked platforms available in each region. ' +
          'A coverage view, not a geographic map.</p>';
  rows.forEach(function (r) {
    html += '<div class="coverage-row"><div class="rname">' + LABEL[r.k] + '</div><div class="coverage-bar">';
    ['yes', 'partial', 'no', 'blocked'].forEach(function (s) {
      var n = r.c[s];
      if (!n) return;
      html += '<span class="seg-' + s + '" style="width:' + (n / total * 100).toFixed(2) +
              '%" title="' + s + ': ' + n + ' of ' + total + '"></span>';
    });
    html += '</div><div class="rnum">' + r.c.yes + '/' + total + '</div></div>';
  });
  html += '<div class="coverage-legend">' +
          '<span><i class="seg-yes"></i>Available</span>' +
          '<span><i class="seg-partial"></i>Partial</span>' +
          '<span><i class="seg-no"></i>Unavailable</span>' +
          '<span><i class="seg-blocked"></i>Blocked</span></div>';
  host.innerHTML = html;
}

// === KEYBOARD DISMISSAL ====================================================
// The backdrop divs carry onclick but are presentational (no button semantics),
// so Escape is the accessible route to the same action.
document.addEventListener('keydown', function (ev) {
  if (ev.key !== 'Escape') return;
  var sb = document.getElementById('sidebar');
  if (sb && sb.classList.contains('open')) {
    if (typeof toggleSidebar === 'function') toggleSidebar();
    return;
  }
  var fm = document.getElementById('featureModal');
  if (fm && getComputedStyle(fm).display !== 'none' && typeof closeFeatureModal === 'function') {
    closeFeatureModal();
  }
});

document.addEventListener('DOMContentLoaded', initRegionCoverage);
