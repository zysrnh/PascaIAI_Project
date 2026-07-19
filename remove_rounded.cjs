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
    
    // Replace rounded-md, rounded-sm, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl with rounded-none
    content = content.replace(/\brounded-(sm|md|lg|xl|2xl|3xl)\b/g, 'rounded-none');
    
    // Replace just 'rounded' with 'rounded-none'
    // Be careful with rounded-full, we might want to keep it for circles. 
    // Wait, let's replace rounded with rounded-none if it's a standalone class
    content = content.replace(/\brounded\b/g, 'rounded-none');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${file}`);
}
