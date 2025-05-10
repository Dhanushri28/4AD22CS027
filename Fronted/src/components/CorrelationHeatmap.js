import React from 'react';
import { Heatmap } from '@mui/x-charts/Heatmap';
import { Box, Typography } from '@mui/material';

function CorrelationHeatmap({ data }) {
  if (!data || data.length === 0) {
    return <Typography>No data available.</Typography>;
  }

  // Assuming data format: { xLabels: [], yLabels: [], values: [[number]] }
  const { xLabels, yLabels, values } = data;

  return (
    <Box>
      <Heatmap
        xAxisData={xLabels}
        yAxisData={yLabels}
        data={values}
        width={800}
        height={600}
        colorScale="sequential"
        colorScheme="RdBu"
        legend
        tooltip
      />
    </Box>
  );
}

export default CorrelationHeatmap;
