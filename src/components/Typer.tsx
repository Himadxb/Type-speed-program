import React, { useEffect, useRef, useMemo } from 'react';

interface TyperProps {
  text: string;
  userInput: string;
  phase: 'idle' | 'started' | 'finished';
  onInput: (input: string) => void;
  className?: string;
}

export const Typer: React.FC<TyperProps> = ({ text, userInput, phase, onInput, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input when user clicks anywhere in the container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Keep input focused if phase is started
  useEffect(() => {
    if (phase === 'started' || phase === 'idle') {
      inputRef.current?.focus();
    }
  }, [phase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (phase === 'finished') return;
    onInput(e.target.value);
  };

  // Render text with highlighting
  const renderedText = useMemo(() => {
    return text.split('').map((char, index) => {
      let status = '';
      if (index < userInput.length) {
        status = userInput[index] === char ? 'correct' : 'incorrect';
      } else if (index === userInput.length) {
        status = 'current';
      }

      // Handle correct/incorrect styling logic
      const style = status === 'correct' 
        ? { color: 'var(--color-text)' } 
        : status === 'incorrect' 
          ? { color: 'var(--color-error)', textDecoration: 'underline' } 
          : status === 'current'
            ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }
            : { color: 'var(--color-text-dim)' };

      return (
        <span key={index} style={style} className={`char ${status}`}>
          {char}
        </span>
      );
    });
  }, [text, userInput]);

  return (
    <div 
      ref={containerRef}
      className={`typer-container ${className || ''}`} 
      onClick={handleContainerClick}
      style={{ 
        position: 'relative', 
        fontSize: '1.5rem', 
        lineHeight: '2rem', 
        fontFamily: 'var(--font-mono)',
        cursor: 'text',
        userSelect: 'none'
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        style={{ position: 'absolute', opacity: 0, top: 0, left: 0, height: '100%', width: '100%', cursor: 'default' }}
        autoFocus
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
      <div className="text-display" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {renderedText}
      </div>
    </div>
  );
};
