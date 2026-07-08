const fs = require('fs');

let faqCode = fs.readFileSync('src/components/FAQSection.tsx', 'utf8');
faqCode = faqCode.replace(/dark:text-white dark:text-slate-900/g, 'dark:text-white');
fs.writeFileSync('src/components/FAQSection.tsx', faqCode);

let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(/dark:bg-slate-900\/70 dark:bg-slate-900\/70/g, 'dark:bg-slate-900/70');
appCode = appCode.replace(/dark:bg-slate-900 dark:group-hover:bg-slate-700/g, 'dark:group-hover:bg-slate-700');
appCode = appCode.replace(/dark:border-slate-800 dark:border-slate-700/g, 'dark:border-slate-700');
appCode = appCode.replace(/dark:bg-slate-900\/60 dark:bg-slate-800\/60/g, 'dark:bg-slate-800/60');
appCode = appCode.replace(/dark:border-slate-700\/40 dark:border-slate-700\/40/g, 'dark:border-slate-700/40');
appCode = appCode.replace(/dark:border-slate-700\/90/g, 'dark:border-slate-700');
appCode = appCode.replace(/bg-white dark:bg-slate-900 text-slate-650/g, 'bg-white dark:bg-slate-800 text-slate-650');
fs.writeFileSync('src/App.tsx', appCode);

