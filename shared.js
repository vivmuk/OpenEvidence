
// === SHARED JS (loaded on all pages) ===
var chartColor = '#E4643D';
var chartColorLight = 'rgba(228,100,61,0.15)';

function getThemeColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark
    ? { text: '#E8E6E1', grid: 'rgba(255,255,255,0.06)', bg: '#1A2520' }
    : { text: '#1A2520', grid: 'rgba(0,0,0,0.06)', bg: '#FFFFFF' };
}

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
          backgroundColor: '#1A2520',
          titleColor: chartColor,
          bodyColor: '#E8E6E1',
          borderColor: '#2D3D32',
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

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = isDark ? '☀ Light Mode' : '☾ Dark Mode';
  // Rebuild charts on this page
  if (typeof buildPageCharts === 'function') buildPageCharts();
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
