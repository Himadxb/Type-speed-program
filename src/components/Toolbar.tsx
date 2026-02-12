import React from 'react';
import { Timer, Type, FileText } from 'lucide-react';
import type { Difficulty } from '../utils/textGenerator';

interface ToolbarProps {
  duration: number;
  setDuration: (d: number) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  punctuation: boolean;
  setPunctuation: (p: boolean) => void;
  disabled: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  duration,
  setDuration,
  difficulty,
  setDifficulty,
  punctuation,
  setPunctuation,
  disabled
}) => {
  return (
    <div className={`flex flex-wrap gap-6 p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700 transition-opacity ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      
      {/* Timer Settings */}
      <div className="flex items-center gap-3">
        <Timer size={18} className="text-gray-400" />
        <div className="flex bg-slate-900 rounded-md p-1">
          {[15, 30, 60].map((t) => (
            <button
              key={t}
              onClick={() => setDuration(t)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${duration === t ? 'bg-yellow-500 text-slate-900' : 'text-gray-400 hover:text-white'}`}
            >
              {t}s
            </button>
          ))}
        </div>
      </div>

      <div className="w-px h-8 bg-slate-700 mx-2 hidden sm:block"></div>

      {/* Difficulty Settings */}
      <div className="flex items-center gap-3">
        <Type size={18} className="text-gray-400" />
        <div className="flex bg-slate-900 rounded-md p-1">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded text-sm font-medium uppercase transition-colors ${difficulty === d ? 'bg-yellow-500 text-slate-900' : 'text-gray-400 hover:text-white'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="w-px h-8 bg-slate-700 mx-2 hidden sm:block"></div>

      {/* Punctuation Toggle */}
      <div className="flex items-center gap-3">
        <FileText size={18} className="text-gray-400" />
        <button
            onClick={() => setPunctuation(!punctuation)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${punctuation ? 'bg-yellow-500 text-slate-900' : 'bg-slate-900 text-gray-400 hover:text-white'}`}
        >
            Punctuation: {punctuation ? 'ON' : 'OFF'}
        </button>
      </div>

    </div>
  );
};
