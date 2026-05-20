import os
import glob

def fix_links(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements
    content = content.replace('href="/#about"', 'href="./index.html#about"')
    content = content.replace('href="/#contact"', 'href="./contact.html"')
    content = content.replace('href="/site-web.html"', 'href="./site-web.html"')
    content = content.replace('href="/landing-page.html"', 'href="./landing-page.html"')
    content = content.replace('href="/ux-ui.html"', 'href="./ux-ui.html"')
    content = content.replace('href="/coaching.html"', 'href="./coaching.html"')
    content = content.replace('href="/contact.html"', 'href="./contact.html"')
    # Careful with href="/" since it could be matched in parts.
    content = content.replace('href="/"', 'href="./index.html"')
    content = content.replace('src="/main.js"', 'src="./main.js"')

    with open(filepath, 'w') as f:
        f.write(content)

for filepath in glob.glob('*.html'):
    fix_links(filepath)

if os.path.exists('replace_headers.py'):
    fix_links('replace_headers.py')

print("Links fixed.")
