import { useState, useCallback } from 'react';

export interface ScoreResult {
  wpm: number;
  accuracy: number;
  date: string;
  mode: string;
  duration: number;
}

const STORAGE_KEY = 'type-speed-results';

export const useScoreHistory = () => {
  const [history, setHistory] = useState<ScoreResult[]>(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      }
      return [];
  });

  const saveResult = useCallback((result: Omit<ScoreResult, 'date'>) => {
    const newResult: ScoreResult = {
      ...result,
      date: new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [newResult, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getBestScore = useCallback((mode: string, duration: number) => {
      const filtered = history.filter(h => h.mode === mode && h.duration === duration);
      if (filtered.length === 0) return 0;
      return Math.max(...filtered.map(h => h.wpm));
  }, [history]);

  return {
    history,
    saveResult,
    getBestScore
  };
};
