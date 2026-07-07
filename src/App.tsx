import React, { useState, useEffect } from "react";
import { 
  Smartphone, 
  Shield, 
  Truck, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight, 
  ArrowUp,
  Star, 
  Award, 
  Zap, 
  CheckCircle2, 
  Home, 
  ShoppingBag, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Wrench,
  Check,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThreeSmartphone from "./components/ThreeSmartphone";
import BackgroundShader from "./components/BackgroundShader";
import ChatBot from "./components/ChatBot";
import FAQSection from "./components/FAQSection";
import LegalManager from "./components/LegalManager";
import InteractiveMap from "./components/InteractiveMap";
import VisitorCounter from "./components/VisitorCounter";
import CinemaSplashLoader from "./components/CinemaSplashLoader";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("inicio");
  const [legalModal, setLegalModal] = useState<"aviso" | "privacidad" | "cookies" | null>(null);
  const [selectedReparacion, setSelectedReparacion] = useState("pantalla");
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // States for Interactive Budget Calculator
  const [calcBrand, setCalcBrand] = useState("apple");
  const [calcModel, setCalcModel] = useState("iphone13");
  const [calcIssue, setCalcIssue] = useState("pantalla");
  const [calcUrgency, setCalcUrgency] = useState(1);

  // States for Interactive Footer Features
  const [footerRating, setFooterRating] = useState<number | null>(null);
  const [footerRatingSubmitted, setFooterRatingSubmitted] = useState(false);
  const [footerQuestion, setFooterQuestion] = useState("");

  // States for Interactive WhatsApp Section
  const [whatsAppText, setWhatsAppText] = useState("Hola AYAT Móviles, me gustaría consultar sobre un servicio de reparación.");
  const [whatsAppActivePreset, setWhatsAppActivePreset] = useState(0);

  // Set up reveal animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".reveal-on-scroll");
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reviews = [
    {
      author: "MASI Group",
      rating: 5,
      avatar: "M",
      date: "Hace 2 semanas",
      content: "Excelente trato y gran profesionalidad. Repararon mi móvil en un tiempo récord y a un precio muy competitivo. Totalmente recomendables en Zumarraga."
    },
    {
      author: "Olatz Lopez",
      rating: 5,
      avatar: "O",
      date: "Hace 1 mes",
      content: "Muy amables y eficientes. El servicio de Punto Pack funciona genial, siempre que tengo que enviar o recoger un paquete voy allí sin dudarlo."
    },
    {
      author: "LOURDES VIÑUELA",
      rating: 5,
      avatar: "L",
      date: "Hace 2 meses",
      content: "Me asesoraron muy bien para comprar mi nuevo teléfono. Tienen mucha variedad de accesorios y se nota que conocen bien los productos. Buen servicio post-venta."
    }
  ];

  const triggerChat = () => {
    const btn = document.getElementById("chat-toggle-btn");
    if (btn) {
      btn.click();
    }
  };

  if (showSplash) {
    return <CinemaSplashLoader onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfbfe] via-[#faf9ff] to-[#f5f3ff] text-slate-900 font-sans flex flex-col relative overflow-x-hidden">
      {/* Premium Dynamic Background Shader */}
      <BackgroundShader />

      {/* Floating Navigation Dynamic Island Backdrop */}
      {isNavExpanded && (
        <div 
          className="fixed inset-0 bg-slate-950/10 backdrop-blur-[2px] z-40 pointer-events-auto transition-all duration-300"
          onClick={() => setIsNavExpanded(false)}
        />
      )}

      {/* Floating Navigation Dynamic Island */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 flex justify-center pointer-events-none">
        <motion.div
          layout
          onClick={() => {
            if (!isNavExpanded) setIsNavExpanded(true);
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className={`bg-white/40 backdrop-blur-md border border-slate-200/40 shadow-sm flex flex-col justify-center overflow-hidden transition-all duration-300 pointer-events-auto ${
            isNavExpanded 
              ? "bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-5 lg:p-6 w-full shadow-lg" 
              : "rounded-full py-2 px-4 h-[44px] cursor-pointer w-[210px] sm:w-[220px] hover:bg-white/60"
          }`}
        >
          <AnimatePresence mode="wait">
            {!isNavExpanded ? (
              /* COMPRESSED NAV ISLAND */
              <motion.div
                key="collapsed-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between w-full h-full select-none"
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" 
                    alt="AYAT MÓVILES" 
                    className="w-10 h-10 object-contain" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-black tracking-widest font-display text-slate-900">AYAT MÓVILES</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <span className="text-[9px] font-bold text-slate-700 font-mono tracking-wider">MENÚ</span>
                </div>
              </motion.div>
            ) : (
              /* EXPANDED NAV ISLAND */
              <motion.div
                key="expanded-nav"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div className="flex items-center justify-between w-full lg:w-auto">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" 
                      alt="AYAT MÓVILES" 
                      className="w-16 h-16 object-contain transition-transform duration-500 hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xl font-black tracking-tight text-slate-900 font-display">AYAT MÓVILES</span>
                  </div>
                  {/* Mobile close button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsNavExpanded(false);
                    }}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors lg:hidden cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Menu Links */}
                <nav className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-4 text-sm font-medium text-slate-500 w-full lg:w-auto">
                  <a 
                    href="#inicio" 
                    onClick={(e) => {
                      setActiveTab("inicio");
                      setIsNavExpanded(false);
                    }}
                    className={`transition-all duration-300 py-2 px-4 rounded-full text-left lg:text-center ${
                      activeTab === "inicio" 
                        ? "bg-indigo-50 text-indigo-700 font-bold shadow-inner" 
                        : "hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                  >
                    Inicio
                  </a>
                  <a 
                    href="#servicios" 
                    onClick={(e) => {
                      setActiveTab("servicios");
                      setIsNavExpanded(false);
                    }}
                    className={`transition-all duration-300 py-2 px-4 rounded-full text-left lg:text-center ${
                      activeTab === "servicios" 
                        ? "bg-indigo-50 text-indigo-700 font-bold shadow-inner" 
                        : "hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                  >
                    Servicios
                  </a>
                  <a 
                    href="#valoraciones" 
                    onClick={(e) => {
                      setActiveTab("valoraciones");
                      setIsNavExpanded(false);
                    }}
                    className={`transition-all duration-300 py-2 px-4 rounded-full text-left lg:text-center ${
                      activeTab === "valoraciones" 
                        ? "bg-indigo-50 text-indigo-700 font-bold shadow-inner" 
                        : "hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                  >
                    Reseñas
                  </a>
                  <a 
                    href="#faq" 
                    onClick={(e) => {
                      setActiveTab("faq");
                      setIsNavExpanded(false);
                    }}
                    className={`transition-all duration-300 py-2 px-4 rounded-full text-left lg:text-center ${
                      activeTab === "faq" 
                        ? "bg-indigo-50 text-indigo-700 font-bold shadow-inner" 
                        : "hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                  >
                    Dudas
                  </a>
                  <a 
                    href="#contacto" 
                    onClick={(e) => {
                      setActiveTab("contacto");
                      setIsNavExpanded(false);
                    }}
                    className={`transition-all duration-300 py-2 px-4 rounded-full text-left lg:text-center ${
                      activeTab === "contacto" 
                        ? "bg-indigo-50 text-indigo-700 font-bold shadow-inner" 
                        : "hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                  >
                    Contacto
                  </a>
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                  <a 
                    href="https://wa.me/34632447979" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full lg:w-auto text-center justify-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs lg:text-sm font-bold transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md shadow-indigo-100 flex items-center gap-2 rounded-full uppercase tracking-wider"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    WhatsApp
                  </a>
                  {/* Desktop compress button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsNavExpanded(false);
                    }}
                    className="hidden lg:flex p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    title="Comprimir"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Decorative Elegant Soft Ambient Blobs (Apple Style) - Replaced harsh purple grids */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-300/55 blur-[130px] animate-pulse" style={{ animationDuration: "14s" }} />
        <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-300/50 blur-[160px] animate-pulse" style={{ animationDuration: "18s" }} />
        <div className="absolute top-[35%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-blue-200/50 blur-[140px] animate-pulse" style={{ animationDuration: "22s" }} />
      </div>

      {/* Main Grid Wrapper */}
      <main className="flex-1 flex flex-col z-10 w-[95%] max-w-7xl mx-auto gap-4 mt-20 sm:mt-6 mb-4 sm:mb-6 sm:gap-6">
        
        {/* Hero Section (Geometric Split with Premium Curved Panels) */}
        <section id="inicio" className="w-full flex flex-col gap-3 sm:gap-4 scroll-mt-20">
          
          {/* Top Row: Hero Text side-by-side with 3D Phone simulator */}
          <div className="w-full">
            
            {/* Unified Bento Card with premium ambient lighting & subtle micro-grid texture */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between p-5 xs:p-6 sm:p-10 md:p-12 relative bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.03)] rounded-[32px] overflow-hidden group transition-all duration-500 hover:shadow-[0_30px_70px_rgba(99,102,241,0.06)] hover:border-slate-200">
              
              {/* Subtle background grids & radial glows to add depth */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* Micro-dot grid */}
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#5b3ee3 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
                {/* Soft violet radial light */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/15 transition-all duration-700" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/15 transition-all duration-700" />
              </div>

              {/* Left Column (Text & CTAs): takes full width on xs, side-by-side from sm: */}
              <div className="w-full sm:w-[58%] lg:w-[60%] flex flex-col justify-center relative z-10">
                <span className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50/80 text-indigo-700 text-xs font-mono font-bold uppercase tracking-wider mb-5 sm:mb-7 rounded-full border border-indigo-100/60 self-start shadow-sm relative overflow-hidden group/badge">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />
                  <Sparkles className="w-3.5 h-3.5 fill-indigo-200 text-indigo-600 animate-pulse" />
                  Soporte de Vanguardia • Certificado 2026
                </span>
                
                <h1 className="text-4xl xs:text-5xl sm:text-5.5xl md:text-6.5xl lg:text-7.5xl xl:text-8xl font-extrabold leading-[1.08] tracking-tight text-slate-900 mb-6 sm:mb-10 font-display">
                  Tu tecnología con<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Ayat Móviles.</span>
                </h1>
                
                <p className="hidden sm:block text-base sm:text-lg md:text-xl text-slate-500 max-w-lg mb-8 sm:mb-12 leading-relaxed font-sans font-medium">
                  Especialistas líderes en telefonía móvil, soporte informático exprés y servicios logísticos en Zumarraga. Reparación garantizada, venta certificada y atención premium personalizada.
                </p>
                
                <div className="flex flex-wrap gap-3.5">
                  <a 
                    href="#servicios" 
                    onClick={() => setActiveTab("servicios")}
                    className="px-6 py-3.5 sm:px-8 sm:py-4 bg-slate-950 text-white font-bold hover:bg-indigo-650 hover:shadow-[0_10px_25px_rgba(99,102,241,0.25)] transition-all duration-300 hidden sm:flex items-center gap-2.5 uppercase tracking-wider text-xs sm:text-sm rounded-full cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    Explorar Servicios
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a 
                    href="#contacto"
                    onClick={() => setActiveTab("contacto")}
                    className="px-4 py-2 sm:px-8 sm:py-4 bg-slate-50 hover:bg-slate-100 hover:text-indigo-750 border border-slate-250 text-slate-800 font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 uppercase tracking-wider text-[10.5px] sm:text-sm rounded-full cursor-pointer hover:scale-[1.02] active:scale-95 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                    Contacto Directo
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive 3D Device Mockup */}
              <div className="w-full sm:w-[42%] lg:w-[40%] mt-6 sm:mt-0 flex flex-col justify-center items-center relative z-10 shrink-0 pb-4 sm:pb-0">
                <div className="w-full transition-transform duration-500 group-hover:scale-[1.03]">
                  <ThreeSmartphone />
                </div>
              </div>
            </div>

          </div>

          {/* Premium Trust Badges Horizontal Panel - Compact & Responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-3 sm:mt-6">
            {[
              { icon: Clock, title: "Reparación Exprés", desc: "La mayoría listas en 1h", glow: "group-hover:text-amber-500" },
              { icon: Shield, title: "Garantía Real 6m", desc: "En piezas y mano de obra", glow: "group-hover:text-emerald-500" },
              { icon: Truck, title: "Punto Pack Oficial", desc: "Envíos con Mondial Relay", glow: "group-hover:text-indigo-500" },
              { icon: CheckCircle2, title: "Protección LOPD", desc: "Datos 100% confidenciales", glow: "group-hover:text-purple-500" },
            ].map((badge, idx) => {
              const IconComponent = badge.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.04)] hover:bg-white hover:border-slate-300/80 cursor-default"
                >
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all duration-300 shrink-0">
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-650 transition-colors ${badge.glow} shrink-0`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-display tracking-tight group-hover:text-slate-950 transition-colors">{badge.title}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-sans font-medium mt-0.5 leading-snug">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* Services Section (Elite Bento Grid Layout) */}
        <motion.section 
          id="servicios" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 md:py-16 px-4 max-w-7xl mx-auto w-full border-t border-slate-200/60 mt-3 relative"
        >
          
          {/* Section Header */}
          <div className="mb-8 md:mb-10 max-w-3xl">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-3 font-mono">PORTFOLIO DE SERVICIOS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Soluciones Integrales de Máxima Calidad
            </h2>
            <p className="text-slate-500 mt-4 font-sans text-sm sm:text-base leading-relaxed font-medium">
              Cubrimos todas tus necesidades en telefonía móvil, soporte informático y paquetería express. Equipamiento de laboratorio de última generación, repuestos Grado AAA y un equipo técnico altamente cualificado.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Tienda de Móviles & Accesorios (Large, col-span-2) */}
            <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-50/20 via-white to-purple-50/10 border border-slate-200/70 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_15px_35px_rgba(99,102,241,0.05)] hover:border-indigo-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="p-3 bg-indigo-50 border border-indigo-100/50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-indigo-700 font-mono tracking-wider uppercase border border-indigo-200/50 bg-indigo-50/60 px-3 py-1 rounded-full font-bold">
                    Venta & Reparación Exprés
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  <div className="sm:col-span-7 space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
                      Tienda de Móviles & Accesorios
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                      Disponemos de smartphones premium nuevos y reacondicionados totalmente verificados bajo estrictos estándares. Ofrecemos el surtido más completo de fundas de alta resistencia, protectores templados con instalación gratuita y cargadores certificados de carga ultra rápida.
                    </p>
                  </div>
                  
                  {/* Visual Checklist for depth */}
                  <div className="sm:col-span-5 bg-white/60 border border-slate-200/40 p-4 rounded-2xl space-y-2.5 font-mono text-[11px] text-slate-650 shadow-inner">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
                      <span>Pantallas Grado AAA Certificadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
                      <span>Baterías de Alta Densidad</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
                      <span>Accesorios Multi-Marca</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
                      <span>Garantía por Escrito de 6m</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">Soporte Apple, Samsung, Xiaomi y más</span>
                <a 
                  href="#contacto"
                  onClick={() => setActiveTab("contacto")}
                  className="text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:text-indigo-600 transition-colors duration-300"
                >
                  Consultar Stock <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Card 2: Punto Pack Oficial Mondial Relay (Col-span 1) */}
            <div className="md:col-span-1 bg-gradient-to-br from-emerald-50/20 via-white to-emerald-50/5 border border-slate-200/70 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_15px_35px_rgba(16,185,129,0.05)] hover:border-emerald-200">
              <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="p-3 bg-emerald-50 border border-emerald-100/50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="text-emerald-700 font-mono text-[10px] font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Activo
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-display tracking-tight">
                    Punto Pack Oficial
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    Socio logístico oficial de Mondial Relay en Zumarraga. Realiza tus envíos nacionales e internacionales de forma ágil y recoge tus compras online de manera 100% segura en nuestro amplio horario comercial.
                  </p>
                </div>

                {/* Simulated Shipment Path Visual */}
                <div className="bg-slate-50/80 border border-slate-200/40 p-3 rounded-xl flex items-center justify-between relative overflow-hidden">
                  <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-dashed border-t border-dashed border-emerald-300 -translate-y-1/2 z-0" />
                  <div className="z-10 bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-mono font-bold text-slate-500">Origen</div>
                  <Truck className="w-4 h-4 text-emerald-600 z-10 bg-emerald-100/80 rounded-full p-0.5 animate-[bounce_1.5s_infinite]" />
                  <div className="z-10 bg-emerald-600 text-white p-1.5 rounded-lg text-[10px] font-mono font-bold">Ayat Móviles</div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-6 text-xs text-slate-400 font-mono">
                Horario: L-S (10:00 - 14:00, 16:30 - 20:30)
              </div>
            </div>

            {/* Card 3: Compra Presencial (Col-span 1) */}
            <div className="bg-white border border-slate-200/70 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_15px_35px_rgba(15,23,42,0.03)] hover:border-slate-350">
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 w-fit">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 font-display tracking-tight">
                      Compra Presencial
                    </h3>
                    <span className="text-[9px] text-slate-500 font-mono uppercase bg-slate-100 px-2 py-0.5 rounded-full">En Tienda</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    Ven y experimenta los terminales insitu antes de decidir. Nuestro asesoramiento experto está diseñado para adaptarse honestamente a tus necesidades y presupuesto reales, sin sorpresas.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-6">
                <a 
                  href="#contacto"
                  onClick={() => setActiveTab("contacto")}
                  className="text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:text-indigo-600 transition-colors duration-300"
                >
                  Visítanos en Zumarraga <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Card 4: Soporte a Domicilio (Col-span 1) */}
            <div className="bg-white border border-slate-200/70 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_15px_35px_rgba(15,23,42,0.03)] hover:border-slate-350">
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 w-fit">
                  <Home className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 font-display tracking-tight">
                      Soporte a Domicilio
                    </h3>
                    <span className="text-[9px] text-slate-500 font-mono uppercase bg-slate-100 px-2 py-0.5 rounded-full">Zona Local</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    Ofrecemos asistencia técnica especial y entrega/recogida de terminales directamente a domicilio en el entorno para personas con movilidad reducida o con necesidades específicas de agenda.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-6 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Zumarraga y Urretxu</span>
                <a 
                  href="#contacto"
                  onClick={() => setActiveTab("contacto")}
                  className="text-indigo-600 font-bold uppercase tracking-wider hover:text-indigo-750 transition-colors"
                >
                  Pedir Cita
                </a>
              </div>
            </div>

            {/* Card 5: Privacidad & Datos Seguros (Col-span 1) */}
            <div className="bg-white border border-slate-200/70 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_15px_35px_rgba(15,23,42,0.03)] hover:border-slate-350">
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 w-fit">
                  <Shield className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 font-display tracking-tight">
                      Privacidad Asegurada
                    </h3>
                    <span className="text-[9px] text-emerald-700 font-mono uppercase bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Certificado LOPD</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    Tu intimidad y seguridad son innegociables. Aplicamos estrictos protocolos de confidencialidad de datos personales durante todo el proceso de diagnóstico y reparación de tu dispositivo.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-6 flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-bold font-mono">Datos 100% Protegidos</span>
                <a 
                  href="#faq"
                  onClick={() => setActiveTab("faq")}
                  className="text-slate-950 font-bold uppercase tracking-wider hover:text-indigo-600 transition-colors"
                >
                  Saber Más
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Interactive Budget Calculator Section - Minimalist & Editorial Style */}
        <motion.section 
          id="calculadora"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 px-6 sm:px-10 bg-gradient-to-b from-slate-50 to-white border border-slate-200/60 rounded-[32px] max-w-7xl mx-auto w-full relative shadow-[0_20px_50px_rgba(15,23,42,0.02)]"
        >
          
          <div className="max-w-3xl mb-8 relative z-10">
            <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-100/60 px-3 py-1.5 rounded-full shadow-sm">
              CALCULADORA DE PRESUPUESTOS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mt-5 tracking-tight">Simulador de Reparación en Vivo</h3>
            <p className="text-sm sm:text-base text-slate-500 mt-2.5 leading-relaxed font-medium">
              Selecciona tu marca, elige tu modelo e indica el tipo de daño para obtener una estimación de presupuesto transparente al instante con mano de obra y piezas AAA incluidas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative z-10">
            
            {/* Left Panel: Selectors (7 cols) */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* 1. Brand selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold text-slate-550 uppercase tracking-widest">1. Selecciona la Marca</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "apple", label: "Apple iPhone" },
                    { id: "samsung", label: "Samsung" },
                    { id: "xiaomi", label: "Xiaomi / Redmi" },
                    { id: "otros", label: "Otras Marcas" }
                  ].map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => {
                        setCalcBrand(brand.id);
                        // Reset model to default for the brand
                        if (brand.id === "apple") setCalcModel("iphone13");
                        else if (brand.id === "samsung") setCalcModel("s22");
                        else if (brand.id === "xiaomi") setCalcModel("redminote12");
                        else setCalcModel("generico");
                      }}
                      className={`py-3.5 px-4 rounded-2xl border text-center font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer ${
                        calcBrand === brand.id
                          ? "bg-slate-950 text-white border-slate-950 shadow-md scale-[1.02]"
                          : "bg-white text-slate-650 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <span className="tracking-wide">{brand.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Model selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold text-slate-550 uppercase tracking-widest">2. Elige el Modelo</label>
                <div className="relative">
                  <select
                    value={calcModel}
                    onChange={(e) => setCalcModel(e.target.value)}
                    className="w-full bg-white border border-slate-200/85 rounded-2xl p-4 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-550 focus:ring-1 focus:ring-indigo-200/40 appearance-none cursor-pointer shadow-sm transition-all"
                  >
                    {calcBrand === "apple" && (
                      <>
                        <option value="iphone14pro">iPhone 14 / 14 Pro / 14 Pro Max</option>
                        <option value="iphone13">iPhone 13 / 13 Pro / 13 Pro Max</option>
                        <option value="iphone12">iPhone 12 / 12 Pro / 12 Pro Max</option>
                        <option value="iphone11">iPhone 11 / 11 Pro / 11 Pro Max</option>
                        <option value="iphonex">iPhone X / XR / XS / XS Max</option>
                      </>
                    )}
                    {calcBrand === "samsung" && (
                      <>
                        <option value="s23ultra">Galaxy S23 / S23+ / S23 Ultra</option>
                        <option value="s22">Galaxy S22 / S22+ / S22 Ultra</option>
                        <option value="s21">Galaxy S21 / S21+ / S21 Ultra</option>
                        <option value="a54">Galaxy A54 / A53 / A34</option>
                        <option value="a14">Galaxy A14 / A13 / A12</option>
                      </>
                    )}
                    {calcBrand === "xiaomi" && (
                      <>
                        <option value="xiaomi13">Xiaomi 13 / 13 Lite / 13 Pro</option>
                        <option value="redminote12">Redmi Note 12 / 12 Pro</option>
                        <option value="redminote11">Redmi Note 11 / 11 Pro</option>
                        <option value="pocox5">Poco X5 / X4 / F5 Pro</option>
                      </>
                    )}
                    {calcBrand === "otros" && (
                      <>
                        <option value="generico">Modelo Genérico / Oppo / Huawei / RealMe</option>
                      </>
                    )}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              {/* 3. Issue selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold text-slate-550 uppercase tracking-widest">3. Tipo de Daño / Incidencia</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "pantalla", label: "Pantalla Rota / Sin Imagen", icon: Smartphone, desc: "Panel táctil completo, brillo calibrado" },
                    { id: "bateria", label: "Batería Degradada / No Carga", icon: Zap, desc: "Células AAA de alta densidad" },
                    { id: "carga", label: "Puerto de Carga USB / Lightning", icon: Wrench, desc: "Limpieza profunda o reemplazo flex" },
                    { id: "camara", label: "Cámara / Cristal Trasero", icon: Shield, desc: "Lente exterior de zafiro" },
                    { id: "humedad", label: "Humedad / Mojado por Agua", icon: HelpCircle, desc: "Limpieza mediante ultrasonidos" }
                  ].map((issue) => {
                    const IssueIcon = issue.icon;
                    return (
                      <button
                        key={issue.id}
                        onClick={() => setCalcIssue(issue.id)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer group ${
                          calcIssue === issue.id
                            ? "bg-slate-950 text-white border-slate-950 shadow-md scale-[1.01]"
                            : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                          calcIssue === issue.id
                            ? "bg-white/10 text-white"
                            : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100"
                        }`}>
                          <IssueIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs font-display uppercase tracking-wider leading-none mb-1.5">{issue.label}</h4>
                          <p className={`text-[11px] leading-snug font-sans font-medium ${
                            calcIssue === issue.id ? "text-slate-300" : "text-slate-450"
                          }`}>{issue.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Service Urgency Slider */}
              <div className="pt-3 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-mono font-bold text-slate-550 uppercase tracking-widest">4. Urgencia del servicio</label>
                  <span className="text-xs font-bold text-indigo-700 font-mono bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full shadow-sm">
                    {calcUrgency === 1 ? "Estándar (Sin Recargo)" : calcUrgency === 2 ? "Exprés (+10€)" : "Súper Urgente (+20€)"}
                  </span>
                </div>
                <div className="relative mt-4 flex items-center px-1">
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    value={calcUrgency}
                    onChange={(e) => setCalcUrgency(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-950"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-2.5 px-1 font-bold">
                  <span>Estándar (24h)</span>
                  <span>Exprés (2h)</span>
                  <span>Urgente (30m)</span>
                </div>
              </div>

            </div>

            {/* Right Panel: Receipt Display (5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-[24px] flex-1 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_40px_rgba(15,23,42,0.03)] group/receipt">
                
                {/* Visual stamp on background */}
                <div className="absolute top-24 right-4 rotate-12 opacity-[0.03] select-none pointer-events-none transition-transform duration-700 group-hover/receipt:rotate-6">
                  <div className="border-4 border-dashed border-indigo-700 p-2 font-mono text-2xl font-black rounded-lg text-indigo-700">
                    AYAT OK
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-1">PRESUPUESTO ESTIMADO</span>
                      <h4 className="font-extrabold text-lg sm:text-xl font-display text-slate-900 tracking-tight">
                        {calcBrand === "apple" ? "Apple iPhone" : calcBrand === "samsung" ? "Samsung Galaxy" : calcBrand === "xiaomi" ? "Xiaomi / Redmi" : "Dispositivo"}
                      </h4>
                      <p className="text-[10px] text-slate-450 mt-1.5 font-mono uppercase tracking-wider font-bold">
                        {calcBrand === "apple" && calcModel === "iphone14pro" && "Series 14 Pro"}
                        {calcBrand === "apple" && calcModel === "iphone13" && "Series 13"}
                        {calcBrand === "apple" && calcModel === "iphone12" && "Series 12"}
                        {calcBrand === "apple" && calcModel === "iphone11" && "Series 11"}
                        {calcBrand === "apple" && calcModel === "iphonex" && "Series X / XR"}
                        {calcBrand === "samsung" && calcModel === "s23ultra" && "S23 Ultra / Pro"}
                        {calcBrand === "samsung" && calcModel === "s22" && "Series S22"}
                        {calcBrand === "samsung" && calcModel === "s21" && "Series S21"}
                        {calcBrand === "samsung" && calcModel === "a54" && "Galaxy A54/A53"}
                        {calcBrand === "samsung" && calcModel === "a14" && "Galaxy A14/A13"}
                        {calcBrand === "xiaomi" && calcModel === "xiaomi13" && "Xiaomi 13 / Pro"}
                        {calcBrand === "xiaomi" && calcModel === "redminote12" && "Redmi Note 12"}
                        {calcBrand === "xiaomi" && calcModel === "redminote11" && "Redmi Note 11"}
                        {calcBrand === "xiaomi" && calcModel === "pocox5" && "Poco X5 / F5"}
                        {calcBrand === "otros" && "Modelo General"}
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-bold uppercase">
                      Estimación
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="py-6 border-y border-dashed border-slate-200 my-6 flex flex-col justify-center items-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5 font-bold">Total Estimado</span>
                    <div className="flex items-baseline">
                      <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter">
                        {(() => {
                          const basePrices: Record<string, Record<string, number>> = {
                            pantalla: { apple: 89, samsung: 79, xiaomi: 59, otros: 49 },
                            bateria: { apple: 39, samsung: 35, xiaomi: 29, otros: 25 },
                            carga: { apple: 35, samsung: 29, xiaomi: 25, otros: 25 },
                            camara: { apple: 49, samsung: 39, xiaomi: 29, otros: 29 },
                            humedad: { apple: 45, samsung: 40, xiaomi: 35, otros: 35 }
                          };
                          const prices = basePrices[calcIssue] || { apple: 45, samsung: 40, xiaomi: 35, otros: 35 };
                          let total = prices[calcBrand] || 35;
                          // Add extra cost for urgency
                          if (calcUrgency === 2) total += 10;
                          else if (calcUrgency === 3) total += 20;
                          return total;
                        })()}
                      </span>
                      <span className="text-2xl font-bold ml-1 text-slate-800">€</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3 text-center leading-normal font-sans font-medium">Mano de obra, repuesto Grado AAA y tasas locales incluidas.</p>
                  </div>

                  <div className="space-y-4 font-sans text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Tiempo estimado:</span>
                      <span className="font-bold text-slate-700">
                        {calcUrgency === 3 && "30 - 45 minutos (Súper Urgente)"}
                        {calcUrgency === 2 && "1 - 2 horas (Exprés)"}
                        {calcUrgency === 1 && (
                          calcIssue === "pantalla" ? "1 - 2 horas" :
                          calcIssue === "bateria" ? "30 - 45 minutos" :
                          calcIssue === "carga" ? "1 hora" :
                          calcIssue === "camara" ? "1 - 2 horas" :
                          "24 horas (Test de secado)"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Garantía real:</span>
                      <span className="font-bold text-slate-700">
                        {calcIssue === "humedad" ? "Garantía de limpieza" : "6 meses de Garantía"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Tus datos personales:</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide">
                        <CheckCircle2 className="w-3 h-3 fill-emerald-150 text-emerald-600" /> Protegidos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <a
                    href={(() => {
                      const brandName = calcBrand === "apple" ? "Apple iPhone" : calcBrand === "samsung" ? "Samsung" : calcBrand === "xiaomi" ? "Xiaomi" : "Dispositivo";
                      const issueName = calcIssue === "pantalla" ? "reparación de pantalla rota" : calcIssue === "bateria" ? "cambio de batería" : calcIssue === "carga" ? "puerto de carga" : calcIssue === "camara" ? "cámara o cristal trasero" : "limpieza por humedad";
                      const urgencyName = calcUrgency === 3 ? "Súper Urgente" : calcUrgency === 2 ? "Exprés" : "Normal";
                      const textMsg = `Hola AYAT Móviles, me gustaría reservar cita para un presupuesto de ${issueName} (${urgencyName}) en un ${brandName}.`;
                      return `https://wa.me/34632447979?text=${encodeURIComponent(textMsg)}`;
                    })()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest text-center rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(16,185,129,0.15)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.25)] hover:scale-[1.01] cursor-pointer"
                  >
                    <Phone className="w-4 h-4 fill-white text-emerald-600" />
                    Reservar Cita WhatsApp
                  </a>

                  <button
                    onClick={triggerChat}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-slate-800 hover:scale-[1.01]"
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    Preguntar por Chatbot AI
                  </button>
                </div>

              </div>
            </div>

          </div>
        </motion.section>

        {/* Dedicated WhatsApp Interactive Section */}
        <motion.section 
          id="whatsapp" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-10 px-6 bg-slate-50 border border-slate-200 rounded-3xl max-w-7xl mx-auto w-full relative overflow-hidden my-6"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Context & Presets */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Soporte de WhatsApp Online
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display leading-tight">
                Habla con Nosotros por WhatsApp al Instante
              </h2>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                ¿Tienes alguna duda sobre tu reparación, accesorios, stock de teléfonos móviles o necesitas información sobre Mondial Relay / Punto Pack? Pulsa una de nuestras plantillas rápidas y te atenderemos en menos de 15 minutos en nuestro horario de atención habitual.
              </p>

              <div className="flex flex-wrap gap-3">
                <a 
                  href="#contacto"
                  onClick={() => setActiveTab("contacto")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 text-xs font-bold rounded-xl border border-indigo-200/60 transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 animate-bounce" />
                  ¿Prefieres venir a la tienda? Ver Horarios y Dirección Física
                </a>
              </div>

              {/* Presets Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono block mb-2">Selecciona un tema de consulta rápida:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 0,
                      title: "🔧 Reparación de Pantalla",
                      text: "Hola AYAT Móviles, me gustaría solicitar presupuesto y cita para cambiar la pantalla rota de mi teléfono. ¿Tenéis disponibilidad?",
                      short: "Pantalla Rota"
                    },
                    {
                      id: 1,
                      title: "🔋 Cambio de Batería",
                      text: "Hola AYAT Móviles, mi móvil tiene problemas de batería y se descarga rápido. ¿Cuánto costaría y cuánto se tarda en cambiarla?",
                      short: "Batería / Rendimiento"
                    },
                    {
                      id: 2,
                      title: "📦 Mondial Relay / Punto Pack",
                      text: "Hola AYAT Móviles, quería consultar si tenéis disponible para recoger un paquete de Mondial Relay a mi nombre.",
                      short: "Punto de recogida"
                    },
                    {
                      id: 3,
                      title: "💬 Smartphones y Accesorios",
                      text: "Hola AYAT Móviles, tengo interés en vuestro catálogo de smartphones reacondicionados y accesorios en tienda. ¿Me podéis informar?",
                      short: "Stock en tienda"
                    }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setWhatsAppActivePreset(preset.id);
                        setWhatsAppText(preset.text);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex flex-col justify-between h-24 ${
                        whatsAppActivePreset === preset.id
                          ? "bg-emerald-50 border-emerald-400 shadow-md text-emerald-950"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/55 text-slate-700"
                      }`}
                    >
                      <span className="font-bold text-xs font-display flex items-center gap-1.5">
                        {preset.title}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono mt-2 block overflow-hidden text-ellipsis whitespace-nowrap w-full">
                        {preset.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Operating details */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Respuesta: <strong className="text-slate-900 font-bold">&lt; 15 min</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Número Directo: <strong className="text-slate-900 font-bold">+34 632 447 979</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Servicio de Confianza</span>
                </div>
              </div>
            </div>

            {/* Right Column: Simulated Chat Device Mockup (Solid Matte, Minimalist) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] bg-white p-3 rounded-[40px] shadow-sm border border-slate-200 relative group overflow-hidden">
                
                {/* Chat Screen Container */}
                <div className="w-full bg-slate-50 rounded-[32px] overflow-hidden border border-slate-200/85 flex flex-col h-[410px] sm:h-[500px] relative font-sans">
                  
                  {/* Chat Header (Clean Slate-950) */}
                  <div className="bg-slate-950 text-white pt-6 pb-4 px-4 flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold font-display text-white relative shrink-0 overflow-hidden">
                        <img 
                          src="https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" 
                          alt="Ayat Móviles" 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs tracking-tight uppercase">AYAT MÓVILES</h4>
                        <span className="text-[10px] text-slate-400 block font-mono">Soporte Zumarraga</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Activo</span>
                    </div>
                  </div>

                  {/* Chat Wall (Solid White, No Textures) */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col bg-slate-50">
                    
                    {/* Timestamp bubble */}
                    <div className="mx-auto bg-slate-200/60 px-2.5 py-0.5 rounded text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                      Hoy
                    </div>

                    {/* Support message 1 */}
                    <div className="bg-white border border-slate-200/50 rounded-2xl rounded-tl-none p-3 max-w-[85%] text-[12px] text-slate-800 shadow-sm relative self-start">
                      <p className="leading-normal">
                        ¡Hola! Bienvenido a <strong>AYAT MÓVILES</strong> en Zumarraga. ¿En qué podemos ayudarte hoy?
                      </p>
                      <span className="text-[9px] text-slate-400 font-mono text-right block mt-1">10:00</span>
                    </div>

                    {/* Support message 2 */}
                    <div className="bg-white border border-slate-200/50 rounded-2xl rounded-tl-none p-3 max-w-[85%] text-[12px] text-slate-800 shadow-sm relative self-start">
                      <p className="leading-normal">
                        Si lo deseas, puedes editar la plantilla rápida a continuación para enviarnos tu consulta directa.
                      </p>
                      <span className="text-[9px] text-slate-400 font-mono text-right block mt-1">10:01</span>
                    </div>

                    {/* User interactive typing preview bubble (Clean black border bubble) */}
                    <div className="bg-slate-900 text-white rounded-2xl rounded-tr-none p-3 max-w-[85%] text-[12px] shadow-sm relative self-end mt-2">
                      <p className="leading-normal italic text-slate-200">
                        "{whatsAppText}"
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">Ahora</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-emerald-900" />
                      </div>
                    </div>

                  </div>

                  {/* Interactive Text Area & Action Button */}
                  <div className="p-3 bg-white border-t border-slate-200 flex flex-col gap-2 shrink-0">
                    <div className="relative">
                      <textarea
                        value={whatsAppText}
                        onChange={(e) => {
                          setWhatsAppActivePreset(-1); // custom input
                          setWhatsAppText(e.target.value);
                        }}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:outline-none rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-450 resize-none font-sans"
                      />
                    </div>
                    
                    <a
                      href={`https://wa.me/34632447979?text=${encodeURIComponent(whatsAppText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      Enviar por WhatsApp
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </motion.section>

        {/* Reviews & Testimonials Section - Minimalist & Editorial */}
        <motion.section 
          id="valoraciones" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-8 md:py-12 bg-white border border-slate-200/60 rounded-3xl max-w-7xl mx-auto w-full relative"
        >
          <div className="px-5 sm:px-8 md:px-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">OPINIONES VERIFICADAS</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">Lo que dicen nuestros clientes</h2>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0 text-xs font-mono text-slate-500">
                <span>Google Reviews:</span>
                <div className="flex text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                </div>
                <span className="font-bold text-slate-900">5.0 / 5</span>
              </div>
            </div>

            {/* Structured Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {reviews.map((rev, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50/50 border border-slate-200/60 p-6 flex flex-col justify-between rounded-2xl transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-3.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    
                    <p className="text-slate-600 text-xs sm:text-sm italic mb-5 leading-relaxed font-sans">
                      "{rev.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-slate-200/40 pt-4 mt-auto">
                    <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold text-xs rounded-full">
                      {rev.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{rev.author}</h4>
                      <span className="text-[9px] text-slate-400 font-mono block">{rev.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Interactive FAQ Section */}
        <FAQSection />

        {/* Info, Map & Contact Section with superb rounded layout - High Contrast */}
        <motion.section 
          id="contacto" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-4 max-w-7xl mx-auto w-full"
        >
          <div className="bg-white border border-slate-200 flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(15,23,42,0.06)]">
            
            {/* Interactive Map Column */}
            <div className="lg:w-1/2 min-h-[420px] lg:min-h-[500px] relative overflow-hidden flex flex-col">
              <InteractiveMap />
            </div>

            {/* Details & Horarios Column */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2 font-mono">DÓNDE ENCONTRARNOS</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display mb-8">
                Visita Nuestra Tienda
              </h2>

              <div className="space-y-6">
                
                {/* Dirección */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/55 backdrop-blur-md border border-white/60 flex items-center justify-center text-indigo-600 shrink-0 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Dirección</h4>
                    <p className="text-slate-800 text-sm font-semibold mt-1">Elizkale Kalea, 9, BAJO<br/>20700 Zumarraga, Gipuzkoa</p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/55 backdrop-blur-md border border-white/60 flex items-center justify-center text-indigo-600 shrink-0 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Teléfono de Soporte</h4>
                    <p className="text-indigo-600 text-lg font-bold mt-1">632 44 79 79</p>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/55 backdrop-blur-md border border-white/60 flex items-center justify-center text-indigo-600 shrink-0 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Horario de Apertura</h4>
                    <div className="space-y-2 text-xs font-mono text-slate-600">
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span>Lunes - Viernes</span>
                        <span className="font-semibold text-slate-900 bg-white/60 border border-white/50 shadow-sm px-2 py-0.5 rounded-md">10:00 – 14:00, 16:30 – 20:30</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span>Sábado</span>
                        <span className="font-semibold text-slate-900 bg-white/60 border border-white/50 shadow-sm px-2 py-0.5 rounded-md">10:00 – 14:00, 16:30 – 20:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingo</span>
                        <span className="text-red-500 font-bold uppercase bg-red-50 px-2.5 py-0.5 rounded-full">Cerrado</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.section>

      </main>

      {/* Footer with premium visual aesthetic, advanced glassmorphic inputs and elegant detailing */}
      <footer className="bg-slate-950 text-slate-300 py-12 px-6 md:px-12 border-t border-slate-900 shrink-0 w-full mt-10 relative overflow-hidden">
        {/* Neon top divider line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        {/* Soft atmospheric gradient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand presentation */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 group">
                <div className="p-1 bg-white/5 rounded-2xl border border-white/10 group-hover:border-indigo-500/30 transition-all duration-300">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" 
                    alt="AYAT MÓVILES" 
                    className="w-12 h-12 object-contain transition-transform duration-500 group-hover:scale-105 cursor-pointer" 
                    referrerPolicy="no-referrer"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  />
                </div>
                <div>
                  <span className="text-lg font-black text-white tracking-wider font-display block">AYAT MÓVILES</span>
                  <span className="text-[10px] text-indigo-400 font-mono font-semibold tracking-widest uppercase">Premium Tech</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Especialistas líderes en venta, reparación exprés y soporte informático en Zumarraga. Máxima garantía, velocidad inigualable y confianza certificada para todos tus dispositivos.
              </p>
              
              {/* Telemetry Visitor Counter */}
              <VisitorCounter />

              <div>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group flex items-center gap-2 text-[11px] font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5 hover:bg-white/10 px-4.5 py-2 rounded-full border border-white/5 hover:border-indigo-500/30 cursor-pointer shadow-sm"
                >
                  Volver arriba
                  <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-indigo-400" />
                </button>
              </div>
            </div>

            {/* Column 2: INTERACTIVE - Rate Experience */}
            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl backdrop-blur-sm shadow-xl">
              <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-4 font-mono">¿QUÉ OPINAS DE LA WEB?</h4>
              
              <AnimatePresence mode="wait">
                {!footerRatingSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-xs text-slate-400 leading-relaxed">Valora tu experiencia navegando por Ayat Móviles:</p>
                    <div className="flex gap-2">
                      {[
                        { rate: 1, label: "😢", desc: "Mala" },
                        { rate: 2, label: "😐", desc: "Normal" },
                        { rate: 3, label: "😊", desc: "Buena" },
                        { rate: 4, label: "😍", desc: "¡Excelente!" }
                      ].map((item) => (
                        <button
                          key={item.rate}
                          onClick={() => {
                            setFooterRating(item.rate);
                            setFooterRatingSubmitted(true);
                          }}
                          className="w-10.5 h-10.5 bg-slate-950 hover:bg-indigo-650 border border-slate-800 hover:border-indigo-400 text-lg rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] cursor-pointer group"
                          title={item.desc}
                        >
                          <span className="group-hover:scale-125 transition-transform duration-300">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-xl space-y-2 text-left"
                  >
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-400 animate-spin" />
                      <span className="font-bold text-xs">¡Muchas Gracias!</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Tu valoración ({footerRating === 4 ? "Excelente 😍" : footerRating === 3 ? "Buena 😊" : footerRating === 2 ? "Normal 😐" : "Mejorable 😢"}) nos ayuda a perfeccionar Ayat Móviles continuamente.
                    </p>
                    <button 
                      onClick={() => setFooterRatingSubmitted(false)}
                      className="text-[10px] text-indigo-400 underline hover:text-white block mt-1"
                    >
                      Cambiar valoración
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Column 3: INTERACTIVE - Quick WhatsApp Consultation */}
            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl backdrop-blur-sm shadow-xl">
              <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-4 font-mono">PREGUNTA RÁPIDA</h4>
              <div className="space-y-3">
                <p className="text-xs text-slate-400 leading-relaxed">Escribe tu duda y te redirigiremos a WhatsApp:</p>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!footerQuestion.trim()) return;
                    const encoded = encodeURIComponent(`¡Hola Ayat Móviles! He visto vuestra web y tengo una consulta rápida: ${footerQuestion.trim()}`);
                    window.open(`https://wa.me/34632447979?text=${encoded}`, "_blank");
                  }}
                  className="space-y-2.5"
                >
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="¿Reparáis tablets? ¿Precios...?" 
                      value={footerQuestion}
                      onChange={(e) => setFooterQuestion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/25 transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!footerQuestion.trim()}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      footerQuestion.trim() 
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-[1.01] shadow-md shadow-emerald-950/45 cursor-pointer" 
                        : "bg-slate-900 text-slate-600 border border-slate-800/50 cursor-not-allowed"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                    Enviar por WhatsApp
                  </button>
                </form>
              </div>
            </div>

            {/* Column 4: Links & Support info */}
            <div>
              <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-6 font-mono">ENLACES RÁPIDOS</h4>
              <ul className="space-y-3.5 text-xs">
                <li>
                  <a href="#servicios" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 hover:translate-x-1 duration-300">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" /> Venta de Teléfonos & Accesorios
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 hover:translate-x-1 duration-300">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" /> Presupuesto de Reparación
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 hover:translate-x-1 duration-300">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" /> Preguntas Frecuentes (FAQ)
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 hover:translate-x-1 duration-300">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" /> Horarios & Localización
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/34632447979" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-all flex items-center gap-2 hover:translate-x-1 duration-300 font-bold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 animate-ping" /> Soporte Urgente WhatsApp <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2.5 text-center md:text-left">
              <div className="text-xs text-slate-500 font-mono">
                © 2026 AYAT MÓVILES. Todos los derechos reservados. | Zumarraga, Gipuzkoa.
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3.5 gap-y-1.5 text-[11px] text-slate-400 font-sans">
                <button onClick={() => setLegalModal("aviso")} className="hover:text-indigo-400 transition-colors cursor-pointer bg-transparent border-none p-0">Aviso Legal</button>
                <span className="text-slate-800 font-mono">•</span>
                <button onClick={() => setLegalModal("privacidad")} className="hover:text-indigo-400 transition-colors cursor-pointer bg-transparent border-none p-0">Política de Privacidad</button>
                <span className="text-slate-800 font-mono">•</span>
                <button onClick={() => setLegalModal("cookies")} className="hover:text-indigo-400 transition-colors cursor-pointer bg-transparent border-none p-0">Política de Cookies</button>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div dangerouslySetInnerHTML={{ __html: `<!-- Componente: Botón de Autor (Premium Glassmorphism) -->
<a href="https://www.instagram.com/jakesroodriguez" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-500 group hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 backdrop-blur-md">
  
  <!-- Burbuja del Icono -->
  <div class="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors flex items-center justify-center">
    <!-- NOTA: Requiere cargar Material Symbols -->
    <span class="material-symbols-outlined text-sm group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300">
      code
    </span>
  </div>
  
  <!-- Contenedor de Textos -->
  <div class="flex flex-col items-start text-left font-sans">
    <span class="text-[9px] uppercase tracking-[0.2em] opacity-60 font-medium mb-0.5">
      Designed & Built by
    </span>
    <span class="text-sm font-bold tracking-wider">
      @jakesroodriguez
    </span>
  </div>
</a>` }} />
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Multi-turn AI Assistant Chat Box */}
      <ChatBot />

      {/* Floating Direct Contact Button */}
      <motion.a
        href="#contacto"
        onClick={() => {
          setActiveTab("contacto");
        }}
        className="fixed bottom-6 left-6 z-40 bg-slate-900/95 hover:bg-indigo-600 text-white px-5 py-3.5 rounded-full shadow-[0_20px_50px_rgba(15,23,42,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-slate-800 hover:border-indigo-400 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer backdrop-blur-md"
        whileHover={{ y: -4 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <MapPin className="w-4 h-4 text-indigo-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider font-mono">
          Ubicación y Contacto
        </span>
        <span className="inline sm:hidden text-xs font-bold uppercase tracking-wider font-mono">
          Contacto
        </span>
      </motion.a>

      {/* Dynamic Cookies consent banner & modal views (Apartados A, B, C, D) */}
      <LegalManager 
        activeModal={legalModal} 
        onCloseModal={() => setLegalModal(null)} 
        onOpenModal={(type) => setLegalModal(type)} 
      />
    </div>
  );
}

// Simple Helper Bot Icon Component
function BotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
