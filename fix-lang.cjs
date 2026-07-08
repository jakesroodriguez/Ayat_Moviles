const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/language === "ES"/g, 'language === "ESP"');
code = code.replace(/"ES" \? "EU" : "ES"/g, '"ESP" ? "EUS" : "ESP"');

fs.writeFileSync('src/App.tsx', code);
