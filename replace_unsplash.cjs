const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'resources', 'js');

function replaceUnsplashInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceUnsplashInFiles(fullPath);
        } else if (file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const regex = /https:\/\/images\.unsplash\.com\/[^"'\s`]+/g;
            if (regex.test(content)) {
                content = content.replace(regex, '/images/default-banner.jpg');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Replaced in ' + fullPath);
            }
        }
    }
}

replaceUnsplashInFiles(targetDir);
console.log('Done.');
