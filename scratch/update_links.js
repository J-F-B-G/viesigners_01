const fs = require('fs');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = dir + '/' + file;
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.astro')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace href="/something" with href={`${BASE_PATH}/something`}
  const hrefRegex = /href="\/([^"]*)"/g;
  if (hrefRegex.test(content)) {
    content = content.replace(hrefRegex, 'href={`\\${BASE_PATH}/$1`}');
    changed = true;
  }

  // Replace src="/something" with src={`${BASE_PATH}/something`}
  const srcRegex = /src="\/([^"]*)"/g;
  if (srcRegex.test(content)) {
    content = content.replace(srcRegex, 'src={`\\${BASE_PATH}/$1`}');
    changed = true;
  }
  
  // Replace href={`/${lang}/...`} with href={`${BASE_PATH}/${lang}/...`}
  const templateHrefRegex = /href=\{\`\/([^`]*)\`\}/g;
  if (templateHrefRegex.test(content)) {
    content = content.replace(templateHrefRegex, (match, p1) => {
        if (p1.startsWith('${BASE_PATH}')) return match;
        return 'href={`\\${BASE_PATH}/' + p1 + '`}';
    });
    changed = true;
  }

  if (changed) {
    // Add import
    const depth = file.split('/').length - 3; 
    let relativePath = '';
    for (let i = 0; i < depth; i++) relativePath += '../';
    if (depth === 0) relativePath = './';
    
    const importStmt = `import { BASE_PATH } from '${relativePath}config.js';\\n`;
    
    if (!content.includes('BASE_PATH } from')) {
      if (content.startsWith('---')) {
        content = content.replace(/^---\\n/, `---\\n${importStmt}`);
      } else {
        content = `---\\n${importStmt}---\\n` + content;
      }
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
