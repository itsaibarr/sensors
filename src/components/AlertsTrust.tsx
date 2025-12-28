import React, { useState } from 'react';

interface Alert {
  id: number;
  message: string;
  type: string;
  timestamp: string;
}

interface AlertsTrustProps {
  alerts: Alert[];
  theme?: 'light' | 'dark';
  language?: 'en' | 'ru';
}

const alertsTranslations = {
  en: {
    title: 'Alerts & Trust',
    recentAlerts: 'Recent Alerts',
    noAlerts: 'No alerts at this time.',
    hide: 'Hide',
    show: 'Show',
    howAI: 'How AI Interprets Signals',
    aiInterpretation: 'AI Signal Interpretation',
    disclaimer: 'This system is designed for observation and support, not diagnosis.'
  },
  ru: {
    title: 'Предупреждения и доверие',
    recentAlerts: 'Недавние предупреждения',
    noAlerts: 'На данный момент предупреждений нет.',
    hide: 'Скрыть',
    show: 'Показать',
    howAI: 'Как ИИ интерпретирует сигналы',
    aiInterpretation: 'Интерпретация сигналов ИИ',
    disclaimer: 'Эта система предназначена для наблюдения и поддержки, а не для диагностики.'
  }
};

const AlertsTrust: React.FC<AlertsTrustProps> = ({ alerts, theme = 'light', language = 'en' }) => {
  const t = alertsTranslations[language];
  const [showTrustInfo, setShowTrustInfo] = useState(false);

  return (
    <div className={`rounded-xl shadow-sm p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.title}</h2>

      {/* Alerts Section */}
      <div className="mb-6">
        <h3 className={`text-md font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t.recentAlerts}</h3>
        {alerts.length === 0 ? (
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.noAlerts}</p>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-blue-50 border-blue-200'
                } ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
              >
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{alert.message}</p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{alert.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust Layer */}
      <div className={`border-t pt-4 ${theme === 'dark' ? 'border-gray-600' : ''}`}>
        <button
          onClick={() => setShowTrustInfo(!showTrustInfo)}
          className="text-blue-600 hover:text-blue-800 text-sm underline"
        >
          {showTrustInfo ? t.hide : t.show} {t.howAI}
        </button>
        {showTrustInfo && (
          <div className={`mt-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.aiInterpretation}</h4>
            <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Heart rate variability indicates stress levels</li>
              <li>• Activity patterns help identify routines and disruptions</li>
              <li>• Environmental sensors detect noise and motion triggers</li>
              <li>• Confidence levels are calculated based on data consistency</li>
              <li>• Thresholds are set conservatively to avoid false alarms</li>
            </ul>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsTrust;
