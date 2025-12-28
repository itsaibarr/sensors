import React from 'react';
import Settings from './Settings';

interface HeaderProps {
  userName: string;
  language: 'en' | 'ru';
  theme: 'light' | 'dark';
  translations: {
    welcome: string;
    monitoring: string;
    pulse: string;
    state: string;
    stress: string;
  };
  onSettingsClick: () => void;
  isSettingsOpen: boolean;
  onLanguageChange: (lang: 'en' | 'ru') => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ userName, language, theme, translations, onSettingsClick, isSettingsOpen, onLanguageChange, onThemeChange }) => {
  return (
    <div className="relative">
      <header className={`flex items-center justify-between p-4 shadow-sm rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Left: Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            {/* Placeholder logo */}
            <span className="text-blue-600 font-bold text-lg">A</span>
          </div>
        </div>

        {/* Center: Greeting and Status Indicators */}
        <div className="flex flex-col items-center text-center">
          <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{translations.welcome}, {userName}</h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{translations.monitoring}</p>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{translations.pulse}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{translations.state}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{translations.stress}</span>
            </div>
          </div>
        </div>

        {/* Right: Notifications, Settings, Account */}
        <div className="flex items-center space-x-4">
          <button className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
            {/* Notifications icon */}
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V12a6.002 6.002 0 00-5.5-5.959M15 17v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2m5 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v8h2z" />
            </svg>
          </button>
          <button onClick={onSettingsClick} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
            {/* Settings icon */}
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
            {/* Account icon */}
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>
      {isSettingsOpen && (
        <Settings
          language={language}
          theme={theme}
          onLanguageChange={onLanguageChange}
          onThemeChange={onThemeChange}
          onClose={onSettingsClick}
        />
      )}
    </div>
  );
};

export default Header;
