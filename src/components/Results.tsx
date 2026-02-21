import React from 'react';
import { calculateGrossWPM, calculateAccuracy } from '../utils/metrics';
import type { SessionResult } from '../services/storage';
import { ResultsChart } from './ResultsChart';

interface ResultsProps {
  totalChars: number;
  correctChars: number;
  timeElapsed: number; // in seconds
  history: SessionResult[];
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ totalChars, correctChars, timeElapsed, history, onRestart }) => {
  const wpm = calculateGrossWPM(totalChars, timeElapsed);
  const accuracy = calculateAccuracy(correctChars, totalChars);

  // Check if high score (simple check against history, excluding current session if not added yet? 
  // Assume history includes current session if App adds it before rendering Results)
  const isHighScore = history.length > 1 && wpm >= Math.max(...history.slice(1).map(h => h.wpm));

  return (
    <div className="results glass-panel text-center" style={{ animation: 'fadeIn 0.5s ease-out', maxWidth: '800px', width: '100%' }}>
      <h2 style={{ marginBottom: 'var(--space-md)' }}>Session Complete</h2>
      {isHighScore && <div className="text-accent" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>New High Score! 🏆</div>}
      
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
        <div className="stat-item">
          <div className="label text-dim" style={{ fontSize: '0.875rem' }}>WPM</div>
          <div className="value text-primary" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{wpm}</div>
        </div>
        <div className="stat-item">
          <div className="label text-dim" style={{ fontSize: '0.875rem' }}>Accuracy</div>
          <div className="value text-success" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{accuracy}%</div>
        </div>
      </div>

      <ResultsChart history={history} />

      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={onRestart}
          style={{
            padding: 'var(--space-sm) var(--space-lg)',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'background-color 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
