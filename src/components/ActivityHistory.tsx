import React, { useState } from 'react';

interface Activity {
  id: number;
  time: string;
  label: string;
  stressLevel: string;
  description: string;
}

interface ActivityHistoryProps {
  activities: Activity[];
  theme?: 'light' | 'dark';
}

const ActivityHistory: React.FC<ActivityHistoryProps> = ({ activities, theme = 'light' }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const getStressColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStressBadge = (level: string) => {
    switch (level) {
      case 'low': return 'Low';
      case 'moderate': return 'Moderate';
      case 'high': return 'High';
      default: return '';
    }
  };

  return (
    <div className={`rounded-xl shadow-sm p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Activity History</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
            onClick={() => setSelectedActivity(activity)}
            title={`Hover for details: ${activity.description}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</div>
              <div className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{activity.label}</div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStressColor(activity.stressLevel)}`}>
              {getStressBadge(activity.stressLevel)}
            </span>
          </div>
        ))}
      </div>
      {selectedActivity && (
        <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <h3 className={`text-md font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Detailed Breakdown</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{selectedActivity.description}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;
