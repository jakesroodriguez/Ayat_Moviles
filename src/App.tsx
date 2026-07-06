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
import FloatingGear3D from "./components/FloatingGear3D";
import FloatingShield3D from "./components/FloatingShield3D";
import FloatingStar3D from "./components/FloatingStar3D";
import FloatingCube3D from "./components/FloatingCube3D";

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [selectedReparacion, setSelectedReparacion] = useState("pantalla");
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // States for Interactive Budget Calculator
  const [calcBrand, setCalcBrand] = useState("apple");
  const [calcModel, setCalcModel] = useState("iphone13");
  const [calcIssue, setCalcIssue] = useState("pantalla");

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
          className={`bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-indigo-100/50 flex flex-col justify-center overflow-hidden transition-all duration-300 pointer-events-auto ${
            isNavExpanded 
              ? "rounded-3xl p-5 lg:p-6 w-full" 
              : "rounded-full py-2 px-4 h-[44px] cursor-pointer w-[210px] sm:w-[220px]"
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
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-600 font-mono tracking-wider">MENÚ</span>
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
      <main className="flex-1 flex flex-col z-10 w-[95%] max-w-7xl mx-auto gap-8 my-8">
        
        {/* Hero Section (Geometric Split with Premium Curved Panels) */}
        <section id="inicio" className="w-full flex flex-col gap-4 sm:gap-6 scroll-mt-20">
          
          {/* Top Row: Hero Text side-by-side with 3D Phone simulator */}
          <div className="w-full">
            
            {/* Unified Bento Card with side-by-side on sm: screens and compact sizing */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between p-5 xs:p-6 sm:p-8 md:p-12 relative bg-white border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.08)] rounded-3xl overflow-hidden group">
              <div className="absolute -top-10 -left-10 text-[100px] md:text-[140px] font-black text-slate-50/50 select-none z-0 font-display transition-transform duration-700 group-hover:scale-110 pointer-events-none">
                01
              </div>
              
              {/* Left Column (Text & CTAs): takes full width on xs, side-by-side from sm: */}
              <div className="w-full sm:w-[58%] lg:w-[60%] flex flex-col justify-center relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50/90 text-indigo-700 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-6 rounded-full border border-indigo-100 self-start animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 fill-indigo-100" />
                  Servicio Técnico Certificado v4.0
                </span>
                
                <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-slate-900 mb-4 sm:mb-7 font-display">
                  Tu tecnología con<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Ayat Móviles.</span>
                </h1>
                
                <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-lg mb-5 sm:mb-9 leading-relaxed font-sans">
                  Especialistas líderes en telefonía móvil, soporte informático exprés y servicios logísticos en Zumarraga. Reparación garantizada, venta certificada y atención premium personalizada.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="#servicios" 
                    onClick={() => setActiveTab("servicios")}
                    className="px-5 py-3 sm:px-7 sm:py-3.5 bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg shadow-indigo-200/60 flex items-center gap-2 uppercase tracking-wider text-xs sm:text-sm md:text-base rounded-full cursor-pointer"
                  >
                    Ver Servicios
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a 
                    href="#contacto"
                    onClick={() => setActiveTab("contacto")}
                    className="px-5 py-3 sm:px-7 sm:py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-2 uppercase tracking-wider text-xs sm:text-sm md:text-base rounded-full cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-indigo-400" />
                    Contacto
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive 3D Device Mockup */}
              <div className="w-full sm:w-[38%] lg:w-[36%] mt-5 sm:mt-0 flex flex-col justify-center items-center relative z-10 shrink-0">
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]">
                  <ThreeSmartphone />
                </div>
              </div>
            </div>

          </div>

          {/* Premium Trust Badges Horizontal Panel - Compact & Responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-2 sm:mt-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex items-center gap-2.5 sm:gap-3.5 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 border border-indigo-100 rounded-lg sm:rounded-xl text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 font-display">Reparación Exprés</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-sans mt-0.5">La mayoría listas en 1h</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex items-center gap-2.5 sm:gap-3.5 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 border border-indigo-100 rounded-lg sm:rounded-xl text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 font-display">Garantía Real 6m</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-sans mt-0.5">En piezas y mano de obra</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex items-center gap-2.5 sm:gap-3.5 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 border border-indigo-100 rounded-lg sm:rounded-xl text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 font-display">Punto Pack Oficial</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-sans mt-0.5">Envíos con Mondial Relay</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex items-center gap-2.5 sm:gap-3.5 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 border border-indigo-100 rounded-lg sm:rounded-xl text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 font-display">Protección LOPD</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-sans mt-0.5">Datos 100% confidenciales</p>
              </div>
            </div>
          </div>

        </section>

        {/* Services Section (Bento Grid Style + Fully Rounded Corners + Zoom Transitions) */}
        <section id="servicios" className="py-16 md:py-24 px-4 max-w-7xl mx-auto w-full border-t border-slate-200/60 mt-4">
          <div className="mb-16 max-w-3xl relative">
            <div className="absolute -top-4 -right-4 sm:right-0 z-10 hidden sm:block">
              <FloatingGear3D />
            </div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-3 font-mono">PORTFOLIO DE SERVICIOS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
              Soluciones Integrales de Máxima Calidad
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mt-4 rounded-full"></div>
            <p className="text-slate-500 mt-6 font-sans">
              Cubrimos todas tus necesidades en telefonía móvil y paquetería express. Equipamiento de vanguardia, repuestos premium de grado AAA y trazabilidad garantizada.
            </p>
          </div>

          {/* Bento Layout Grid with High Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Service 1: Tienda de Móviles (Featured Large Card spanning 2 cols) */}
            <div className="bg-white border border-slate-200 p-8 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-500 md:col-span-2 group rounded-3xl relative overflow-hidden hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/60 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              <div>
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-6 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">Tienda de Móviles & Accesorios</h3>
                <p className="text-slate-500 mb-6 font-sans max-w-xl">
                  Disponemos de smartphones premium nuevos y reacondicionados totalmente verificados. Amplio surtido de accesorios duraderos como fundas de alta resistencia, protectores templados, cargadores rápidos y soporte multi-marca.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-slate-150 pt-6 mt-6">
                <span className="text-xs text-indigo-700 font-mono font-bold tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Venta & Reparaciones Exprés</span>
                <a 
                  href="#contacto"
                  className="text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:text-indigo-600 transition-colors group-hover:translate-x-1 duration-300"
                >
                  Consultar Stock <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Service 2: Punto Pack */}
            <div className="bg-white border border-slate-200 p-8 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-500 group rounded-3xl hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
              <div>
                <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-6 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Punto Pack Oficial</h3>
                <p className="text-slate-500 mb-6 font-sans text-sm">
                  Punto de recogida y entrega oficial autorizado de Mondial Relay. Envía tus paquetes de forma ágil y recógelos de manera 100% segura en nuestro amplio horario comercial.
                </p>
              </div>
              <div className="border-t border-slate-150 pt-6 flex items-center justify-between mt-6">
                <span className="text-xs text-slate-500 font-mono font-bold">Mondial Relay</span>
                <span className="text-emerald-700 font-mono text-xs font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-150">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Activo
                </span>
              </div>
            </div>

            {/* Service 3: Compra en Tienda */}
            <div className="bg-white border border-slate-200 p-8 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-500 group rounded-3xl hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
              <div>
                <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-6 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Compra Presencial</h3>
                <p className="text-slate-500 mb-6 font-sans text-sm">
                  Prueba dispositivos insitu antes de comprar. Recibe atención y asesoramiento experto adaptado a tu presupuesto y necesidades tecnológicas reales.
                </p>
              </div>
              <div className="border-t border-slate-150 pt-6 text-[11px] font-mono text-slate-500 mt-6">
                Ubicación Central: Zumarraga
              </div>
            </div>

            {/* Service 4: A Domicilio */}
            <div className="bg-white border border-slate-200 p-8 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-500 group rounded-3xl hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
              <div>
                <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-6 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Soporte a Domicilio</h3>
                <p className="text-slate-500 mb-6 font-sans text-sm">
                  Ofrecemos servicio especial de asistencia técnica y entrega de terminales a domicilio en el entorno para personas con movilidad reducida o necesidades específicas.
                </p>
              </div>
              <div className="border-t border-slate-150 pt-6 flex items-center justify-between mt-6">
                <span className="text-xs font-bold text-indigo-700 font-mono bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Consúltanos Disponibilidad</span>
              </div>
            </div>

            {/* Service 5: Espacio Seguro */}
            <div className="bg-white border border-slate-200 p-8 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-500 group rounded-3xl hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
              <div>
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-6 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Privacidad & Datos Seguros</h3>
                <p className="text-slate-500 mb-6 font-sans text-sm">
                  Riguroso protocolo de confidencialidad de datos. Toda la información de tu teléfono está protegida por estrictos estándares profesionales durante las reparaciones.
                </p>
              </div>
              <div className="border-t border-slate-150 pt-6 text-xs text-emerald-700 font-mono font-bold flex items-center gap-1.5 mt-6">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Certificación LOPD
              </div>
            </div>

          </div>
        </section>

        {/* Interactive Budget Calculator Section - HIGH VALUE ADDITION - High Contrast */}
        <section className="py-16 px-6 bg-white border border-slate-200 rounded-3xl shadow-[0_30px_60px_rgba(15,23,42,0.06)] max-w-7xl mx-auto w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-50/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mb-10 relative z-10">
            <div className="absolute -top-2 right-0 z-10 hidden sm:block">
              <FloatingShield3D />
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-100/50">CALCULADORA DE PRESUPUESTOS</span>
            <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-4">Simulador de Reparación en Vivo</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Selecciona tu marca, modelo y el tipo de reparación para obtener un presupuesto estimado al instante con garantía incluida y repuestos certificados.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            
            {/* Left Panel: Selectors (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Brand selection */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">1. Selecciona la Marca</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "apple", label: "Apple iPhone", logo: "https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" },
                    { id: "samsung", label: "Samsung", logo: "https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" },
                    { id: "xiaomi", label: "Xiaomi / Redmi", logo: "https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" },
                    { id: "otros", label: "Otras Marcas", logo: "https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" }
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
                      className={`py-3 px-4 rounded-2xl border text-center font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer ${
                        calcBrand === brand.id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                          : "bg-gradient-to-tr from-white/45 to-white/20 backdrop-blur-xl text-slate-700 border-white/70 hover:from-white/55 hover:to-white/30"
                      }`}
                    >
                      <span>{brand.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Model selection */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">2. Elige el Modelo</label>
                <div className="relative">
                  <select
                    value={calcModel}
                    onChange={(e) => setCalcModel(e.target.value)}
                    className="w-full bg-gradient-to-tr from-white/45 to-white/20 backdrop-blur-xl border border-white/70 rounded-2xl p-4 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 shadow-inner appearance-none cursor-pointer"
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
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">3. Tipo de Daño / Incidencia</label>
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
                        className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-start gap-3.5 cursor-pointer group ${
                          calcIssue === issue.id
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100"
                            : "bg-gradient-to-tr from-white/45 to-white/20 backdrop-blur-xl text-slate-700 border-white/70 hover:from-white/55 hover:to-white/30 hover:border-indigo-200"
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                          calcIssue === issue.id
                            ? "bg-white/20 text-white"
                            : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                        }`}>
                          <IssueIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs font-display uppercase tracking-wider leading-none mb-1">{issue.label}</h4>
                          <p className={`text-[10px] leading-relaxed ${
                            calcIssue === issue.id ? "text-indigo-100/90" : "text-slate-400"
                          }`}>{issue.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Panel: Receipt Display (5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl border border-slate-800 flex-1 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">PRESUPUESTO ESTIMADO</span>
                      <h4 className="font-bold text-lg font-display">
                        {calcBrand === "apple" ? "Apple iPhone" : calcBrand === "samsung" ? "Samsung Galaxy" : calcBrand === "xiaomi" ? "Xiaomi / Redmi" : "Dispositivo"}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wide">
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
                    <div className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider text-indigo-300">
                      Cerrado
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="py-6 border-y border-white/10 my-6 flex flex-col justify-center items-center">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">Total Estimado</span>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                        {(() => {
                          const basePrices: Record<string, Record<string, number>> = {
                            pantalla: { apple: 89, samsung: 79, xiaomi: 59, otros: 49 },
                            bateria: { apple: 39, samsung: 35, xiaomi: 29, otros: 25 },
                            carga: { apple: 35, samsung: 29, xiaomi: 25, otros: 25 },
                            camara: { apple: 49, samsung: 39, xiaomi: 29, otros: 29 },
                            humedad: { apple: 45, samsung: 40, xiaomi: 35, otros: 35 }
                          };
                          const prices = basePrices[calcIssue] || { apple: 45, samsung: 40, xiaomi: 35, otros: 35 };
                          const brandPrice = prices[calcBrand] || 35;
                          return brandPrice;
                        })()}
                      </span>
                      <span className="text-2xl font-bold ml-1 text-indigo-400">€</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 text-center">Mano de obra, repuesto Grado AAA e IVA incluidos.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Tiempo estimado:</span>
                      <span className="font-bold text-slate-200">
                        {calcIssue === "pantalla" && "1 - 2 horas (Exprés)"}
                        {calcIssue === "bateria" && "30 - 45 minutos"}
                        {calcIssue === "carga" && "1 hora"}
                        {calcIssue === "camara" && "1 - 2 horas"}
                        {calcIssue === "humedad" && "24 horas (Test de secado)"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Garantía real:</span>
                      <span className="font-bold text-slate-200">
                        {calcIssue === "humedad" ? "Garantía de limpieza" : "6 meses de Garantía"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Tus datos personales:</span>
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100% Protegidos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <a
                    href={(() => {
                      const brandName = calcBrand === "apple" ? "Apple iPhone" : calcBrand === "samsung" ? "Samsung" : calcBrand === "xiaomi" ? "Xiaomi" : "Dispositivo";
                      const issueName = calcIssue === "pantalla" ? "reparación de pantalla rota" : calcIssue === "bateria" ? "cambio de batería" : calcIssue === "carga" ? "puerto de carga" : calcIssue === "camara" ? "cámara o cristal trasero" : "limpieza por humedad";
                      const textMsg = `Hola AYAT Móviles, me gustaría reservar cita para un presupuesto de ${issueName} en un ${brandName}.`;
                      return `https://wa.me/34632447979?text=${encodeURIComponent(textMsg)}`;
                    })()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest text-center rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    Reservar Cita WhatsApp
                  </a>

                  <button
                    onClick={triggerChat}
                    className="w-full py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    Preguntar por Chatbot AI
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Dedicated WhatsApp Interactive Section */}
        <section id="whatsapp" className="py-16 px-6 bg-slate-50 border border-slate-200 rounded-3xl max-w-7xl mx-auto w-full relative overflow-hidden my-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-6 right-6 z-10 hidden lg:block">
            <FloatingCube3D />
          </div>

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

            {/* Right Column: Simulated WhatsApp Chat Device Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] bg-slate-950 p-3 rounded-[48px] shadow-2xl border border-slate-800 relative group overflow-hidden">
                {/* Gloss effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none rounded-[48px]" />
                
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-between px-4">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                  <div className="w-10 h-1 bg-slate-900 rounded" />
                </div>

                {/* WhatsApp Screen Container */}
                <div className="w-full bg-[#efeae2] rounded-[38px] overflow-hidden border border-slate-900 flex flex-col h-[410px] sm:h-[520px] relative font-sans">
                  
                  {/* WhatsApp Header */}
                  <div className="bg-[#075e54] text-white pt-7 pb-3 px-4 flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold font-display text-white relative border border-white/10 shrink-0 overflow-hidden">
                        <img 
                          src="https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" 
                          alt="Ayat Móviles Avatar" 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs tracking-tight">AYAT MÓVILES</h4>
                        <span className="text-[10px] text-emerald-100/90 font-mono block">en línea • Zumarraga</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 opacity-90">
                      <Phone className="w-3.5 h-3.5 fill-white text-white" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>

                  {/* WhatsApp Chat Wall background & messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5 flex flex-col bg-[#efeae2]">
                    
                    {/* Timestamp bubble */}
                    <div className="mx-auto bg-[#d1f4cc]/40 border border-slate-300/10 px-2.5 py-0.5 rounded text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                      Hoy
                    </div>

                    {/* Support message 1 */}
                    <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-[85%] text-[12px] text-slate-800 shadow-sm relative self-start">
                      <p className="leading-normal">
                        ¡Hola! Bienvenido a <strong>AYAT MÓVILES</strong> en Zumarraga. ¿En qué podemos ayudarte hoy?
                      </p>
                      <span className="text-[9px] text-slate-400 font-mono text-right block mt-1.5">10:00</span>
                    </div>

                    {/* Support message 2 */}
                    <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-[85%] text-[12px] text-slate-800 shadow-sm relative self-start">
                      <p className="leading-normal">
                        Si lo deseas, puedes editar la plantilla rápida a continuación para enviarnos tu consulta directa.
                      </p>
                      <span className="text-[9px] text-slate-400 font-mono text-right block mt-1.5">10:01</span>
                    </div>

                    {/* User interactive typing preview bubble */}
                    <div className="bg-[#dcf8c6] rounded-2xl rounded-tr-none p-3 max-w-[85%] text-[12px] text-slate-800 shadow-sm relative self-end border border-emerald-100 mt-2">
                      <p className="leading-normal italic text-slate-700">
                        "{whatsAppText}"
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1.5">
                        <span className="text-[9px] text-slate-500 font-mono">Ahora</span>
                        <CheckCircle2 className="w-3 h-3 text-sky-500 fill-sky-100" />
                      </div>
                    </div>

                  </div>

                  {/* Interactive Text Area & Action Button */}
                  <div className="p-3 bg-[#f0f0f0] border-t border-slate-200 flex flex-col gap-2 shrink-0">
                    <div className="relative">
                      <textarea
                        value={whatsAppText}
                        onChange={(e) => {
                          setWhatsAppActivePreset(-1); // custom input
                          setWhatsAppText(e.target.value);
                        }}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={2}
                        className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 resize-none font-sans shadow-inner"
                      />
                    </div>
                    
                    <a
                      href={`https://wa.me/34632447979?text=${encodeURIComponent(whatsAppText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      Enviar Mensaje Directo
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Reviews & Testimonials Section - High Contrast */}
        <section id="valoraciones" className="py-10 md:py-20 bg-white border border-slate-200 rounded-3xl shadow-[0_30px_60px_rgba(15,23,42,0.06)] max-w-7xl mx-auto w-full relative overflow-hidden">
          <div className="px-5 sm:px-8 md:px-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2 font-mono">OPINIONES VERIFICADAS</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">Lo que dicen nuestros clientes</h2>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <FloatingStar3D />
                <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 font-mono text-xs rounded-full shadow-sm flex items-center gap-3">
                  <span className="font-bold text-slate-700">Google Reviews:</span>
                  <div className="flex text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="font-bold text-indigo-700">5.0 / 5</span>
                </div>
              </div>
            </div>

            {/* Structured Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {reviews.map((rev, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50 border border-slate-200 p-5 sm:p-8 flex flex-col justify-between relative hover:shadow-lg hover:bg-white hover:border-slate-300 transition-all duration-350 rounded-3xl hover:-translate-y-1 shadow-sm"
                >
                  <div className="absolute top-4 right-6 text-slate-200/60 font-serif text-5xl leading-none select-none">
                    ”
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-3.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    
                    <p className="text-slate-600 text-xs sm:text-sm italic mb-5 leading-relaxed">
                      "{rev.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-slate-200/50 pt-3.5 mt-auto">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 text-white flex items-center justify-center font-bold text-sm rounded-xl">
                      {rev.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{rev.author}</h4>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono block">{rev.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive FAQ Section */}
        <FAQSection />

        {/* Info, Map & Contact Section with superb rounded layout - High Contrast */}
        <section id="contacto" className="py-4 max-w-7xl mx-auto w-full">
          <div className="bg-white border border-slate-200 flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(15,23,42,0.06)]">
            
            {/* Map Column */}
            <div className="lg:w-1/2 min-h-[320px] lg:min-h-[450px] relative bg-slate-100/50 border-b lg:border-b-0 lg:border-r border-white/30 overflow-hidden group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzyih1_M19iwqGTdICvFpCi9zdCouIAQlD2Bjg5CJsPN5_3gbfCy_0CvpaSL8Zgk0Wv-sasMEgUCsNOys0-59IW6YMo2IRXzYF6oWozWDWc_VafcdoHZM_7SHawQkBrF1HQi9eBqpuLHeXKDnNUUy64ljXZ1rkpgkg8R0HK-1nV1Sx4sFJbORCzLJk5temitQRlW-B9qlNjuXVSYD9seilVhIVWGIKPQS9uNg6iyW8_-zRT8u28UA3jHIeHsTOn6deQwUpMD4qixs" 
                alt="Mapa Ubicación AYAT MÓVILES en Zumarraga" 
                className="w-full h-full object-cover grayscale contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white px-4 py-2 text-xs font-mono flex items-center gap-2 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
                Elizkale Kalea, 9, BAJO, Zumarraga
              </div>
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
        </section>

      </main>

      {/* Footer with high contrast, outstanding aesthetics and full interactivity */}
      <footer className="bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#030712] text-slate-300 py-16 px-6 md:px-12 border-t border-slate-800 shrink-0 w-full mt-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Brand presentation */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img 
                  src="https://lh3.googleusercontent.com/d/1omHKXUnbNUSjE7DQWfmYQYIu5Xdqk9Qo" 
                  alt="AYAT MÓVILES" 
                  className="w-14 h-14 object-contain transition-transform duration-500 hover:rotate-6 cursor-pointer" 
                  referrerPolicy="no-referrer"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                />
                <span className="text-xl font-black text-white tracking-tight font-display">AYAT MÓVILES</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Especialistas líderes en venta, reparación exprés y soporte informático en Zumarraga. Máxima garantía, velocidad inigualable y confianza certificada para todos tus dispositivos.
              </p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 hover:border-white/10"
                >
                  Volver Arriba 
                  <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-indigo-400" />
                </button>
              </div>
            </div>

            {/* Column 2: INTERACTIVE - Rate Experience */}
            <div>
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6 font-mono">¿QUÉ TE PARECE NUESTRA WEB?</h4>
              
              <AnimatePresence mode="wait">
                {!footerRatingSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-xs text-slate-400">Valora tu experiencia navegando por Ayat Móviles:</p>
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
                          className="w-11 h-11 bg-slate-800/60 hover:bg-indigo-600 border border-slate-700/80 hover:border-indigo-400 text-lg rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer group"
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
                    className="bg-indigo-950/40 border border-indigo-500/20 p-4 rounded-2xl space-y-2 text-left"
                  >
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-400 animate-spin" />
                      <span className="font-bold text-xs">¡Muchísimas Gracias!</span>
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
            <div>
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6 font-mono">PREGUNTA RÁPIDA</h4>
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Escribe tu duda y te redirigiremos a WhatsApp al instante:</p>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!footerQuestion.trim()) return;
                    const encoded = encodeURIComponent(`¡Hola Ayat Móviles! He visto vuestra web y tengo una consulta rápida: ${footerQuestion.trim()}`);
                    window.open(`https://wa.me/34632447979?text=${encoded}`, "_blank");
                  }}
                  className="space-y-2"
                >
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      placeholder="¿Reparáis tablets? ¿Precios...?" 
                      value={footerQuestion}
                      onChange={(e) => setFooterQuestion(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!footerQuestion.trim()}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      footerQuestion.trim() 
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-[1.02] shadow-lg shadow-emerald-950/50 cursor-pointer" 
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    Enviar por WhatsApp
                  </button>
                </form>
              </div>
            </div>

            {/* Column 4: Links & Support info */}
            <div>
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6 font-mono">ENLACES RÁPIDOS</h4>
              <ul className="space-y-3.5 text-xs">
                <li>
                  <a href="#servicios" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-300">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Venta de Teléfonos & Accesorios
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-300">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Presupuesto de Reparación
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-300">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Preguntas Frecuentes (FAQ)
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-300">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Horarios & Localización
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/34632447979" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-300 font-bold text-indigo-400">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Soporte Urgente por WhatsApp <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs text-slate-500 font-mono text-center md:text-left">
              © 2026 AYAT MÓVILES. Todos los derechos reservados. | Zumarraga, Gipuzkoa.
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
        className="fixed bottom-6 left-6 z-50 bg-slate-900/95 hover:bg-indigo-600 text-white px-5 py-3.5 rounded-full shadow-[0_20px_50px_rgba(15,23,42,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-slate-800 hover:border-indigo-400 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer backdrop-blur-md"
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
