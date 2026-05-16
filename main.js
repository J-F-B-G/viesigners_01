import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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

  // --- Stats Counter Logic ---
  const statsSection = document.getElementById('performance');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'));
      const suffix = num.getAttribute('data-target') === '5' ? 'x' : '+';
      const duration = 2000;
      let startTime = null;

      // Ease out function: starts fast, slows down
      const easeOutQuart = (t) => 1 - (--t) * t * t * t;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentCount = Math.floor(easedProgress * target);

        num.textContent = currentCount + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          num.textContent = target + suffix;
        }
      };

      requestAnimationFrame(step);
    });
  };

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // --- Testimonials Read More Logic ---
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.testimonial-card');
      card.classList.toggle('is-expanded');
      
      const isExpanded = card.classList.contains('is-expanded');
      btn.setAttribute('data-i18n', isExpanded ? 'testimonials.less' : 'testimonials.more');
      
      // Immediately re-apply translation to this button
      if (translations[currentLang] && translations[currentLang][btn.getAttribute('data-i18n')]) {
        btn.innerHTML = translations[currentLang][btn.getAttribute('data-i18n')];
      }
    });
  });

  // --- FAQ Accordion Logic ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('is-open');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('is-open');
      });
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
});
