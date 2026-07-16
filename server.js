const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(express.static(__dirname, {
  index: 'index.html',
  extensions: ['html', 'csv', 'md', 'json']
}));

// --- JSON API ENDPOINTS (for agent ingestion) ---

// Serve pre-built JSON files from /data
app.get('/data/:file.json', (req, res) => {
  const file = path.join(__dirname, 'data', `${req.params.file}.json`);
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(file, (err) => {
    if (err) res.status(404).json({ error: 'Dataset not found' });
  });
});

// Generic API route: /api/:dataset → parse CSV on-the-fly → JSON
app.get('/api/:dataset', (req, res) => {
  const dataset = req.params.dataset;
  const allowed = ['timeline', 'competitors', 'partnerships', 'metrics', 'global_landscape'];
  if (!allowed.includes(dataset)) {
    return res.status(404).json({ error: 'Unknown dataset. Available: ' + allowed.join(', ') });
  }
  const csvPath = path.join(__dirname, 'data', `${dataset}.csv`);
  fs.readFile(csvPath, 'utf8', (err, csvText) => {
    if (err) return res.status(404).json({ error: 'Dataset file not found' });
    try {
      const rows = parseCSV(csvText);
      res.setHeader('Content-Type', 'application/json');
      res.json({ dataset, count: rows.length, data: rows });
    } catch (e) {
      res.status(500).json({ error: 'CSV parse error', detail: e.message });
    }
  });
});

// Simple CSV parser (handles quoted fields, commas inside quotes)
function parseCSV(text) {
  const lines = [];
  let current = '';
  let inQuotes = false;
  let field = '';
  let row = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { row.push(field); field = ''; }
      else if (ch === '\n') { row.push(field); lines.push(row); row = []; field = ''; }
      else if (ch === '\r') { /* skip */ }
      else { field += ch; }
    }
  }
  if (field || row.length) { row.push(field); lines.push(row); }
  if (lines.length === 0) return [];
  const headers = lines[0].map(h => h.trim());
  return lines.slice(1).filter(r => r.length === headers.length).map(r => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = r[i] || ''; });
    return obj;
  });
}

// llms.txt — serve with text/plain
app.get('/llms.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, 'llms.txt'));
});

// CSV files from /data — ensure proper content type (original route, kept for compat)
app.get('/data/:file', (req, res) => {
  const file = path.join(__dirname, 'data', req.params.file);
  if (file.endsWith('.csv')) {
    res.setHeader('Content-Type', 'text/csv');
  } else if (file.endsWith('.json')) {
    res.setHeader('Content-Type', 'application/json');
  }
  res.sendFile(file, (err) => {
    if (err) res.status(404).send('Not found');
  });
});

// SPA fallback — serve index.html for any route (but not /data/ or /api/)
app.get('*', (req, res) => {
  if (req.path.startsWith('/data/') || req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OpenEvidence Insights running on port ${PORT}`);
  console.log(`JSON API: /api/timeline, /api/competitors, /api/partnerships, /api/metrics, /api/global_landscape`);
  console.log(`Pre-built JSON: /data/research.json, /data/benchmarks.json`);
  console.log(`Agent manifest: /llms.txt`);
});
