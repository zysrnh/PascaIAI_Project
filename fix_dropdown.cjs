const fs = require('fs');
const path = require('path');

const files = [
    'resources/js/Pages/Welcome.jsx',
    'resources/js/Layouts/PublicLayout.jsx'
];

for (const file of files) {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) continue;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    content = content.replace(/bg-white border border-slate-100 shadow-xl/g, 'bg-white border border-slate-200 rounded-md shadow-xl');
    content = content.replace(/bg-white border border-slate-200 shadow-xl/g, 'bg-white border border-slate-200 rounded-md shadow-xl');
    
    content = content.replace(/<div className="py-2">/g, '<div className="p-2 space-y-0.5">');
    
    content = content.replace(/className="block px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"/g, 'className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors"');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated dropdowns in ${file}`);
}
