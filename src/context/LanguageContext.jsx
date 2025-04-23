import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

// Create the context
const LanguageContext = createContext();

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to access nested properties safely
const getTranslation = (obj, path) => {
  if (!obj || !path) return undefined;
  
  // If path is already a simple string, return the value
  if (typeof obj[path] === 'string') return obj[path];
  
  // Handle paths like 'home.welcome'
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null) return undefined;
    result = result[key];
  }
  
  return result;
};

// Language provider component
export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to 'uz'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'uz';
  });
  
  const [t, setT] = useState(translations[language]);

  useEffect(() => {
    // Save current language to localStorage
    localStorage.setItem('language', language);
    setT(translations[language]);
  }, [language]);

  // Function to change language
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };
  
  // Enhanced function to get a translation by key
  const translate = (key) => {
    // Try to get the translation for the current language
    let translation = getTranslation(t, key);
    
    // If translation is missing in current language
    if (translation === undefined) {
      // Warn in dev mode but not in production
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Missing translation for key "${key}" in language "${language}"`);
      }
      
      // Try to fall back to English if current language isn't English
      if (language !== 'en') {
        translation = getTranslation(translations.en, key);
      }
      
      // Last resort: return the key itself
      if (translation === undefined) {
        return key;
      }
    }
    
    return translation;
  };

  // Provide the language context to all children
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 