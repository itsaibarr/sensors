import React from 'react';

interface SettingsProps {
  language: 'en' | 'ru';
  theme: 'light' | 'dark';
  onLanguageChange: (lang: 'en' | 'ru') => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onClose: () => void;
}

const settingsTranslations = {
  en: {
    title: 'Settings',
    language: 'Language',
    theme: 'Theme',
    close: 'Close'
  },
  ru: {
    title: 'Настройки',
    language: 'Язык',
    theme: 'Тема',
    close: 'Закрыть'
  }
};

const Settings: React.FC<SettingsProps> = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  onClose
}) => {
  const t = settingsTranslations[language];
  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-full max-w-xs md:max-w-sm z-50">
      {/* Language Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.language}</label>
        <div className="flex space-x-2">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1 text-sm rounded border transition-colors ${
              language === 'en'
                ? 'bg-blue-100 border-blue-300 text-blue-800'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('ru')}
            className={`px-3 py-1 text-sm rounded border transition-colors ${
              language === 'ru'
                ? 'bg-blue-100 border-blue-300 text-blue-800'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Русский
          </button>
        </div>
      </div>

      {/* Theme Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.theme}</label>
        <div className="flex space-x-2">
          <button
            onClick={() => onThemeChange('light')}
            className={`px-3 py-1 text-sm rounded border transition-colors ${
              theme === 'light'
                ? 'bg-blue-100 border-blue-300 text-blue-800'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => onThemeChange('dark')}
            className={`px-3 py-1 text-sm rounded border transition-colors ${
              theme === 'dark'
                ? 'bg-blue-100 border-blue-300 text-blue-800'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Dark
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
