import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography, Box } from '@mui/material';

function StockChart({ data }) {
  if (!data || data.length === 0) {
    return <Typography>No data available.</Typography>;
  }

  // Assuming data format: [{ time: 'HH:MM', price: number, average: number }, ...]
  const times = data.map((point) => point.time);
  const prices = data.map((point) => point.price);
  const averages = data.map((point) => point.average);

  return (
    <Box>
      <LineChart
        xAxis={[{ data: times, label: 'Time' }]}
        series={[
          { data: prices, label: 'Price', color: '#1976d2' },
          { data: averages, label: 'Average', color: '#dc004e' },
        ]}
        width={800}
        height={400}
      />
    </Box>
  );
}

export default StockChart;
