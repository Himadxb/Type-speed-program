import { useState, useCallback, useEffect, useRef } from 'react';

export type TypingPhase = 'start' | 'typing' | 'finished';

export interface TypingState {
  currIndex: number;
  userInput: string;
  phase: TypingPhase;
  wpm: number;
  accuracy: number;
  endTime: number | null;
}

export const useTypingEngine = (text: string, duration: number = 30) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [phase, setPhase] = useState<TypingPhase>('start');
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const startTimeRef = useRef<number | null>(null);
  const userInputRef = useRef('');

  useEffect(() => { userInputRef.current = userInput; }, [userInput]);

  // Helper to calculate stats
  const calculateStats = useCallback((input: string, start: number | null) => {
    if (!start) return { newWpm: 0, newAccuracy: 100 };
    
    const now = Date.now();
    const timeElapsed = (now - start) / 1000 / 60;
    
    let newWpm = 0;
    if (timeElapsed > 0) {
        newWpm = Math.round((input.length / 5) / timeElapsed);
    }

    let newAccuracy = 100;
    if (input.length > 0) {
        let correctChars = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === text[i]) correctChars++;
        }
        newAccuracy = Math.round((correctChars / input.length) * 100);
    }

    return { newWpm, newAccuracy };
  }, [text]);

  const reset = useCallback(() => {
    setCurrIndex(0);
    setUserInput('');
    setPhase('start');
    setEndTime(null);
    setTimeLeft(duration);
    setWpm(0);
    setAccuracy(100);
    startTimeRef.current = null;
  }, [duration]);

  const handleKey = useCallback(
    (key: string) => {
      if (phase === 'finished') return;

      let newStartTime = startTimeRef.current;

      if (phase === 'start') {
        setPhase('typing');
        newStartTime = Date.now();
        startTimeRef.current = newStartTime;
      }

      let nextInput = userInput;
      let nextIndex = currIndex;

      if (key === 'Backspace') {
        nextInput = userInput.slice(0, -1);
        nextIndex = Math.max(0, currIndex - 1);
        setUserInput(nextInput);
        setCurrIndex(nextIndex);
      } else if (key.length === 1) {
        nextInput = userInput + key;
        nextIndex = currIndex + 1;
        setUserInput(nextInput);
        setCurrIndex(nextIndex);
      } else {
          return; // Ignore other keys
      }

      // Update stats immediately on keypress
      if (newStartTime) {
          const { newWpm, newAccuracy } = calculateStats(nextInput, newStartTime);
          setWpm(newWpm);
          setAccuracy(newAccuracy);
      }

      if (nextIndex >= text.length) {
        setPhase('finished');
        setEndTime(Date.now());
      }
    },
    [currIndex, phase, text, userInput, calculateStats, startTimeRef] 
    // removed startTimeRef from dependency if it is a ref? Refs don't need to be in dependency array usually, but explicit is okay.
  );

  // Timer
  useEffect(() => {
      if (phase !== 'typing') return;
      
      const interval = setInterval(() => {
          setTimeLeft((prev) => {
              if (prev <= 1) {
                  setPhase('finished');
                  setEndTime(Date.now());
                  clearInterval(interval);
                  return 0;
              }
              return prev - 1;
          });
      }, 1000);

      // WPM Ticker independently?
      const wpmInterval = setInterval(() => {
          if (startTimeRef.current) {
              const { newWpm } = calculateStats(userInputRef.current, startTimeRef.current);
              setWpm(newWpm);
          }
      }, 1000);
      
      return () => {
          clearInterval(interval);
          clearInterval(wpmInterval);
      };
  }, [phase, calculateStats]);

  return {
    currIndex,
    userInput,
    phase,
    wpm,
    accuracy,
    timeLeft,
    endTime,
    reset,
    handleKey
  };
};
