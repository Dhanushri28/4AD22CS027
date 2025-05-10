import express from 'express';
import { getAverageStockPrice, getStockCorrelation } from '../services/stockService.js';

const router = express.Router();

router.get('/stocks/:ticker', async (req, res) => {
  const { ticker } = req.params;
  const { minutes, aggregation } = req.query;

  if (aggregation !== 'average') {
    return res.status(400).json({ error: 'Only average aggregation supported' });
  }

  try {
    const result = await getAverageStockPrice(ticker, minutes);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stockcorrelation', async (req, res) => {
  const { minutes, ticker } = req.query;
  const tickers = Array.isArray(ticker) ? ticker : [ticker];

  if (!minutes || tickers.length !== 2) {
    return res.status(400).json({ error: 'Exactly two tickers must be provided with minutes' });
  }

  try {
    const result = await getStockCorrelation(tickers[0], tickers[1], minutes);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
