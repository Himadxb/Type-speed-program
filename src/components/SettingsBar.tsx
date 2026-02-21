import React from 'react';

interface SettingsBarProps {
  duration: number;
  setDuration: (d: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (d: 'easy' | 'medium' | 'hard') => void;
  punctuation: boolean;
  setPunctuation: (p: boolean) => void;
  disabled?: boolean;
}

export const SettingsBar: React.FC<SettingsBarProps> = ({ 
  duration, 
  setDuration, 
  difficulty, 
  setDifficulty,
  punctuation,
  setPunctuation,
  disabled 
}) => {
  return (
    <div className={`settings-bar glass-panel ${disabled ? 'disabled' : ''}`} style={{ 
      display: 'flex', 
      gap: '2rem', 
      padding: '0.5rem 1rem', 
      marginBottom: '2rem',
      opacity: disabled ? 0.5 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
      borderRadius: 'var(--radius-full)',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <div className="setting-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span className="text-dim" style={{ fontSize: '0.875rem', marginRight: '0.5rem' }}>Time</span>
        {[15, 30, 60].map(d => (
          <button
            key={d}
            onClick={() => setDuration(d)}
            className={duration === d ? 'active' : ''}
            style={{
              color: duration === d ? 'var(--color-primary)' : 'var(--color-text-dim)',
              fontWeight: duration === d ? 'bold' : 'normal',
              padding: '0.25rem 0.5rem',
              transition: 'color 0.2s'
            }}
          >
            {d}s
          </button>
        ))}
      </div>

      <div className="divider" style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

      <div className="setting-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span className="text-dim" style={{ fontSize: '0.875rem', marginRight: '0.5rem' }}>Mode</span>
        {(['easy', 'medium', 'hard'] as const).map(d => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            className={difficulty === d ? 'active' : ''}
            style={{
              color: difficulty === d ? 'var(--color-primary)' : 'var(--color-text-dim)',
              fontWeight: difficulty === d ? 'bold' : 'normal',
              textTransform: 'capitalize',
              padding: '0.25rem 0.5rem',
               transition: 'color 0.2s'
            }}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="divider" style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

      <div className="setting-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
            onClick={() => setPunctuation(!punctuation)}
            style={{
              color: punctuation ? 'var(--color-primary)' : 'var(--color-text-dim)',
              fontWeight: punctuation ? 'bold' : 'normal',
              padding: '0.25rem 0.5rem',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
           {punctuation ? 'Wait, Punctuation ON' : 'Punctuation OFF'}
        </button>
      </div>
    </div>
  );
};
