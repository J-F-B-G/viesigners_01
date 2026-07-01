import os
import re

header_replacement = """  <div id="header-wrapper" class="header-wrapper">
    <div class="container">
    <header class="main-header">
      <div class="header-contact" style="position: relative; z-index: 1000;">
        <a href="tel:+15815021115" class="contact-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
            </path>
          </svg>
          <span class="phone-number">+1 581-502-1115</span>
        </a>
      </div>
      <a href="./index.html" class="logo" style="position: relative; z-index: 1000;">V2R Consulting</a>
      <div class="header-menu-toggle"
        style="position: relative; z-index: 1000; display: flex; align-items: center; justify-content: flex-end;">
        <button class="menu-btn" id="menuToggleBtn">
          <div class="menu-text-container">
            <span class="menu-text menu-text-open" data-i18n="header.menu">Menu</span>
            <span class="menu-text menu-text-close" data-i18n="header.close">Fermer</span>
          </div>
          <svg class="hamburger" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line class="line line-top" x1="3" y1="6" x2="21" y2="6"></line>
            <line class="line line-middle" x1="3" y1="12" x2="21" y2="12"></line>
            <line class="line line-bottom" x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>

    <!-- Fullscreen Menu -->
    <div class="fullscreen-menu" id="fullscreenMenu">
      <nav class="fullscreen-nav">
        <ul>
          <li><a href="./index.html#about" data-i18n="nav.about">À propos</a></li>
          <li><a href="./site-web.html" data-i18n="nav.website">Site web</a></li>
          <li><a href="./landing-page.html" data-i18n="nav.landing">Landing page</a></li>
          <li><a href="./ux-ui.html" data-i18n="nav.uxui">Optimisation UX/UI</a></li>
          <li><a href="./coaching.html" data-i18n="nav.coaching">Coaching d'affaires</a></li>
          <li><a href="./contact.html" data-i18n="nav.contact">Contact</a></li>
          <li style="margin-top: 3rem;">
            <button id="langToggle" class="lang-btn" style="background:none; border:none; color:var(--text-color); padding:0; cursor:pointer; font-weight:500; font-size:clamp(1.5rem, 3vw, 2rem); font-family:var(--font-heading); text-transform:uppercase; transition:opacity 0.3s; opacity: 0.7;">EN</button>
          </li>
        </ul>
      </nav>
      </div>
  </div>
  </div>"""

files = [
    "seo-geo.html",
    "coaching.html",
    "medias-sociaux.html",
    "ux-ui.html",
    "email-marketing.html",
    "landing-page.html",
    "site-web.html"
]

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Replace header
    content = re.sub(r'<div class="container">\s*<header class="main-header">.*?</nav>\s*</div>\s*</div>', header_replacement, content, flags=re.DOTALL)
    
    # Add main.js script before </body> if missing
    if '<script type="module" src="./main.js"></script>' not in content:
        content = content.replace('</body>', '  <script type="module" src="./main.js"></script>\n</body>')
        
    with open(f, 'w') as file:
        file.write(content)

print("Done")
