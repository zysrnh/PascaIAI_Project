const fs = require('fs');
const path = require('path');

const files = [
    'resources/js/Pages/Admin/LPPM/Publikasi/Index.jsx',
    'resources/js/Pages/Admin/LPPM/Repository/Index.jsx',
    'resources/js/Pages/Admin/LPPM/Pengabdian/Index.jsx',
    'resources/js/Pages/Admin/LPPM/Penelitian/Index.jsx'
];

for (const relPath of files) {
    const fullPath = path.join(__dirname, relPath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace the annoying border dashed class with border-0
    const targetClass = 'border-b border-dashed border-white/50 focus:border-white focus:ring-0';
    const newClass = 'border-0 focus:border-0 focus:ring-0';
    
    if (content.includes(targetClass)) {
        content = content.replace(targetClass, newClass);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed borders in ' + relPath);
    }
}
