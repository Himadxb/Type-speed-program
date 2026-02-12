import React from 'react';
import { motion } from 'framer-motion';

interface StatsDisplayProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ wpm, accuracy, timeLeft }) => {
  return (
    <div className="flex gap-8 text-xl font-mono text-gray-400">
      <div className="flex flex-col items-center">
        <span className="text-sm uppercase tracking-wide">Time</span>
        <span className="text-3xl font-bold text-yellow-400">{timeLeft}s</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm uppercase tracking-wide">WPM</span>
        <motion.span 
          key={wpm} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          {wpm}
        </motion.span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm uppercase tracking-wide">Accuracy</span>
        <span className={`text-3xl font-bold ${accuracy >= 95 ? 'text-green-400' : 'text-red-400'}`}>
          {accuracy}%
        </span>
      </div>
    </div>
  );
};
