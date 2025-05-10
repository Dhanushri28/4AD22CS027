import axios from 'axios';
import { calculateCorrelation } from '../utils/correlation.js';

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

export async function getAverageStockPrice(ticker, minutes) {
  const url = `${BASE_URL}/${ticker}?minutes=${minutes}`;
  const response = await axios.get(url);
  const data = response.data;

  if (!Array.isArray(data)) {
    throw new Error('Unexpected stock price response format');
  }

  const prices = data.map(item => item.price);
  const average = prices.reduce((sum, p) => sum + p, 0) / prices.length;

  return {
    averageStockPrice: average,
    priceHistory: data
  };
}

export async function getStockCorrelation(ticker1, ticker2, minutes) {
  const [res1, res2] = await Promise.all([
    axios.get(`${BASE_URL}/${ticker1}?minutes=${minutes}`),
    axios.get(`${BASE_URL}/${ticker2}?minutes=${minutes}`)
  ]);

  const history1 = res1.data;
  const history2 = res2.data;

  const aligned = alignHistories(history1, history2);
  const prices1 = aligned.map(pair => pair[0]);
  const prices2 = aligned.map(pair => pair[1]);

  const correlation = calculateCorrelation(prices1, prices2);
  const avg1 = average(prices1);
  const avg2 = average(prices2);

  return {
    correlation: parseFloat(correlation.toFixed(4)),
    stocks: {
      [ticker1]: {
        averagePrice: avg1,
        priceHistory: history1
      },
      [ticker2]: {
        averagePrice: avg2,
        priceHistory: history2
      }
    }
  };
}

function alignHistories(history1, history2) {
  const map1 = new Map(history1.map(p => [p.lastUpdatedAt, p.price]));
  const map2 = new Map(history2.map(p => [p.lastUpdatedAt, p.price]));

  const commonTimestamps = [...map1.keys()].filter(t => map2.has(t));

  return commonTimestamps.map(t => [map1.get(t), map2.get(t)]);
}

function average(arr) {
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}
