import React, { useEffect, useRef } from 'react';

interface TypingAreaProps {
  text: string;
  userInput: string;
  className?: string;
  phase: 'start' | 'typing' | 'finished';
  onKeyDown: (key: string) => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  text,
  userInput,
  className = '',
  phase,
  onKeyDown,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus container on mount or click to capture keys
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [phase]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent default scrolling for Space
    if (e.key === ' ') {
      e.preventDefault();
    }
    
    // Ignore meta keys
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    
    if (e.key.length === 1 || e.key === 'Backspace') {
      onKeyDown(e.key);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative outline-none w-full max-w-3xl text-2xl leading-relaxed tracking-wide font-mono focus:outline-none ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => containerRef.current?.focus()}
    >
       <div className="break-words">
        {text.split('').map((char, index) => {
          let charClass = "text-gray-600"; // Pending
          if (index < userInput.length) {
             charClass = userInput[index] === char ? "text-white" : "text-red-500";
          }
          
          const isCurrent = index === userInput.length && phase !== 'finished';
          
          return (
            <span key={index} className="relative">
              {isCurrent && (
                 <span className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-yellow-400 animate-pulse transition-all"></span>
              )}
              <span className={charClass}>{char}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
