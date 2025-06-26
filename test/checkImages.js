const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'pisos.html'];
let missing = false;

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const regex = /["'](images\/[^"']+)["']/g;
  let match;
  while ((match = regex.exec(html))) {
    const imgPath = path.join(__dirname, '..', match[1]);
    if (!fs.existsSync(imgPath)) {
      console.error(`Missing: ${match[1]} in ${file}`);
      missing = true;
    }
  }
}

if (missing) {
  console.error('Some image paths are invalid');
  process.exit(1);
} else {
  console.log('All image paths are valid');
}
