const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(express.static(__dirname, {
  index: 'index.html',
  extensions: ['html', 'csv', 'md']
}));

// CSV files from /data — ensure proper content type
app.get('/data/:file', (req, res) => {
  const file = path.join(__dirname, 'data', req.params.file);
  if (file.endsWith('.csv')) {
    res.setHeader('Content-Type', 'text/csv');
  }
  res.sendFile(file, (err) => {
    if (err) res.status(404).send('Not found');
  });
});

// SPA fallback — serve index.html for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OpenEvidence Insights running on port ${PORT}`);
});
