import { useState, useCallback } from 'react';

export type TypingPhase = 'idle' | 'started' | 'finished';

interface UseTyperProps {
  text: string;
  onFinish?: () => void;
}

export const useTyper = ({ text, onFinish }: UseTyperProps) => {
  const [userInput, setUserInput] = useState('');
  const [phase, setPhase] = useState<TypingPhase>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const reset = useCallback(() => {
    setUserInput('');
    setPhase('idle');
    setStartTime(null);
    setEndTime(null);
  }, []);

  const handleInput = useCallback((input: string) => {
    if (phase === 'finished') return;

    // Start timer on first input
    if (phase === 'idle' && input.length > 0) {
      setPhase('started');
      setStartTime(Date.now());
    }

    setUserInput(input);

    // Check if finished
    if (input.length >= text.length) {
       setPhase('finished'); 
       setEndTime(Date.now());
       if (onFinish) onFinish();
    }
  }, [phase, text, onFinish]);

  const endSession = useCallback(() => {
    setPhase('finished');
    setEndTime(Date.now());
    if (onFinish) onFinish();
  }, [onFinish]);

  return { 
    userInput, 
    phase, 
    startTime, 
    endTime, 
    handleInput, 
    reset,
    setPhase, // Exposed to allow Timer to set finished
    endSession
  };
};
