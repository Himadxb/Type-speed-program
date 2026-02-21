import React, { useMemo } from 'react';
import type { SessionResult } from '../services/storage';

interface ResultsChartProps {
  history: SessionResult[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ history }) => {
  // Take last 10 sessions, reverse to show chronological order (oldest to newest)
  const data = useMemo(() => {
    return [...history].slice(0, 10).reverse();
  }, [history]);

  if (data.length < 2) return null;

  const maxWPM = Math.max(...data.map(d => d.wpm), 60); // Min 60 for scale
  const height = 150;
  const width = 500;
  const padding = 20;
  
  const getX = (index: number) => {
    return padding + (index / (data.length - 1)) * (width - 2 * padding);
  };

  const getY = (wpm: number) => {
    return height - padding - (wpm / maxWPM) * (height - 2 * padding);
  };

  const points = data.map((d, i) => `${getX(i)},${getY(d.wpm)}`).join(' ');

  return (
    <div className="chart-container" style={{ width: '100%', overflowX: 'auto', marginTop: '2rem' }}>
      <h3 className="text-dim" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>WPM History (Last 10)</h3>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
           const y = height - padding - ratio * (height - 2 * padding);
           return (
             <line 
               key={ratio} 
               x1={padding} 
               y1={y} 
               x2={width - padding} 
               y2={y} 
               stroke="rgba(255,255,255,0.1)" 
               strokeWidth="1" 
             />
           );
        })}

        {/* Line */}
        <polyline 
          points={points} 
          fill="none" 
          stroke="var(--color-primary)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Data Points */}
        {data.map((d, i) => (
          <g key={d.id} className="chart-point">
            <circle 
              cx={getX(i)} 
              cy={getY(d.wpm)} 
              r="4" 
              fill="var(--color-bg)" 
              stroke="var(--color-primary)" 
              strokeWidth="2" 
            />
            {/* Tooltip-like value */}
            <text 
              x={getX(i)} 
              y={getY(d.wpm) - 10} 
              textAnchor="middle" 
              fill="var(--color-text-dim)" 
              fontSize="10"
            >
              {d.wpm}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
