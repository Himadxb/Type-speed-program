import { useEffect, useState } from 'react';
import { StatsDisplay } from './components/StatsDisplay';
import { TypingArea } from './components/TypingArea';
import { Toolbar } from './components/Toolbar';
import { ResultsChart } from './components/ResultsChart';
import { useTypingEngine } from './hooks/useTypingEngine';
import { useScoreHistory } from './hooks/useScoreHistory';
import { generateText } from './utils/textGenerator';
import type { Difficulty } from './utils/textGenerator';
import { RefreshCw } from 'lucide-react';

function App() {
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [punctuation, setPunctuation] = useState(false);
  const [text, setText] = useState(() => generateText(50, 'easy', false));

  const { 
    userInput, 
    phase, 
    wpm, 
    accuracy, 
    timeLeft, 
    handleKey,
    reset 
  } = useTypingEngine(text, duration);

  const { saveResult, history } = useScoreHistory();

  // Helper to refresh text safely
  const refreshText = (d: number, diff: Difficulty, punc: boolean) => {
      const count = Math.max(50, d * 3);
      const newText = generateText(count, diff, punc);
      setText(newText);
      reset();
  };

  const handleDurationChange = (d: number) => {
      setDuration(d);
      refreshText(d, difficulty, punctuation);
  };

  const handleDifficultyChange = (d: Difficulty) => {
      setDifficulty(d);
      refreshText(duration, d, punctuation);
  };

  const handlePunctuationChange = (p: boolean) => {
      setPunctuation(p);
      refreshText(duration, difficulty, p);
  };

  const handleRestart = () => {
      refreshText(duration, difficulty, punctuation);
  };

  // Save score when finished
  useEffect(() => {
    if (phase === 'finished') {
      saveResult({
        wpm,
        accuracy,
        mode: difficulty,
        duration
      });
    }
  }, [phase, wpm, accuracy, difficulty, duration, saveResult]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-2">
          TypeSpeed
        </h1>
        <p className="text-slate-500 text-sm">Test your typing skills</p>
      </header>

      <div className="w-full max-w-5xl flex flex-col items-center gap-8">
        
        <Toolbar 
          duration={duration} 
          setDuration={handleDurationChange}
          difficulty={difficulty} 
          setDifficulty={handleDifficultyChange}
          punctuation={punctuation} 
          setPunctuation={handlePunctuationChange}
          disabled={phase === 'typing'}
        />

        <StatsDisplay 
          wpm={wpm} 
          accuracy={accuracy} 
          timeLeft={timeLeft} 
        />

        <div className="relative w-full p-8 bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-700 shadow-xl min-h-[200px]">
           <TypingArea 
              text={text}
              userInput={userInput}
              phase={phase}
              onKeyDown={handleKey}
           />
           
           {phase === 'finished' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/95 rounded-xl backdrop-blur-md transition-all">
                  <div className="text-center p-8 max-w-md w-full">
                      <h2 className="text-3xl font-bold mb-2 text-white">Test Completed!</h2>
                      
                      <div className="grid grid-cols-2 gap-4 my-6">
                        <div className="bg-slate-800 p-4 rounded-lg">
                          <p className="text-gray-400 text-xs uppercase">WPM</p>
                          <p className="text-4xl font-bold text-yellow-400">{wpm}</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg">
                          <p className="text-gray-400 text-xs uppercase">Accuracy</p>
                          <p className={`text-4xl font-bold ${accuracy >= 95 ? 'text-green-400' : 'text-white'}`}>{accuracy}%</p>
                        </div>
                      </div>

                      <button 
                        onClick={handleRestart}
                        className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
                      >
                          <RefreshCw size={20} />
                          Try Again
                      </button>
                  </div>
              </div>
           )}
        </div>

        {/* Results Chart - Only show if we have history */}
        {history.length > 0 && <ResultsChart history={history} />}

        <button 
            onClick={reset}
            className={`p-3 text-slate-500 hover:text-white transition-colors ${phase === 'finished' ? 'invisible' : ''}`}
            title="Restart Test"
        >
            <RefreshCw size={24} />
        </button>
      </div>

      <footer className="mt-12 text-slate-600 text-sm">
        <p>Press any key to start typing</p>
      </footer>
    </div>
  );
}

export default App;
