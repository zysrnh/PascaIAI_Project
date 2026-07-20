const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'resources', 'js');

function fixStoragePrefixIntelligently(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixStoragePrefixIntelligently(fullPath);
        } else if (file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // The pattern is: (varName)?.banner_image ? (varName).banner_image : "/images/default-banner.jpg"
            const regex = /([a-zA-Z0-9_]+)\?\.banner_image\s*\?\s*\1\.banner_image\s*:\s*"\/images\/default-banner\.jpg"/g;
            
            let replaced = false;
            content = content.replace(regex, (match, varName) => {
                replaced = true;
                return `${varName}?.banner_image ? (${varName}.banner_image.startsWith('/storage/') || ${varName}.banner_image.startsWith('http') ? ${varName}.banner_image : \`/storage/\${${varName}.banner_image}\`) : "/images/default-banner.jpg"`;
            });
            
            if (replaced) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed smartly in ' + fullPath);
            }
        }
    }
}

fixStoragePrefixIntelligently(targetDir);
console.log('Done.');
