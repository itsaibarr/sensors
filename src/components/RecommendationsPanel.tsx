import React, { useState } from 'react';

interface Recommendation {
  id: number;
  text: string;
  explanation: string;
  confidence: number;
}

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
  theme?: 'light' | 'dark';
  language?: 'en' | 'ru';
}

const panelTranslations = {
  en: {
    title: 'AI Care Recommendations',
    hideExplanation: 'Hide explanation',
    whySeeing: 'Why am I seeing this?',
    disclaimer: 'These recommendations are based on observed patterns and are not medical advice.'
  },
  ru: {
    title: 'Рекомендации ИИ по уходу',
    hideExplanation: 'Скрыть объяснение',
    whySeeing: 'Почему я вижу это?',
    disclaimer: 'Эти рекомендации основаны на наблюдаемых паттернах и не являются медицинскими советами.'
  }
};

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ recommendations, theme = 'light', language = 'en' }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const t = panelTranslations[language];

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={`rounded-xl shadow-sm p-6 border h-fit ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.title}</h2>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className={`border rounded-lg p-4 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
            <div className="mb-2">
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{rec.text}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'text-gray-400 bg-gray-600' : 'text-gray-500 bg-white'}`}>Confidence: {rec.confidence}%</span>
              <button
                onClick={() => toggleExpanded(rec.id)}
                className="text-blue-600 hover:text-blue-800 text-sm underline transition-colors"
              >
                {expandedId === rec.id ? t.hideExplanation : t.whySeeing}
              </button>
            </div>
            {expandedId === rec.id && (
              <div className={`mt-3 p-3 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-blue-50 border-blue-300'}`}>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{rec.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className={`text-xs mt-4 italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        {t.disclaimer}
      </p>
    </div>
  );
};

export default RecommendationsPanel;
