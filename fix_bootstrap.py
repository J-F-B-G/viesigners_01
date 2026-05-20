import os
import glob

# Remove imports from main.js
with open('main.js', 'r') as f:
    lines = f.readlines()

with open('main.js', 'w') as f:
    for line in lines:
        if "import 'bootstrap" not in line:
            f.write(line)

# Add CDNs to HTML
bootstrap_css = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">\n'
bootstrap_js = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmxc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>\n'

for filepath in glob.glob('*.html'):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if CDN already exists
    if 'bootstrap.min.css' not in content:
        # insert before style.css
        content = content.replace('<link rel="stylesheet" href="./style.css">', bootstrap_css + '  <link rel="stylesheet" href="./style.css">')
        content = content.replace('<link rel="stylesheet" href="./style.css" />', bootstrap_css + '  <link rel="stylesheet" href="./style.css" />')
        content = content.replace('<link rel="stylesheet" href="style.css">', bootstrap_css + '  <link rel="stylesheet" href="./style.css">')

    if 'bootstrap.bundle.min.js' not in content:
        # insert before main.js
        content = content.replace('<script type="module" src="./main.js"></script>', bootstrap_js + '  <script type="module" src="./main.js"></script>')

    with open(filepath, 'w') as f:
        f.write(content)

print("Bootstrap imports fixed.")
