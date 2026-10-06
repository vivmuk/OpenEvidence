
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
