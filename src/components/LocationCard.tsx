import React from 'react';

interface LocationCardProps {
  location: string;
  timestamp: string;
  batteryLevel: number; // percentage
  theme: 'light' | 'dark';
  translations: {
    liveLocation: string;
  };
}

const LocationCard: React.FC<LocationCardProps> = ({ location, timestamp, batteryLevel, theme, translations }) => {
  return (
    <div className={`rounded-xl shadow-sm p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{translations.liveLocation}</h2>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Current Location</p>
          <p className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{location}</p>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{timestamp}</p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Connected</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Sensor Battery</span>
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{batteryLevel}%</span>
        </div>
        <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${batteryLevel}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
