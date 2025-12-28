import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StressData {
  time: string;
  stress: number;
}

interface StressGraphProps {
  hourData: StressData[];
  dayData: StressData[];
  weekData: StressData[];
  theme?: 'light' | 'dark';
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  const getColor = (stress: number) => {
    if (stress <= 33) return '#10B981'; // green
    if (stress <= 66) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  if (active && payload && payload.length) {
    const stress = payload[0].value;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="text-sm font-medium">{`Time: ${label}`}</p>
        <p className="text-sm" style={{ color: getColor(stress) }}>
          {`Stress: ${stress}%`}
        </p>
      </div>
    );
  }
  return null;
};

const StressGraph: React.FC<StressGraphProps> = ({ hourData, dayData, weekData, theme = 'light' }) => {
  const [timeRange, setTimeRange] = useState<'hour' | 'day' | 'week'>('hour');

  const getCurrentData = () => {
    switch (timeRange) {
      case 'hour': return hourData;
      case 'day': return dayData;
      case 'week': return weekData;
      default: return hourData;
    }
  };

  const getAverage = (data: StressData[]) => {
    const sum = data.reduce((acc, item) => acc + item.stress, 0);
    return Math.round(sum / data.length);
  };

  const currentData = getCurrentData();
  const average = getAverage(currentData);

  const getColor = (stress: number) => {
    if (stress <= 33) return '#10B981'; // green
    if (stress <= 66) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  return (
    <div className={`rounded-xl shadow-sm p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Stress Level Graph</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('hour')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === 'hour' ? 'bg-blue-100 text-blue-800' : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Hour
          </button>
          <button
            onClick={() => setTimeRange('day')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === 'day' ? 'bg-blue-100 text-blue-800' : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeRange === 'week' ? 'bg-blue-100 text-blue-800' : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Week
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Average Stress Level: <span className="font-medium" style={{ color: getColor(average) }}>{average}%</span></p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%" aspect={undefined}>
          <LineChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="stress"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Drag over the graph to inspect specific moments. AI highlights are shown in blue.</p>
    </div>
  );
};

export default StressGraph;
