import { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "¿Cuánto tiempo tarda la reparación de una pantalla o batería?",
      answer: "La mayoría de nuestras reparaciones de pantalla y cambio de batería se completan de forma exprés en menos de 45 minutos. Contamos con técnicos especializados e instrumentación de precisión para garantizar un acabado impecable sin esperas innecesarias."
    },
    {
      question: "¿Qué tipo de repuestos utilizáis para las reparaciones?",
      answer: "Trabajamos exclusivamente con repuestos de calidad máxima certificada (OEM) y componentes originales compatibles. Esto nos permite garantizar que tu dispositivo mantenga su brillo, sensibilidad táctil y rendimiento de batería original."
    },
    {
      question: "¿Tienen garantía las reparaciones de teléfonos?",
      answer: "Sí, por supuesto. Todas nuestras reparaciones cuentan con una garantía sellada por escrito que cubre cualquier defecto del componente instalado o de la mano de obra. Tu tranquilidad es nuestra prioridad absoluta."
    },
    {
      question: "¿Cómo funciona el servicio de Punto Pack (Mondial Relay)?",
      answer: "Es un proceso sumamente sencillo. Puedes seleccionar Ayat Móviles como tu punto de entrega al comprar online o depositar tus devoluciones aquí. Para recoger un paquete, solo necesitas presentar tu DNI, NIE o pasaporte y el código de seguimiento del envío."
    },
    {
      question: "¿Es necesario pedir cita previa antes de ir a la tienda?",
      answer: "No es obligatorio. Puedes acudir directamente a nuestro establecimiento físico en Elizkale Kalea 9, Zumarraga, dentro de nuestro horario habitual. No obstante, avisarnos con antelación nos permite verificar la disponibilidad de stock inmediato para tu modelo específico."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 max-w-7xl mx-auto w-full px-4 scroll-mt-24">
      <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/60 rounded-[32px] p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.02)] relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-100/60 px-3 py-1.5 rounded-full shadow-sm w-fit inline-block">
                PREGUNTAS FRECUENTES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display leading-tight">
                Resolvemos tus dudas al instante
              </h2>
            </div>
            
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              ¿Tienes alguna duda sobre nuestros servicios de reparación, venta de smartphones o recogida de paquetes? Aquí tienes las respuestas a las preguntas más habituales de nuestros clientes.
            </p>

            <div className="pt-6 border-t border-slate-100 space-y-3.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 font-display tracking-tight">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                ¿No encuentras lo que buscas?
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                Nuestro chat inteligente está disponible 24/7 en la esquina inferior derecha o puedes escribirnos directamente por WhatsApp.
              </p>
              <a
                href="https://wa.me/34632447979"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider transition-colors font-mono"
                id="btn-faq-whatsapp"
              >
                Preguntar por WhatsApp →
              </a>
            </div>
          </div>

          {/* Right Accordion column */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen 
                      ? "bg-white border-slate-300/80 shadow-[0_10px_30px_rgba(15,23,42,0.02)]" 
                      : "bg-white/40 border-slate-200/60 hover:bg-white/80 hover:border-slate-300/60"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                    id={`faq-btn-${index}`}
                  >
                    <span className="font-bold text-slate-800 text-sm md:text-base leading-snug group-hover:text-indigo-600 transition-colors font-display tracking-tight">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-slate-950 border-slate-950 text-white rotate-180" : "bg-white text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-medium border-t border-slate-100 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
