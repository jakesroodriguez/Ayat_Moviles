const fs = require('fs');

// Fix App.tsx calculator background
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace('from-slate-50 to-white border border-slate-200 dark:border-slate-700/60', 'from-slate-50 dark:from-slate-900 to-white dark:to-slate-950 border border-slate-200 dark:border-slate-700/60');
// Also the label and badge in calculator
appCode = appCode.replace('bg-indigo-50 border border-indigo-100/60 px-3 py-1.5', 'bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-100/60 dark:border-indigo-800/50 px-3 py-1.5 dark:text-indigo-400');
appCode = appCode.replace(/text-slate-550/g, 'text-slate-500 dark:text-slate-400');
appCode = appCode.replace('bg-indigo-50 border border-indigo-100 px-3 py-1', 'bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800/50 px-3 py-1 dark:text-indigo-400');
fs.writeFileSync('src/App.tsx', appCode);

// Fix FAQSection.tsx
let faqCode = fs.readFileSync('src/components/FAQSection.tsx', 'utf8');
faqCode = faqCode.replace(/bg-white(\/40|\/80)?/g, 'bg-white$1 dark:bg-slate-900$1');
faqCode = faqCode.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
faqCode = faqCode.replace(/text-slate-800/g, 'text-slate-800 dark:text-slate-100');
faqCode = faqCode.replace(/text-slate-700/g, 'text-slate-700 dark:text-slate-200');
faqCode = faqCode.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
faqCode = faqCode.replace(/text-slate-400/g, 'text-slate-400 dark:text-slate-500');
faqCode = faqCode.replace(/border-slate-200/g, 'border-slate-200 dark:border-slate-700');
faqCode = faqCode.replace(/border-slate-100/g, 'border-slate-100 dark:border-slate-800');
faqCode = faqCode.replace(/border-slate-300/g, 'border-slate-300 dark:border-slate-600');
faqCode = faqCode.replace(/bg-slate-50/g, 'bg-slate-50 dark:bg-slate-800');
faqCode = faqCode.replace(/bg-slate-950/g, 'bg-slate-950 dark:bg-white');
faqCode = faqCode.replace(/border-slate-950/g, 'border-slate-950 dark:border-white');
faqCode = faqCode.replace(/text-white/g, 'text-white dark:text-slate-900'); // for the chevron inverse

// The main container background gradient
faqCode = faqCode.replace('from-slate-50 dark:bg-slate-800 to-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60', 'from-slate-50 dark:from-slate-900 to-white dark:to-slate-950 border border-slate-200 dark:border-slate-800');
faqCode = faqCode.replace('from-slate-50 to-white border border-slate-200/60', 'from-slate-50 dark:from-slate-900 to-white dark:to-slate-950 border border-slate-200/60 dark:border-slate-800');

// Badge colors in FAQ
faqCode = faqCode.replace('bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-800/60', 'bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-100/60 dark:border-indigo-800/50 dark:text-indigo-400');

fs.writeFileSync('src/components/FAQSection.tsx', faqCode);

