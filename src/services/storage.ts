export interface SessionResult {
  id: string;
  wpm: number;
  accuracy: number;
  duration: number;
  difficulty: string;
  date: string; // ISO string
}

const STORAGE_KEY = 'type_speed_results';

export const saveResult = (result: Omit<SessionResult, 'id' | 'date'>): SessionResult => {
  const history = getHistory();
  const newResult: SessionResult = {
    ...result,
    id: crypto.randomUUID(),
    date: new Date().toISOString()
  };
  
  const updatedHistory = [newResult, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return newResult;
};

export const getHistory = (): SessionResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse history', e);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getBestWPM = (): number => {
  const history = getHistory();
  if (history.length === 0) return 0;
  return Math.max(...history.map(r => r.wpm));
};
