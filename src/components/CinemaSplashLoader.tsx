import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShieldCheck, Activity, Smartphone } from "lucide-react";

interface CinemaSplashLoaderProps {
  onComplete: () => void;
}

export default function CinemaSplashLoader({ onComplete }: CinemaSplashLoaderProps) {
  const [stage, setStage] = useState<"spinning" | "zooming" | "exit">("spinning");

  useEffect(() => {
    // Stage timings:
    // 1. Sudden spin starts immediately and decelerates.
    // 2. Around 2.0s, we trigger the elegant zoom focus.
    // 3. At 2.9s, we start the exit fadeout.
    // 4. At 3.5s, the splash is completely unmounted.
    
    const zoomTimeout = setTimeout(() => {
      setStage("zooming");
    }, 1800);

    const exitTimeout = setTimeout(() => {
      setStage("exit");
    }, 2800);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Background soft ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-indigo-50/50 blur-[80px]" />
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-purple-50/50 blur-[90px]" />
      </div>

      <div className="relative flex flex-col items-center justify-center">
        
        {/* Cinematic phone frame animation */}
        <motion.div
          initial={{ 
            scale: 0.35, 
            rotateY: -180, 
            rotateX: 45, 
            rotateZ: -720,
            opacity: 0,
            z: -500
          }}
          animate={
            stage === "spinning" 
              ? { 
                  scale: 0.95, 
                  rotateY: 0, 
                  rotateX: 0, 
                  rotateZ: 0,
                  opacity: 1,
                  z: 0
                }
              : stage === "zooming"
              ? {
                  scale: 1.35,
                  rotateY: 5,
                  rotateX: 5,
                  rotateZ: -2,
                  opacity: 1,
                  z: 100,
                  filter: "brightness(1.02)"
                }
              : {
                  scale: 2.5,
                  rotateY: 0,
                  rotateX: 0,
                  rotateZ: 0,
                  opacity: 0,
                  z: 300,
                  filter: "blur(8px)"
                }
          }
          transition={
            stage === "spinning"
              ? { 
                  // Brusco giro que frena poco a poco (cubic-bezier high deceleration)
                  duration: 1.8, 
                  ease: [0.1, 0.9, 0.2, 1] 
                }
              : stage === "zooming"
              ? {
                  // Elegant smooth focus zoom
                  duration: 1.0,
                  ease: "easeInOut"
                }
              : {
                  // Quick exit fade & blow-up
                  duration: 0.6,
                  ease: [0.4, 0, 1, 1]
                }
          }
          className="relative w-[240px] h-[480px] bg-slate-950 rounded-[44px] p-3.5 shadow-[0_40px_90px_rgba(15,23,42,0.25),inset_0_2px_4px_rgba(255,255,255,0.2)] border-4 border-slate-900 flex flex-col items-center justify-between"
          style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        >
          
          {/* Phone Speaker & Dynamic Island Island notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-35 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ml-auto mr-1.5" />
          </div>

          {/* Screen Content */}
          <div className="w-full h-full bg-white rounded-[36px] overflow-hidden flex flex-col items-center justify-center relative p-4 border border-slate-950/5">
            
            {/* Fine grids inside screen */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
            
            {/* Top Status Bar (Real iOS/Android simulation for premium vibe) */}
            <div className="absolute top-5 left-0 right-0 px-4 flex items-center justify-between text-[8px] font-mono text-slate-400 z-30 select-none">
              <span>12:35</span>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span className="w-2.5 h-1.5 border border-slate-300 rounded-sm flex items-center p-[1px]">
                  <span className="w-1.5 h-full bg-slate-400 rounded-2xs" />
                </span>
              </div>
            </div>

            {/* Decorative shining line running through the phone screen */}
            <motion.div 
              initial={{ top: "-100%" }}
              animate={{ top: "100%" }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent pointer-events-none"
            />

            {/* Pulsating Energy Rings and Circles (Aura Tech) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute w-36 h-36 border border-dashed border-indigo-200/50 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute w-48 h-48 border border-indigo-100 rounded-full"
              />
              <div className="absolute w-28 h-28 bg-gradient-to-tr from-indigo-50/60 to-purple-50/60 rounded-full blur-xl opacity-70" />
            </div>

            {/* Center Animated Tech Core & Welcome Title */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
              
              {/* Spinning Tech Node Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 relative group"
              >
                {/* Glowing borders */}
                <div className="absolute inset-0 rounded-2xl bg-indigo-500 blur opacity-45 -z-10 group-hover:opacity-75 transition-opacity" />
                <Smartphone className="w-6 h-6 text-white" />
              </motion.div>

              {/* Glowing Greeting Title */}
              <div className="space-y-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    ¡BIENVENIDO!
                  </span>
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-base font-black text-slate-900 tracking-tight leading-tight"
                >
                  AYAT MÓVILES
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-[9px] text-slate-400 font-medium max-w-[120px] mx-auto leading-normal"
                >
                  Soporte Técnico Premium
                </motion.p>
              </div>

              {/* Active systems status card inside the mock screen */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="bg-slate-50 border border-slate-100 p-2 rounded-xl flex items-center gap-1.5 shadow-xs w-28 justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-mono font-bold text-slate-600 tracking-wide uppercase">
                  Sistemas Listos
                </span>
              </motion.div>

            </div>

            {/* Bottom floating app shortcuts */}
            <div className="absolute bottom-5 inset-x-4 flex items-center justify-around z-30">
              <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600 shadow-xs">
                <Activity className="w-3 h-3" />
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm font-bold text-[9px]">
                2026
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600 shadow-xs">
                <ShieldCheck className="w-3 h-3" />
              </div>
            </div>

          </div>

          {/* Lateral buttons highlight lines */}
          <div className="absolute left-[-5px] top-20 w-[1px] h-8 bg-slate-800 rounded-r" />
          <div className="absolute left-[-5px] top-30 w-[1px] h-8 bg-slate-800 rounded-r" />
          <div className="absolute right-[-5px] top-24 w-[1px] h-12 bg-slate-800 rounded-l" />

         </motion.div>

      </div>
    </div>
  );
}
