import React, { useState, useEffect } from "react";
import { Shield, Cookie, X, Check, FileText, Settings, AlertCircle, Info, ChevronRight, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LegalManagerProps {
  activeModal: "aviso" | "privacidad" | "cookies" | null;
  onCloseModal: () => void;
  onOpenModal: (type: "aviso" | "privacidad" | "cookies") => void;
}

export default function LegalManager({ activeModal, onCloseModal, onOpenModal }: LegalManagerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Cookie Preferences
  const [consents, setConsents] = useState({
    technical: true, // Always required
    analytical: true,
    marketing: false,
  });

  // Check consent on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem("ayat_cookies_consent");
    if (!savedConsent) {
      // Small timeout to look organic
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsents({
          technical: true,
          analytical: !!parsed.analytical,
          marketing: !!parsed.marketing,
        });
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = { technical: true, analytical: true, marketing: true };
    localStorage.setItem("ayat_cookies_consent", JSON.stringify(fullConsent));
    setConsents(fullConsent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const minConsent = { technical: true, analytical: false, marketing: false };
    localStorage.setItem("ayat_cookies_consent", JSON.stringify(minConsent));
    setConsents(minConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("ayat_cookies_consent", JSON.stringify(consents));
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      {/* Dynamic Cookie Consent Banner (Apartado D) */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50"
            id="cookie-consent-banner"
          >
            <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 text-slate-100 p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col gap-4 relative overflow-hidden">
              {/* Subtle light stripe */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
                  <Cookie className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                    Control de Privacidad (RGPD)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Utilizamos cookies para garantizar la mejor experiencia, analizar nuestro tráfico web y optimizar nuestro soporte técnico. Al hacer clic en "Aceptar todo", consiente su uso.
                  </p>
                </div>
              </div>

              {/* Advanced Cookie Customization Drawer */}
              {showSettings ? (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="border-t border-slate-800 pt-3.5 space-y-3"
                >
                  <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-400">
                    Configuración de Cookies
                  </p>

                  {/* Cookie Option: Technical */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/40">
                    <div className="flex flex-col text-left max-w-[80%]">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        Técnicas (Obligatorias)
                        <Lock className="w-3 h-3 text-indigo-400" />
                      </span>
                      <span className="text-[10px] text-slate-500 leading-normal">
                        Permiten guardar tu consentimiento, recordar presupuestos y garantizar la seguridad del sitio.
                      </span>
                    </div>
                    <div className="w-9 h-5 bg-indigo-600/30 border border-indigo-500/30 rounded-full flex items-center px-1">
                      <div className="w-3.5 h-3.5 bg-indigo-400 rounded-full ml-auto" />
                    </div>
                  </div>

                  {/* Cookie Option: Analytical */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/40">
                    <div className="flex flex-col text-left max-w-[80%]">
                      <span className="text-xs font-bold text-white">Analíticas y Estadísticas</span>
                      <span className="text-[10px] text-slate-500 leading-normal">
                        Nos ayudan a saber de forma anónima cuántos clientes nos visitan y mejorar las secciones.
                      </span>
                    </div>
                    <button
                      onClick={() => setConsents(prev => ({ ...prev, analytical: !prev.analytical }))}
                      className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-all duration-300 cursor-pointer ${
                        consents.analytical ? "bg-indigo-600" : "bg-slate-800"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-300 shadow-md ${
                        consents.analytical ? "translate-x-4.5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Cookie Option: Marketing */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/40">
                    <div className="flex flex-col text-left max-w-[80%]">
                      <span className="text-xs font-bold text-white">Personalización y Redes</span>
                      <span className="text-[10px] text-slate-500 leading-normal">
                        Facilitan la redirección a nuestro canal directo de WhatsApp y la interacción en redes sociales.
                      </span>
                    </div>
                    <button
                      onClick={() => setConsents(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-all duration-300 cursor-pointer ${
                        consents.marketing ? "bg-indigo-600" : "bg-slate-800"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-300 shadow-md ${
                        consents.marketing ? "translate-x-4.5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 py-1.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-300 text-[11px] font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      Rechazar todo
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
                    >
                      Guardar ajuste
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 text-[10px] text-slate-400">
                    <button 
                      onClick={() => onOpenModal("aviso")}
                      className="hover:text-indigo-400 underline cursor-pointer"
                    >
                      Aviso Legal
                    </button>
                    <span>•</span>
                    <button 
                      onClick={() => onOpenModal("privacidad")}
                      className="hover:text-indigo-400 underline cursor-pointer"
                    >
                      Privacidad
                    </button>
                    <span>•</span>
                    <button 
                      onClick={() => onOpenModal("cookies")}
                      className="hover:text-indigo-400 underline cursor-pointer"
                    >
                      Cookies
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="py-2.5 px-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 text-[10.5px] font-semibold rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all border border-slate-750/30"
                    >
                      <Settings className="w-3 h-3 text-slate-400" />
                      Configurar
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="py-2.5 px-1.5 bg-slate-850 hover:bg-slate-800 text-slate-400 text-[10.5px] font-semibold rounded-xl cursor-pointer transition-all border border-slate-800/30"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="py-2.5 px-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-[10.5px] font-bold rounded-xl cursor-pointer transition-all shadow-[0_4px_12px_rgba(99,102,241,0.25)] flex items-center justify-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Aceptar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen High-Fidelity Legal Modal (Apartados A, B, C) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white border border-slate-200 shadow-[0_30px_70px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden flex flex-col"
              id="legal-document-modal"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50 relative shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100/50">
                    {activeModal === "aviso" && <FileText className="w-5 h-5" />}
                    {activeModal === "privacidad" && <Shield className="w-5 h-5" />}
                    {activeModal === "cookies" && <Cookie className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-600 uppercase block">
                      Ayat Móviles Zumarraga
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
                      {activeModal === "aviso" && "Aviso Legal y Condiciones"}
                      {activeModal === "privacidad" && "Política de Privacidad (RGPD)"}
                      {activeModal === "cookies" && "Política de Cookies de Ayat Móviles"}
                    </h2>
                  </div>
                </div>
                
                <button
                  onClick={onCloseModal}
                  className="p-2 bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto text-left text-slate-600 text-xs md:text-sm space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
                
                {/* 1. AVISO LEGAL CONTENT */}
                {activeModal === "aviso" && (
                  <div className="space-y-5 leading-relaxed font-sans">
                    <section className="bg-slate-50 p-4 border border-slate-100 rounded-2xl space-y-2">
                      <p className="font-bold text-slate-900 uppercase tracking-wide text-xs">Información Identificativa LSSI-CE</p>
                      <p>En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se detallan los datos del titular de este portal web:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                        <div><strong className="text-slate-800">Denominación:</strong> Ayat Móviles</div>
                        <div><strong className="text-slate-800">Responsable:</strong> Jakes Rodríguez</div>
                        <div><strong className="text-slate-800">N.I.F. / C.I.F.:</strong> 44797926M</div>
                        <div><strong className="text-slate-800">Dirección:</strong> Elizkale Kalea, 9, BAJO, 20700 Zumarraga, Gipuzkoa</div>
                        <div><strong className="text-slate-800">Teléfono:</strong> 632 44 79 79</div>
                        <div><strong className="text-slate-800">Email:</strong> contacto@ayatmoviles.com</div>
                      </div>
                    </section>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">1. Condiciones Generales de Uso</h3>
                      <p>El acceso y uso de este portal web atribuye la condición de USUARIO e implica la aceptación total de las disposiciones de este Aviso Legal en el momento que se accede a la web.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">2. Propiedad Intelectual e Industrial</h3>
                      <p>Todos los logotipos, textos, ilustraciones, diseños 3D interactivos, imágenes y combinaciones de colores integrados en esta plataforma son propiedad intelectual exclusiva de Ayat Móviles o sus licenciantes. Queda prohibida la reproducción, copia, distribución o alteración del contenido sin previa autorización expresa del administrador.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">3. Exclusión de Responsabilidades</h3>
                      <p>Ayat Móviles no se hace responsable de daños o perjuicios que pudieran derivarse de virus, fallos técnicos, o interrupciones en la conexión web. El presupuesto interactivo obtenido en el simulador web es de carácter orientativo y no constituye un contrato formal hasta su validación física o digital expresa por nuestro personal técnico.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">4. Legislación Aplicable y Jurisdicción</h3>
                      <p>Para la resolución de disputas o controversias relacionadas con el uso de este sitio web, se aplicará de manera exclusiva la legislación española, siendo competentes los juzgados y tribunales del territorio de Gipuzkoa, renunciando el usuario a cualquier otro fuero.</p>
                    </div>
                  </div>
                )}

                {/* 2. POLITICA DE PRIVACIDAD CONTENT */}
                {activeModal === "privacidad" && (
                  <div className="space-y-5 leading-relaxed font-sans">
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl">
                      <Lock className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-bold leading-normal">
                        Sitio web adaptado al Reglamento General de Protección de Datos (RGPD) de la Unión Europea y la LOPDGDD.
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">1. Responsable del Tratamiento de Datos</h3>
                      <p>El responsable de la recogida y tratamiento de tus datos personales a través de esta web es <strong>Jakes Rodríguez (Ayat Móviles)</strong>, con domicilio comercial en Elizkale Kalea, 9, BAJO, Zumarraga, Gipuzkoa y correo de contacto <strong>contacto@ayatmoviles.com</strong>.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">2. Finalidad del Tratamiento</h3>
                      <p>Los datos aportados de manera voluntaria por el usuario (en consultas directas, presupuestos de reparación, chats interactivos o enlaces de contacto) se utilizarán exclusivamente para:</p>
                      <ul className="list-disc pl-5 mt-1.5 space-y-1">
                        <li>Atender consultas y enviar presupuestos de reparación de dispositivos (móviles, tablets, ordenadores).</li>
                        <li>Gestionar la comunicación directa mediante redirección al servicio oficial de WhatsApp de soporte técnico.</li>
                        <li>Analizar estadísticas de uso de nuestra plataforma para mejorar el rendimiento comercial de la tienda.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">3. Legitimación</h3>
                      <p>La base jurídica que legitima el tratamiento de tus datos es el <strong>consentimiento explícito</strong> que otorgas al aceptar esta política de privacidad en nuestro banner de consentimiento o al iniciar voluntariamente una consulta técnica.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">4. Conservación de los Datos</h3>
                      <p>Tus datos se conservarán durante el tiempo estrictamente necesario para cumplir con el fin para el que se recabaron y para determinar las posibles responsabilidades legales que se pudieran derivar del servicio.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">5. Derechos del Usuario (Derechos ARCO-POL)</h3>
                      <p>De acuerdo con el RGPD, dispones de los siguientes derechos que puedes ejercer gratuitamente enviando un email a <strong>contacto@ayatmoviles.com</strong> junto a una copia de tu documento de identidad:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <strong className="text-slate-900 block mb-0.5">Acceso y Rectificación:</strong>
                          Saber qué datos tratamos sobre ti y corregir cualquier información errónea.
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <strong className="text-slate-900 block mb-0.5">Supresión (Olvido):</strong>
                          Solicitar la eliminación total de tus datos personales de nuestras bases de datos.
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <strong className="text-slate-900 block mb-0.5">Oposición y Limitación:</strong>
                          Restringir el uso de tus datos para fines concretos o paralizar su tratamiento.
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <strong className="text-slate-900 block mb-0.5">Portabilidad:</strong>
                          Recibir tus datos personales en formato digital estructurado y de lectura común.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. POLITICA DE COOKIES CONTENT */}
                {activeModal === "cookies" && (
                  <div className="space-y-5 leading-relaxed font-sans">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">¿Qué son las Cookies?</h3>
                      <p>Una cookie es un pequeño fichero de texto que se descarga en tu navegador cuando visitas casi cualquier página web. Su utilidad es que la web sea capaz de recordar tu visita cuando vuelvas a navegar por esa página, almacenando tus preferencias técnicas, estadísticas de uso o configuraciones interactivas.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">¿Qué tipos de Cookies utilizamos?</h3>
                      <p>Este sitio web utiliza cookies de los siguientes grupos:</p>
                      <div className="space-y-3.5 pt-2">
                        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                          <strong className="text-indigo-600 block text-xs uppercase tracking-wide font-mono">1. Cookies Técnicas y de Sesión (Necesarias)</strong>
                          <p className="text-slate-600">Son estrictamente esenciales. Permiten mantener el estado de la web, registrar si has aceptado o rechazado las políticas de privacidad, almacenar el estado de los presupuestos personalizados que diseñas en el panel y facilitar el correcto funcionamiento del modelo 3D interactivo.</p>
                        </div>
                        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                          <strong className="text-indigo-600 block text-xs uppercase tracking-wide font-mono">2. Cookies Analíticas (Opcionales)</strong>
                          <p className="text-slate-600">Procesadas de forma agregada y completamente anónima. Nos ayudan a conocer el volumen de usuarios que nos visitan en Zumarraga, qué secciones de soporte o reparación les interesan más y cómo mejorar la navegación.</p>
                        </div>
                        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                          <strong className="text-indigo-600 block text-xs uppercase tracking-wide font-mono">3. Cookies de Terceros y WhatsApp (Opcionales)</strong>
                          <p className="text-slate-600">Utilizadas para habilitar el widget de chat interactivo inteligente y la conexión instantánea segura con el API de mensajería de WhatsApp para atención al cliente.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">¿Cómo desactivar o configurar las Cookies?</h3>
                      <p>Puedes desactivar o modificar tu aceptación de cookies analíticas y de marketing en cualquier momento abriendo nuestro panel inferior de configuración, o directamente a través de las opciones de configuración de tu propio navegador web:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
                        <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad & Seguridad &gt; Cookies y datos del sitio.</li>
                        <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Cookies y datos de sitios web.</li>
                      </ul>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-150 bg-slate-50/50 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between shrink-0">
                <div className="text-[10px] text-slate-400 font-mono">
                  © 2026 Ayat Móviles | Elizkale Kalea, 9, Zumarraga
                </div>
                <button
                  onClick={onCloseModal}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full text-xs cursor-pointer shadow-md shadow-indigo-600/10 transition-all duration-300"
                >
                  Entendido y Aceptar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
