import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ScoreResult } from '../hooks/useScoreHistory';

interface ResultsChartProps {
  history: ScoreResult[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ history }) => {
  // Process history for chart (last 20 entries reverse chronological)
  const data = [...history].reverse().slice(-20).map((h, i) => ({
      name: i + 1,
      wpm: h.wpm,
      accuracy: h.accuracy
  }));

  if (history.length === 0) return null;

  return (
    <div className="w-full h-64 mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
      <h3 className="text-gray-400 mb-4 text-sm uppercase tracking-wide">Recent Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" tick={{fontSize: 12}} />
          <YAxis stroke="#9CA3AF" tick={{fontSize: 12}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
            itemStyle={{ color: '#E5E7EB' }}
          />
          <Line type="monotone" dataKey="wpm" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B' }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
