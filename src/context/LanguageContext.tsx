import React, { createContext, useContext, useState, useEffect } from 'react';

interface Translations {
  [key: string]: {
    en: string;
    sw: string;
  };
}

const translations: Translations = {
  'app.title': {
    en: 'Better Life',
    sw: 'Maisha Bora'
  },
  'nav.dashboard': {
    en: 'Dashboard',
    sw: 'Dashibodi'
  },
  'nav.nutrition': {
    en: 'Nutrition',
    sw: 'Lishe'
  },
  'nav.workouts': {
    en: 'Workouts',
    sw: 'Mazoezi'
  },
  'nav.hydration': {
    en: 'Hydration',
    sw: 'Maji'
  },
  'nav.mental_health': {
    en: 'Mental Health',
    sw: 'Afya ya Akili'
  },
  'nav.experts': {
    en: 'Experts',
    sw: 'Wataalamu'
  },
  'auth.login': {
    en: 'Login',
    sw: 'Ingia'
  },
  'auth.signup': {
    en: 'Sign Up',
    sw: 'Jisajili'
  },
  'auth.email': {
    en: 'Email',
    sw: 'Barua pepe'
  },
  'auth.password': {
    en: 'Password',
    sw: 'Neno la siri'
  },
  'dashboard.welcome': {
    en: 'Welcome back',
    sw: 'Karibu tena'
  },
  'dashboard.todays_stats': {
    en: "Today's Stats",
    sw: 'Takwimu za Leo'
  },
  'dashboard.calories': {
    en: 'Calories',
    sw: 'Kalori'
  },
  'dashboard.water': {
    en: 'Water',
    sw: 'Maji'
  },
  'dashboard.workouts': {
    en: 'Workouts',
    sw: 'Mazoezi'
  },
  'hero.title': {
    en: 'Transform Your Health Journey',
    sw: 'Badilisha Safari ya Afya Yako'
  },
  'hero.subtitle': {
    en: 'Designed for Kenyan athletes and sports enthusiasts',
    sw: 'Imeundwa kwa wanariadha na wapenzi wa michezo wa Kikenya'
  },
  'hero.cta': {
    en: 'Start Your Journey',
    sw: 'Anza Safari Yako'
  }
};

interface LanguageContextType {
  language: 'en' | 'sw';
  setLanguage: (lang: 'en' | 'sw') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'sw';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};