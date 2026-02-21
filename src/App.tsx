import { useState, useCallback, useEffect } from 'react';
import { Typer } from './components/Typer';
import { Results } from './components/Results';
import { SettingsBar } from './components/SettingsBar';
import { useTyper } from './hooks/useTyper';
import { useTimer } from './hooks/useTimer';
import { generateWords } from './utils/textGenerator';
import { saveResult, getHistory } from './services/storage';
import type { SessionResult } from './services/storage';
import { calculateGrossWPM, calculateAccuracy } from './utils/metrics';

function App() {
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [punctuation, setPunctuation] = useState(false);
  const [text, setText] = useState(() => generateWords(50, 'easy', false));
  const [history, setHistory] = useState<SessionResult[]>([]);
  
  const { timeLeft, start: startTimer, stop: stopTimer, reset: resetTimer, isActive: isTimerActive } = useTimer(duration);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);
  
  const finishGame = useCallback((finalInput: string, timeSpent: number) => {
    stopTimer();
    
    // Save result logic
    // Calculate stats here to save
    const wpm = calculateGrossWPM(finalInput.length, timeSpent);
    const correctChars = finalInput.split('').filter((char, i) => char === text[i]).length;
    const accuracy = calculateAccuracy(correctChars, finalInput.length);
    
    // Only save if valid session (e.g. at least some chars typed)
    if (finalInput.length > 0) {
      const result = saveResult({
        wpm,
        accuracy,
        duration: timeSpent,
        difficulty: `${difficulty}${punctuation ? '+punc' : ''}`
      });
      setHistory(prev => [result, ...prev]);
    }
  }, [stopTimer, text, difficulty, punctuation]);

  const { 
    userInput, 
    phase, 
    handleInput, 
    reset: resetTyper,
    endSession
  } = useTyper({ 
    text, 
    onFinish: () => {
       // handled by effect watching phase or manual Finish
    } 
  });

  // Handle phase change to 'finished' to trigger save
  useEffect(() => {
    if (phase === 'finished') {
       // Calculate time spent. 
       // If timer ran out, timeSpent = duration.
       // If text finished early, timeSpent = duration - timeLeft.
       const timeSpent = duration - timeLeft;
       finishGame(userInput, timeSpent);
    }
  }, [phase, userInput, duration, timeLeft, finishGame]);

  const startSession = useCallback(() => {
    startTimer();
  }, [startTimer]);

  // Sync Timer finish with Typer finish
  useEffect(() => {
    if (timeLeft === 0 && phase === 'started') {
      endSession();
    }
  }, [timeLeft, phase, endSession]);

  // Sync Typer start with Timer start
  useEffect(() => {
    if (phase === 'started' && !isTimerActive) {
       startSession();
    }
  }, [phase, isTimerActive, startSession]);

  // Reset when settings change
  useEffect(() => {
     handleRestart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, difficulty, punctuation]);

  const handleRestart = () => {
    const newText = generateWords(50, difficulty, punctuation);
    setText(newText);
    resetTyper();
    resetTimer(duration);
  };

  return (
    <div className="container" style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '2rem' }}>
      <header className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 className="text-primary" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Type Speed
        </h1>
        <p className="text-dim">Test your typing speed and accuracy</p>
      </header>
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <SettingsBar 
          duration={duration} 
          setDuration={setDuration} 
          difficulty={difficulty} 
          setDifficulty={setDifficulty}
          punctuation={punctuation}
          setPunctuation={setPunctuation}
          disabled={phase === 'started'}
        />

        {phase !== 'finished' ? (
          <div style={{ width: '100%' }}>
             <div className="status-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
                <div className="timer">{timeLeft}s</div>
                <div className="mode text-dim" style={{ fontSize: '1rem', textTransform: 'capitalize' }}>
                  {difficulty} {punctuation && '+ Punc'}
                </div>
             </div>
             
             <div className="glass-panel" style={{ padding: '2rem', minHeight: '300px' }}>
                <Typer 
                  text={text} 
                  userInput={userInput} 
                  phase={phase} 
                  onInput={handleInput} 
                />
             </div>
             
             <div className="text-center text-dim" style={{ marginTop: '2rem', opacity: 0.7 }}>
               {phase === 'idle' ? 'Start typing to begin...' : 'Typing...'}
             </div>
          </div>
        ) : (
          <Results 
            totalChars={userInput.length} 
            correctChars={userInput.split('').filter((char, i) => char === text[i]).length} 
            timeElapsed={duration - timeLeft} 
            history={history}
            onRestart={handleRestart} 
          />
        )}
      </main>
      
      <footer className="text-center text-dim" style={{ marginTop: 'auto', padding: '1rem', fontSize: '0.875rem' }}>
        <p>Press Tab + Enter to restart quickly</p>
      </footer>
    </div>
  )
}

export default App
