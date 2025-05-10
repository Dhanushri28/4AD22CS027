// =============================
// Backend - server.js
// =============================
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let stockData = {};

// Endpoint to receive stock data (simulate with POST)
app.post('/api/stock', (req, res) => {
  const { symbol, prices } = req.body;
  if (!symbol || !Array.isArray(prices)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  stockData[symbol] = prices;
  res.json({ message: 'Stock data updated' });
});

// Endpoint to get average prices
app.get('/api/average-prices', (req, res) => {
  const result = Object.entries(stockData).map(([symbol, prices]) => {
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    return { symbol, average: parseFloat(avg.toFixed(2)) };
  });
  res.json(result);
});

// Endpoint to get correlation matrix
function correlation(x, y) {
  const n = x.length;
  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;
  const numerator = x.map((val, i) => (val - avgX) * (y[i] - avgY)).reduce((a, b) => a + b, 0);
  const denomX = Math.sqrt(x.map(val => (val - avgX) ** 2).reduce((a, b) => a + b, 0));
  const denomY = Math.sqrt(y.map(val => (val - avgY) ** 2).reduce((a, b) => a + b, 0));
  return denomX && denomY ? numerator / (denomX * denomY) : 0;
}

app.get('/api/correlations', (req, res) => {
  const symbols = Object.keys(stockData);
  const matrix = symbols.map((symbol1) => {
    return symbols.map((symbol2) => {
      return parseFloat(
        correlation(stockData[symbol1], stockData[symbol2]).toFixed(2)
      );
    });
  });
  res.json({ symbols, matrix });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
