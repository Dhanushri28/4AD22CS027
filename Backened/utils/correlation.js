export function calculateCorrelation(X, Y) {
    const n = X.length;
    if (n === 0) return 0;
  
    const avgX = X.reduce((sum, x) => sum + x, 0) / n;
    const avgY = Y.reduce((sum, y) => sum + y, 0) / n;
  
    let cov = 0, stdDevX = 0, stdDevY = 0;
    for (let i = 0; i < n; i++) {
      const dx = X[i] - avgX;
      const dy = Y[i] - avgY;
      cov += dx * dy;
      stdDevX += dx * dx;
      stdDevY += dy * dy;
    }
  
    return cov / Math.sqrt(stdDevX * stdDevY);
  }
  