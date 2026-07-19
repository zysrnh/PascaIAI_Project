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
    
    content = content.replace(/<a href="#" (className="[^"]*")>Visi, Misi & Tujuan<\/a>/g, '<Link href="/profil/visi-misi" $1>Visi, Misi & Tujuan</Link>');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated link in ${file}`);
}
