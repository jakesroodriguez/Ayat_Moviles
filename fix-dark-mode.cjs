const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replacements
code = code.replace(/bg-white/g, 'bg-white dark:bg-slate-900');
code = code.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
code = code.replace(/text-slate-800/g, 'text-slate-800 dark:text-slate-100');
code = code.replace(/text-slate-700/g, 'text-slate-700 dark:text-slate-200');
code = code.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
code = code.replace(/text-slate-650/g, 'text-slate-650 dark:text-slate-300');
code = code.replace(/border-slate-200/g, 'border-slate-200 dark:border-slate-700');
code = code.replace(/border-slate-100/g, 'border-slate-100 dark:border-slate-800');
code = code.replace(/bg-slate-50/g, 'bg-slate-50 dark:bg-slate-800');
code = code.replace(/bg-slate-100/g, 'bg-slate-100 dark:bg-slate-800');
code = code.replace(/shadow-\[0_15px_35px_rgba\(15,23,42,0\.03\)\]/g, 'shadow-[0_15px_35px_rgba(15,23,42,0.03)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)]');

// But avoid "dark:bg-slate-900 dark:bg-slate-900" due to previous manual replacements
code = code.replace(/dark:bg-slate-900(\/\[0-9]+\])? dark:bg-slate-900/g, 'dark:bg-slate-900$1');
code = code.replace(/dark:bg-slate-900 dark:bg-slate-900/g, 'dark:bg-slate-900');
code = code.replace(/dark:text-white dark:text-white/g, 'dark:text-white');
code = code.replace(/dark:text-slate-100 dark:text-slate-100/g, 'dark:text-slate-100');
code = code.replace(/dark:text-slate-400 dark:text-slate-400/g, 'dark:text-slate-400');
code = code.replace(/dark:text-slate-300 dark:text-slate-300/g, 'dark:text-slate-300');
code = code.replace(/dark:border-slate-700(\/\[0-9]+\])? dark:border-slate-700/g, 'dark:border-slate-700$1');
code = code.replace(/dark:border-slate-700 dark:border-slate-700/g, 'dark:border-slate-700');
code = code.replace(/dark:border-slate-800(\/\[0-9]+\])? dark:border-slate-800/g, 'dark:border-slate-800$1');
code = code.replace(/dark:border-slate-800 dark:border-slate-800/g, 'dark:border-slate-800');
code = code.replace(/dark:bg-slate-800(\/\[0-9]+\])? dark:bg-slate-800/g, 'dark:bg-slate-800$1');
code = code.replace(/dark:bg-slate-800 dark:bg-slate-800/g, 'dark:bg-slate-800');

fs.writeFileSync('src/App.tsx', code);
