import React from 'react';

interface CurrentStateProps {
  score: number; // percentage 0-100
  updatedMinutes: number;
  description: string;
  theme: 'light' | 'dark';
}

const CurrentState: React.FC<CurrentStateProps> = ({ score, updatedMinutes, description, theme }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score <= 33) return '#10B981'; // green
    if (score <= 66) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  return (
    <div className={`rounded-xl shadow-sm p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <h2 className={`text-lg font-semibold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Child's Current State</h2>
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke={getColor(score)}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{score}%</div>
              <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {score <= 33 ? 'Stable' : score <= 66 ? 'Attentive' : 'Overloaded'}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Updated {updatedMinutes} minutes ago</p>
          <p className={`text-sm mt-2 max-w-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentState;
