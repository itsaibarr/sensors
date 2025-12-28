'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import LocationCard from '../components/LocationCard';
import ActivityHistory from '../components/ActivityHistory';
import CurrentState from '../components/CurrentState';
import StressGraph from '../components/StressGraph';
import RecommendationsPanel from '../components/RecommendationsPanel';
import AlertsTrust from '../components/AlertsTrust';
import mockData from '../data/mockData.json';

interface Activity {
  id: number;
  time: string;
  label: string;
  stressLevel: string;
  description: string;
}

interface StressData {
  time: string;
  stress: number;
}

interface Recommendation {
  id: number;
  text: string;
  explanation: string;
  confidence: number;
}

interface Alert {
  id: number;
  message: string;
  type: string;
  timestamp: string;
}

interface DashboardData {
  userName: string;
  location: string;
  timestamp: string;
  batteryLevel: number;
  currentState: {
    score: number;
    updatedMinutes: number;
    description: string;
  };
  activities: Activity[];
  hourData: StressData[];
  dayData: StressData[];
  weekData: StressData[];
  recommendations: Recommendation[];
  alerts: Alert[];
}

const translations = {
  en: {
    welcome: 'Welcome back',
    monitoring: "We're monitoring together, step by step",
    pulse: 'Pulse',
    state: 'State',
    stress: 'Stress',
    liveLocation: 'Live Location',
    activityHistory: 'Activity History',
    childCurrentState: "Child's Current State",
    stressLevelGraph: 'Stress Level Graph',
    aiCareRecommendations: 'AI Care Recommendations',
    alertsTrust: 'Alerts & Trust'
  },
  ru: {
    welcome: 'Добро пожаловать',
    monitoring: 'Мы мониторим вместе, шаг за шагом',
    pulse: 'Пульс',
    state: 'Состояние',
    stress: 'Стресс',
    liveLocation: 'Местоположение в реальном времени',
    activityHistory: 'История активности',
    childCurrentState: 'Текущее состояние ребенка',
    stressLevelGraph: 'График уровня стресса',
    aiCareRecommendations: 'Рекомендации ИИ по уходу',
    alertsTrust: 'Предупреждения и доверие'
  }
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(mockData);
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        currentState: {
          ...prev.currentState,
          updatedMinutes: prev.currentState.updatedMinutes === 0 ? 1 : 0
        }
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`sticky top-0 z-10 pb-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <Header
            userName={data.userName}
            language={language}
            theme={theme}
            translations={translations[language]}
            onSettingsClick={() => setShowSettings(!showSettings)}
            isSettingsOpen={showSettings}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
          />
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="flex-1 max-w-7xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 h-full">
          {/* Left Column */}
          <div className="space-y-6">
            <LocationCard
              location={data.location}
              timestamp={data.timestamp}
              batteryLevel={data.batteryLevel}
              theme={theme}
              translations={{ liveLocation: translations[language].liveLocation }}
            />
            <ActivityHistory activities={data.activities} theme={theme} />
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            <CurrentState
              score={data.currentState.score}
              updatedMinutes={data.currentState.updatedMinutes}
              description={data.currentState.description}
              theme={theme}
            />
            <StressGraph
              hourData={data.hourData}
              dayData={data.dayData}
              weekData={data.weekData}
              theme={theme}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RecommendationsPanel recommendations={data.recommendations} theme={theme} language={language} />
            <AlertsTrust alerts={data.alerts} theme={theme} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
}
