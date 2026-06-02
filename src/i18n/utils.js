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
export function useTranslations(lang) {
  // Lazy‑load to keep the bundle small – Astro will replace at build time.
  const { translations } = await import('./ui.js');
  return translations[lang] || translations[defaultLang];
}
