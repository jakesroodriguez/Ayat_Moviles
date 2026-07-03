import { useState, ReactNode } from "react";
import { HelpCircle, ChevronDown, MessageSquare, Shield, Clock, Wrench, Package } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
  icon: ReactNode;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "¿Cuánto tiempo tarda la reparación de una pantalla o batería?",
      answer: "La mayoría de nuestras reparaciones de pantalla y cambio de batería se completan de forma exprés en menos de 45 minutos. Contamos con técnicos especializados e instrumentación de precisión para garantizar un acabado impecable sin esperas innecesarias.",
      icon: <Clock className="w-5 h-5 text-indigo-500" />
    },
    {
      question: "¿Qué tipo de repuestos utilizáis para las reparaciones?",
      answer: "Trabajamos exclusivamente con repuestos de calidad máxima certificada (OEM) y componentes originales compatibles. Esto nos permite garantizar que tu dispositivo mantenga su brillo, sensibilidad táctil y rendimiento de batería original.",
      icon: <Wrench className="w-5 h-5 text-indigo-500" />
    },
    {
      question: "¿Tienen garantía las reparaciones de teléfonos?",
      answer: "Sí, por supuesto. Todas nuestras reparaciones cuentan con una garantía sellada por escrito que cubre cualquier defecto del componente instalado o de la mano de obra. Tu tranquilidad es nuestra prioridad absoluta.",
      icon: <Shield className="w-5 h-5 text-indigo-500" />
    },
    {
      question: "¿Cómo funciona el servicio de Punto Pack (Mondial Relay)?",
      answer: "Es un proceso sumamente sencillo. Puedes seleccionar Ayat Móviles como tu punto de entrega al comprar online o depositar tus devoluciones aquí. Para recoger un paquete, solo necesitas presentar tu DNI, NIE o pasaporte y el código de seguimiento del envío.",
      icon: <Package className="w-5 h-5 text-indigo-500" />
    },
    {
      question: "¿Es necesario pedir cita previa antes de ir a la tienda?",
      answer: "No es obligatorio. Puedes acudir directamente a nuestro establecimiento físico en Elizkale Kalea 9, Zumarraga, dentro de nuestro horario habitual. No obstante, avisarnos con antelación nos permite verificar la disponibilidad de stock inmediato para tu modelo específico.",
      icon: <HelpCircle className="w-5 h-5 text-indigo-500" />
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 md:py-20 max-w-7xl mx-auto w-[95%]">
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 md:p-12 lg:p-16 shadow-[0_30px_60px_rgba(15,23,42,0.06)] relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/20 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-slate-50 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2 font-mono">Preguntas Frecuentes</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 font-display leading-tight">
                Resolvemos tus dudas al instante
              </h2>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              ¿Tienes alguna duda sobre nuestros servicios de reparación, venta de smartphones o recogida de paquetes? Aquí tienes las respuestas a las preguntas más habituales de nuestros clientes.
            </p>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                ¿No encuentras lo que buscas?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nuestro chat inteligente está disponible 24/7 en la esquina inferior derecha o puedes escribirnos directamente por WhatsApp.
              </p>
              <a
                href="https://wa.me/34632447979"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-indigo-200"
                id="btn-faq-whatsapp"
              >
                Preguntar por WhatsApp
              </a>
            </div>
          </div>

          {/* Right Accordion column */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border transition-all duration-300 rounded-2xl ${
                    isOpen
                      ? "bg-indigo-50/30 border-indigo-200 shadow-sm"
                      : "bg-white border-slate-200 hover:border-indigo-150 hover:bg-slate-50/50 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                    id={`faq-btn-${index}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-xl transition-colors shrink-0 ${
                        isOpen ? "bg-indigo-100/60 text-indigo-600" : "bg-slate-100 text-slate-500"
                      }`}>
                        {faq.icon}
                      </div>
                      <span className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`transition-transform duration-300 text-slate-400 shrink-0 ${
                      isOpen ? "transform rotate-180 text-indigo-600" : ""
                    }`}>
                      <ChevronDown className="w-5 h-5" />
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
                        <div className="px-5 pb-5 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100/80 ml-3 sm:ml-12">
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
