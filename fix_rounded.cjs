const fs = require('fs');
const path = require('path');

const files = [
    'resources/js/Pages/Welcome.jsx',
    'resources/js/Pages/Public/TentangKampus.jsx',
    'resources/js/Pages/Public/SambutanPimpinan.jsx',
    'resources/js/Layouts/PublicLayout.jsx'
];

for (const file of files) {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) continue;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix the rounded-none-none issue and change rounded-none to rounded-sm
    content = content.replace(/\brounded-none-none\b/g, 'rounded-sm');
    content = content.replace(/\brounded-none\b/g, 'rounded-sm');
    
    // Remove backdrop-blur in modal
    content = content.replace(/backdrop-blur-sm/g, '');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${file}`);
}
