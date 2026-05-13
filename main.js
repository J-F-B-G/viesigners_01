import { translations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- i18n Logic ---
  let currentLang = localStorage.getItem('lang') || 'fr';

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    document.documentElement.lang = lang;
    
    // Update language toggle buttons text (if any)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.textContent = lang === 'fr' ? 'EN' : 'FR';
    });
  }

  // Initial translation application
  applyTranslations(currentLang);

  // Setup language toggles
  const langToggles = document.querySelectorAll('.lang-btn');
  langToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      currentLang = currentLang === 'fr' ? 'en' : 'fr';
      localStorage.setItem('lang', currentLang);
      applyTranslations(currentLang);
    });
  });

  // --- Menu Logic ---
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const fullscreenMenu = document.getElementById('fullscreenMenu');
  
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  }

  if (fullscreenMenu) {
    fullscreenMenu.addEventListener('scroll', () => {
      if (fullscreenMenu.scrollTop > 20) {
        fullscreenMenu.classList.add('is-scrolled');
      } else {
        fullscreenMenu.classList.remove('is-scrolled');
      }
    });
  }
});
