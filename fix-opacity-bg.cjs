const fs = require('fs');
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

appCode = appCode.replace(/bg-white dark:bg-slate-900\/90 dark:bg-slate-900\/90/g, 'bg-white/90 dark:bg-slate-900/90');
appCode = appCode.replace(/dark:border-slate-700\/60 dark:border-slate-700\/60/g, 'dark:border-slate-700/60');
appCode = appCode.replace(/bg-white dark:bg-slate-900\/40 dark:bg-slate-800\/40/g, 'bg-white/40 dark:bg-slate-800/40');
appCode = appCode.replace(/hover:bg-white dark:bg-slate-900\/60 dark:hover:bg-slate-800\/60/g, 'hover:bg-white/60 dark:hover:bg-slate-800/60');
appCode = appCode.replace(/bg-white dark:bg-slate-900\/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700\/50 dark:border-slate-800\/50/g, 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50');
appCode = appCode.replace(/bg-white dark:bg-slate-800\/60 border border-slate-200 dark:border-slate-700\/40/g, 'bg-white/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40');
appCode = appCode.replace(/bg-white dark:bg-slate-900\/10 text-white/g, 'bg-white/10 text-white');
appCode = appCode.replace(/bg-white dark:bg-slate-900\/55/g, 'bg-white/55'); // 1301, 1312, 1323
appCode = appCode.replace(/bg-white dark:bg-slate-900\/60/g, 'bg-white/60'); // 1331, 1335
appCode = appCode.replace(/bg-white dark:bg-slate-900\/5 /g, 'bg-white/5 '); // 1369, 1392
appCode = appCode.replace(/hover:bg-white dark:bg-slate-900\/10/g, 'hover:bg-white/10'); // 1392

fs.writeFileSync('src/App.tsx', appCode);
