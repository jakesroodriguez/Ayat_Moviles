import React, { useState, useRef, useEffect } from "react";
import { 
  Smartphone, 
  Sparkles, 
  ShoppingBag, 
  Wrench, 
  Wifi, 
  Battery, 
  MessageSquare,
  Instagram, 
  Facebook, 
  Clock, 
  X
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";

// --- CUSTOM SVG CHARACTER ILLUSTRATIONS MATCHING THE IMAGE ---

const SittingMan = () => (
  <svg viewBox="0 0 100 120" className="w-20 h-24 select-none pointer-events-none filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" fill="none">
    {/* Hair */}
    <path d="M45 16 C45 10, 58 10, 58 16 C58 18, 55 20, 45 19 Z" fill="#1E293B" />
    {/* Head (Skin) */}
    <circle cx="50" cy="22" r="7" fill="#FDBA74" />
    {/* Purple Shirt */}
    <path d="M40 38 C40 32, 60 32, 60 38 L62 55 L38 55 Z" fill="#5B3EE3" />
    {/* Sleeve */}
    <path d="M40 38 L34 46 L38 48 L42 42 Z" fill="#5B3EE3" />
    <path d="M60 38 L66 46 L62 48 L58 42 Z" fill="#5B3EE3" />
    {/* Hands holding tablet */}
    <circle cx="33" cy="48" r="2.5" fill="#FDBA74" />
    <circle cx="67" cy="48" r="2.5" fill="#FDBA74" />
    {/* Blue Tablet */}
    <rect x="42" y="44" width="16" height="10" rx="1" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" />
    {/* Legs dangling (Dark Pants) */}
    <path d="M40 55 L32 85 C31 88, 35 90, 37 87 L43 72 L46 55 Z" fill="#111827" />
    <path d="M54 55 L58 72 L64 87 C66 90, 70 88, 69 85 L61 55 Z" fill="#111827" />
    {/* Shoes */}
    <path d="M30 85 L26 87 C25 88, 26 90, 28 89 L33 86 Z" fill="#111827" />
    <path d="M70 85 L74 87 C75 88, 74 90, 72 89 L67 86 Z" fill="#111827" />
  </svg>
);

const SittingWomanLeft = () => (
  <svg viewBox="0 0 100 120" className="w-20 h-24 select-none pointer-events-none filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" fill="none">
    {/* Hair */}
    <path d="M40 14 C35 14, 32 20, 32 30 C32 40, 48 38, 48 30 C48 20, 45 14, 40 14 Z" fill="#1E293B" />
    <circle cx="41" cy="22" r="7" fill="#FDBA74" />
    <path d="M35 12 C35 12, 45 6, 48 15 C51 22, 46 26, 44 26" fill="#1E293B" />
    {/* Lilac Long-sleeve Shirt */}
    <path d="M33 38 C33 33, 49 33, 49 38 L51 55 L31 55 Z" fill="#C084FC" />
    {/* Left Arm holding phone */}
    <path d="M33 38 L25 46 C24 47, 26 50, 28 49 L33 44 Z" fill="#C084FC" />
    <circle cx="25" cy="48" r="2.5" fill="#FDBA74" />
    {/* Phone */}
    <rect x="20" y="42" width="5" height="10" rx="1" fill="#111827" transform="rotate(10 22 47)" />
    {/* Legs dangling (Dark Pants) */}
    <path d="M33 55 L25 80 C24 83, 28 85, 30 82 L38 68 L39 55 Z" fill="#1F2937" />
    <path d="M45 55 L47 68 L53 82 C55 85, 59 83, 58 80 L50 55 Z" fill="#1F2937" />
    {/* Shoes */}
    <path d="M23 80 L19 82 C18 83, 19 85, 21 84 L26 81 Z" fill="#111827" />
    <path d="M59 80 L63 82 C64 83, 63 85, 61 84 L56 81 Z" fill="#111827" />
  </svg>
);

const SittingWomanRight = () => (
  <svg viewBox="0 0 100 120" className="w-20 h-24 select-none pointer-events-none filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" fill="none">
    {/* Hair */}
    <path d="M54 12 C50 12, 48 18, 48 24 C48 30, 58 30, 60 24 C62 18, 58 12, 54 12 Z" fill="#1E293B" />
    {/* Head (Skin) */}
    <circle cx="54" cy="22" r="7" fill="#FDBA74" />
    {/* Lilac T-shirt */}
    <path d="M46 38 C46 33, 62 33, 62 38 L63 55 L45 55 Z" fill="#C084FC" />
    {/* Arm holding phone */}
    <path d="M62 38 L70 46 C71 47, 69 50, 67 49 L62 44 Z" fill="#C084FC" />
    <circle cx="70" cy="48" r="2.5" fill="#FDBA74" />
    {/* Phone */}
    <rect x="71" y="42" width="5" height="10" rx="1" fill="#111827" transform="rotate(-10 73 47)" />
    {/* Legs dangling (Dark Pants) */}
    <path d="M47 55 L41 80 C40 83, 44 85, 46 82 L52 68 L53 55 Z" fill="#1F2937" />
    <path d="M59 55 L61 68 L67 82 C69 85, 73 83, 72 80 L64 55 Z" fill="#1F2937" />
    {/* Shoes */}
    <path d="M39 80 L35 82 C34 83, 35 85, 37 84 L42 81 Z" fill="#111827" />
    <path d="M68 80 L72 82 C73 83, 72 85, 70 84 L65 81 Z" fill="#111827" />
  </svg>
);

export default function ThreeSmartphone() {
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);
  const [activeAd, setActiveAd] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Force video playback on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Auto-playback triggered: ", err);
      });
    }
  }, []);

  // Ref to track mouse position relative to the container
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  
  // Motion values for normalized mouse positions (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for extra smooth 3D rotation
  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 };
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  // Dynamic glare position & opacity
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseX, (val) => {
    const active = Math.abs(val) > 0.05 || Math.abs(mouseY.get()) > 0.05;
    return active ? 0.35 : 0.15;
  }), springConfig);

  // Continuous floating and rotation movement when idle
  useEffect(() => {
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      if (!isInteracting.current) {
        time += 0.04; // Faster speed for a more dynamic and abrupt motion
        // Wider amplitude for a more pronounced rotation and float
        const x = Math.sin(time) * 0.42;
        const y = Math.cos(time * 0.85) * 0.38;
        mouseX.set(x);
        mouseY.set(y);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isInteracting.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates to -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    isInteracting.current = false;
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    isInteracting.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    
    // Normalize coordinates to -0.5 to 0.5
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    
    // Clamp to [-0.5, 0.5] to prevent crazy rotation
    const clampedX = Math.max(-0.5, Math.min(0.5, x));
    const clampedY = Math.max(-0.5, Math.min(0.5, y));
    
    mouseX.set(clampedX);
    mouseY.set(clampedY);
  };

  const handleTouchEnd = () => {
    isInteracting.current = false;
    mouseX.set(0);
    mouseY.set(0);
  };

  const ads = [
    {
      title: "Reparación Express ⚡",
      desc: "Pantallas & baterías en 30 minutos.",
      detail: "Servicio premium en Zumarraga con garantía certificada.",
      badge: "SOPORTE"
    },
    {
      title: "Punto Pack Oficial 📦",
      desc: "Mondial Relay: Recoge aquí hoy.",
      detail: "Envía y recoge tus paquetes de 10:00 a 14:00 y 16:30 a 20:30.",
      badge: "LOGÍSTICA"
    },
    {
      title: "WhatsApp Activo 📞",
      desc: "Escríbenos al 632 44 79 79",
      detail: "Presupuestos al instante sin compromiso.",
      badge: "CONTACTO"
    }
  ];

  const handleNextAd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAd((prev) => (prev + 1) % ads.length);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-[170px] xs:w-[200px] sm:w-full max-w-[170px] xs:max-w-[200px] sm:max-w-[300px] md:max-w-[320px] h-[300px] xs:h-[350px] sm:h-[520px] md:h-[590px] mx-auto select-none cursor-pointer"
      style={{ perspective: "1200px" }}
      id="three-smartphone-interactive"
    >
      
      {/* Dynamic 3D Floating Shadow that shifts opposite to the rotation */}
      <motion.div 
        className="absolute inset-6 bg-indigo-950/25 rounded-[38px] sm:rounded-[55px] filter blur-3xl -z-10"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [20, -20]),
          y: useTransform(mouseY, [-0.5, 0.5], [20, -20]),
          scale: 0.95
        }}
      />

      {/* Main 3D Phone Body */}
      <motion.div 
        style={{ 
          rotateX: rotX, 
          rotateY: rotY,
          y: translateY,
          transformStyle: "preserve-3d"
        }}
        className="absolute inset-0 bg-slate-900 border-2 sm:border-4 border-slate-700/80 rounded-[38px] sm:rounded-[55px] shadow-2xl p-1.5 sm:p-3 flex flex-col overflow-hidden ring-2 sm:ring-4 ring-slate-950/90 ring-offset-1 sm:ring-offset-2 ring-offset-slate-100/10 z-10"
      >
        
        {/* Antenna bands and physical volume keys with depth */}
        <div className="absolute top-16 -left-[4px] w-[4px] h-12 bg-slate-800 rounded-r" style={{ transform: "translateZ(5px)" }} />
        <div className="absolute top-32 -left-[4px] w-[4px] h-10 bg-slate-800 rounded-r" style={{ transform: "translateZ(5px)" }} />
        <div className="absolute top-24 -right-[4px] w-[4px] h-16 bg-slate-800 rounded-l" style={{ transform: "translateZ(5px)" }} />

        {/* Screen Container with rounded corners and 3D depth */}
        <div 
          className="relative w-full h-full bg-[#0a051d] rounded-[32px] sm:rounded-[45px] overflow-hidden flex flex-col justify-between p-3 sm:p-4 border border-slate-950/20 shadow-inner"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* Looping video of Ayat Móviles with poster fallback */}
          <video 
            ref={videoRef}
            src="/ayat_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="https://lh3.googleusercontent.com/d/1-S2VPhkJxbV03CylkAMXL1NLpns78ILE"
            className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none rounded-[30px] sm:rounded-[43px]"
          >
            {/* Fallback image in case browser blocks video or cannot load it */}
            <img 
              src="https://lh3.googleusercontent.com/d/1-S2VPhkJxbV03CylkAMXL1NLpns78ILE" 
              alt="Ayat Móviles Flyer" 
              className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none rounded-[30px] sm:rounded-[43px]"
              referrerPolicy="no-referrer"
            />
          </video>

          {/* DYNAMIC SHINE / GLARE OVERLAY LAYER */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) => `radial-gradient(circle 280px at ${gx} ${gy}, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 80%)`
              ),
              opacity: glareOpacity
            }}
          />

          {/* STATUS BAR (Flat/Low depth layer) */}
          <div 
            className="relative z-20 flex justify-between items-center text-white/90 text-[11px] font-bold px-4 pt-1 pb-2 font-sans"
            style={{ transform: "translateZ(10px)" }}
          >
            <span>12:30</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold bg-white/20 text-white/90 px-1.5 py-0.5 rounded-full">5G</span>
              <Wifi className="w-3.5 h-3.5 text-white/90" />
              <Battery className="w-4 h-4 text-white/90" />
            </div>
          </div>

          {/* INTERACTIVE DYNAMIC ISLAND - High Depth layer */}
          <div 
            className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center px-2 sm:px-4"
            style={{ transform: "translateZ(38px)", transformStyle: "preserve-3d" }}
          >
            <motion.div 
              layout
              onClick={() => setIsIslandExpanded(!isIslandExpanded)}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`bg-black/90 backdrop-blur-md text-white border border-white/10 cursor-pointer shadow-lg shadow-black/30 flex items-center select-none overflow-hidden ${
                isIslandExpanded 
                  ? "rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 w-full" 
                  : "rounded-full py-1 px-2.5 sm:py-2 sm:px-3.5 gap-1.5 sm:gap-2 w-auto min-w-[85px] sm:min-w-[110px]"
              }`}
            >
              <AnimatePresence mode="wait">
                {!isIslandExpanded ? (
                  /* COMPRESSED MODE */
                  <motion.div 
                    key="compressed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between w-full gap-1.5 sm:gap-2"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 -ml-2 sm:-ml-3" />
                      <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-indigo-400 fill-indigo-400 animate-pulse" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-black tracking-widest font-mono text-indigo-200">AYAT IA</span>
                  </motion.div>
                ) : (
                  /* EXPANDED (DECOMPRESSED) MODE */
                  <motion.div 
                    key="expanded"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col text-left"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5 sm:pb-2 mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-[8px] sm:text-[9px] font-bold bg-indigo-600 px-1.5 py-0.5 sm:px-2 rounded-full text-white tracking-widest font-mono">
                          {ads[activeAd].badge}
                        </span>
                        <span className="text-[8px] sm:text-[10px] text-slate-400 font-mono">Notificación</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsIslandExpanded(false);
                        }}
                        className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
  
                    <div className="py-0.5 sm:py-1">
                      <h4 className="text-[10px] sm:text-xs font-bold text-white flex items-center gap-1 sm:gap-1.5">
                        {ads[activeAd].title}
                      </h4>
                      <p className="text-[9px] sm:text-[11px] text-indigo-200 font-medium mt-0.5 leading-tight">
                        {ads[activeAd].desc}
                      </p>
                      <p className="text-[8px] sm:text-[10px] text-slate-400 mt-1 leading-snug">
                        {ads[activeAd].detail}
                      </p>
                    </div>
  
                    <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[7px] sm:text-[9px] text-slate-500 font-mono">[ Toca para comprimir ]</span>
                      <button
                        onClick={handleNextAd}
                        className="text-[8px] sm:text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 cursor-pointer"
                      >
                        Siguiente anuncio →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Empty spacer to reserve central visual area for the flyer */}
          <div className="flex-1 min-h-0 z-10 pointer-events-none" />

          {/* PHYSICAL BOTTOM INDICATOR BAR */}
          <div className="w-32 h-1 bg-white/70 rounded-full mx-auto mt-2 shrink-0 z-20" style={{ transform: "translateZ(10px)" }} />

        </div>
      </motion.div>
    </div>
  );
}
