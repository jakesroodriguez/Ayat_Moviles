const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fixing exact lines in calculator
code = code.replace(
  /bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-300 border-slate-200 dark:border-slate-700\/80 hover:bg-slate-50 dark:bg-slate-800 hover:border-slate-300/g,
  'bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
);

code = code.replace(
  /bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700\/85 rounded-2xl p-4 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-550 focus:ring-1 focus:ring-indigo-200\/40/g,
  'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-550 focus:ring-1 focus:ring-indigo-500/40'
);

code = code.replace(
  /bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700\/80 hover:bg-slate-50 dark:bg-slate-800 hover:border-slate-300/g,
  'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
);

code = code.replace(
  /bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700\/90 p-6 sm:p-8 rounded-\[24px\] flex-1 flex flex-col justify-between/g,
  'bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 rounded-[24px] flex-1 flex flex-col justify-between'
);

code = code.replace(
  /bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 px-3 py-1 rounded-full text-\[10px\] font-mono/g,
  'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-[10px] font-mono'
);

// Fixing exact lines in Chatbot
code = code.replace(
  /bg-white dark:bg-slate-900 p-3 rounded-\[40px\] shadow-sm border border-slate-200 dark:border-slate-700 relative group overflow-hidden/g,
  'bg-white dark:bg-slate-800 p-3 rounded-[40px] shadow-sm border border-slate-200 dark:border-slate-700 relative group overflow-hidden'
);

code = code.replace(
  /bg-slate-50 dark:bg-slate-800 rounded-\[32px\] overflow-hidden border border-slate-200 dark:border-slate-700\/85 flex flex-col h-\[410px\]/g,
  'bg-slate-50 dark:bg-slate-950 rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col h-[410px]'
);

code = code.replace(
  /flex-1 overflow-y-auto p-4 space-y-3 flex flex-col bg-slate-50 dark:bg-slate-800/g,
  'flex-1 overflow-y-auto p-4 space-y-3 flex flex-col bg-slate-50 dark:bg-slate-950'
);

code = code.replace(
  /bg-slate-200\/60 px-2\.5 py-0\.5 rounded text-\[9px\] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider/g,
  'bg-slate-200/60 dark:bg-slate-800 px-2.5 py-0.5 rounded text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider'
);

code = code.replace(
  /bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700\/50 rounded-2xl rounded-tl-none p-3 max-w-\[85%\] text-\[12px\] text-slate-800 dark:text-slate-100 shadow-sm relative self-start/g,
  'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none p-3 max-w-[85%] text-[12px] text-slate-800 dark:text-slate-100 shadow-sm relative self-start'
);

code = code.replace(
  /p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-2 shrink-0/g,
  'p-3 bg-white dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 shrink-0'
);

code = code.replace(
  /w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-slate-400 focus:outline-none rounded-xl px-3 py-1\.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-450 resize-none font-sans/g,
  'w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-450 dark:placeholder-slate-500 resize-none font-sans'
);

// Map / Hours
code = code.replace(
  /py-8 md:py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700\/60 rounded-3xl/g,
  'py-8 md:py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl'
);

code = code.replace(
  /bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col lg:flex-row rounded-3xl/g,
  'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col lg:flex-row rounded-3xl'
);

fs.writeFileSync('src/App.tsx', code);
