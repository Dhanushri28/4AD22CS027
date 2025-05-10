import React, { useState, useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import StockChart from '../components/StockChart';
import axios from 'axios';

function StockPage() {
  const [interval, setInterval] = useState(5); // Default to last 5 minutes
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Replace with your backend API endpoint
    axios
      .get(`/api/stocks?interval=${interval}`)
      .then((response) => setStockData(response.data))
      .catch((error) => console.error('Error fetching stock data:', error));
  }, [interval]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stock Prices
      </Typography>
      <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
        <InputLabel id="interval-label">Interval (minutes)</InputLabel>
        <Select
          labelId="interval-label"
          value={interval}
          label="Interval (minutes)"
          onChange={(e) => setInterval(e.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </FormControl>
      <StockChart data={stockData} />
    </Box>
  );
}

export default StockPage;
