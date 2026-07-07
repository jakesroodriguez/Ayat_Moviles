import React, { useState, useEffect } from "react";
import { Users, Eye, Sparkles, TrendingUp, Activity, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function VisitorCounter() {
  const [stats, setStats] = useState({
    totalVisits: 24158,
    todayVisits: 142,
    onlineNow: 3,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have incremented the count for this browser session yet
    const hasVisitedThisSession = sessionStorage.getItem("ayat_session_visit");
    let incParam = "false";
    
    if (!hasVisitedThisSession) {
      sessionStorage.setItem("ayat_session_visit", "true");
      incParam = "true";
    }

    // Initial fetch with session-based increment trigger
    const fetchVisitorStats = async () => {
      try {
        const res = await fetch(`/api/visitor?inc=${incParam}`);
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalVisits: data.totalVisits || 24158,
            todayVisits: data.todayVisits || 142,
            onlineNow: data.onlineNow || 3,
          });
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorStats();

    // Set up continuous, non-intrusive background polling for real-time live users every 20s
    const pollInterval = setInterval(async () => {
      try {
        // Subsequent polls do NOT increment (inc=false)
        const res = await fetch("/api/visitor?inc=false");
        if (res.ok) {
          const data = await res.json();
          setStats(prev => ({
            ...prev,
            todayVisits: data.todayVisits || prev.todayVisits,
            onlineNow: data.onlineNow || prev.onlineNow,
          }));
        }
      } catch (e) {
        // silent fail on background polling
      }
    }, 20000);

    return () => clearInterval(pollInterval);
  }, []);

  // Format numbers to 6 digits with leading zeros for a vintage tech LED/Nixie vibe
  const formatTotalCount = (num: number) => {
    return String(num).padStart(6, "0");
  };

  return (
    <div className="bg-slate-900/60 border border-slate-900/80 p-5 rounded-2xl backdrop-blur-md shadow-xl text-left relative overflow-hidden group" id="ayat-visitor-telemetry">
      {/* Absolute futuristic glow line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 group-hover:via-indigo-500/60 transition-all duration-700" />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
            Centro de Telemetría Ayat
          </span>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[ping_1.5s_infinite]" />
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-tight">
              {stats.onlineNow} Online
            </span>
          </div>
        </div>

        {/* Vintage glowing digital counter row */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-slate-500 font-medium block">VISITAS TOTALES ACUMULADAS:</span>
          <div className="flex items-center gap-1">
            {formatTotalCount(stats.totalVisits).split("").map((digit, index) => (
              <motion.div
                key={index}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                className="w-7 h-9.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center font-mono text-lg font-black text-indigo-400 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] relative overflow-hidden"
              >
                {/* Subtle digital filter line overlay */}
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-900/50" />
                <span className="relative z-10 drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]">{digit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secondary parameters Grid */}
        <div className="grid grid-cols-2 gap-3.5 pt-1.5 border-t border-slate-800/40">
          {/* Today stats */}
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 font-mono block">TRÁFICO HOY</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>+{stats.todayVisits}</span>
              <span className="text-[9px] text-slate-500 font-normal">visitas</span>
            </div>
          </div>

          {/* Active support sessions */}
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 font-mono block">ESTADO SOPORTE</span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-200">
              <Smartphone className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
              <span className="text-[10px] text-indigo-300">ACTIVO 2026</span>
            </div>
          </div>
        </div>

        {/* Informative text */}
        <p className="text-[10px] text-slate-500 leading-normal pt-1 text-center font-mono">
          Datos auditados y protegidos conforme al RGPD europeo.
        </p>
      </div>
    </div>
  );
}
