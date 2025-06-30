const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      files = files.concat(getHtmlFiles(res));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(res);
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles(process.cwd());
let missing = false;

htmlFiles.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const regex = /<img[^>]+src="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html))) {
    const src = match[1];
    if (/^(https?:)?\/\//i.test(src)) continue;
    const imgPath = path.resolve(path.dirname(file), src);
    if (!fs.existsSync(imgPath)) {
      console.error(`Missing image ${src} referenced in ${file}`);
      missing = true;
    }
  }
});

if (missing) {
  process.exitCode = 1;
} else {
  console.log('All images found in HTML files');
}
