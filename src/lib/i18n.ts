import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from '@/locales/en/translation.json';
import plTranslations from '@/locales/pl/translation.json';

i18n
  .use(LanguageDetector) // Detects language
  .use(initReactI18next) // Enables use in React
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      pl: {
        translation: plTranslations,
      },
    },
    fallbackLng: 'pl', // Default language
    supportedLngs: ['en', 'pl'],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator'], // Prioritize localStorage
      caches: ['localStorage'], // Save selected language
      convertDetectedLanguage: (lng: string) => lng.split('-')[0], // Convert pl-PL to pl
    },
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
