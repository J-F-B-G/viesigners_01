export const defaultLang = 'fr';

/**
 * Return the language code from a URL pathname.
 * Expected pattern: /fr/... or /en/...
 */
export function getLangFromUrl(pathname) {
  const match = pathname.match(/^\/(fr|en)(?:\/|$)/);
  return match ? match[1] : defaultLang;
}

/**
 * Simple helper that returns the translation dictionary for the given language.
 * The actual translations are imported from `ui.js` (the former translations.js).
 */
import { translations } from './ui.js';

export function useTranslations(lang) {
  return function t(key) {
    const langDict = translations[lang] || translations[defaultLang];
    return langDict[key] || translations[defaultLang][key] || key;
  };
}
