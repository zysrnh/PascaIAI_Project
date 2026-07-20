const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'resources', 'js');

function fixStoragePrefix(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixStoragePrefix(fullPath);
        } else if (file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // We want to replace `/storage/${pengaturan.banner_image}` with `pengaturan.banner_image`
            // Sometimes it's in backticks like: `/storage/${pengaturan.banner_image}`
            // And sometimes we just need to return it directly.
            // In all cases from the grep, it looks like: `/storage/${pengaturan.banner_image}` inside backticks.
            const regex = /`\/storage\/\$\{pengaturan\.banner_image\}`/g;
            if (regex.test(content)) {
                content = content.replace(regex, 'pengaturan.banner_image');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed in ' + fullPath);
            }
        }
    }
}

fixStoragePrefix(targetDir);
console.log('Done fixing double storage prefix.');
