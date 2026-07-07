import React, { useState } from "react";
import { MapPin, Navigation, Copy, Check, Car, Train, Clock, ParkingSquare, Compass, Info, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function InteractiveMap() {
  const [activeTab, setActiveTab] = useState<"mapa" | "direcciones" | "aparcamiento">("mapa");
  const [routeSource, setRouteSource] = useState<"renfe" | "ayuntamiento" | "donostia" | "gasteiz">("renfe");
  const [copied, setCopied] = useState(false);

  const address = "Elizkale Kalea, 9, BAJO, 20700 Zumarraga, Gipuzkoa";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const routes = {
    renfe: {
      title: "Desde Estación Intermodal (Tren/Renfe y Bus)",
      type: "walking",
      time: "5 min",
      distance: "400 m",
      steps: [
        "Sal de la estación hacia la Plaza de la Estación (Jai Alai).",
        "Cruza el puente peatonal sobre el río hacia Zumarraga.",
        "Sigue recto por la calle Elizkale Kalea.",
        "Nos encontrarás a mano derecha en el número 9, frente a la zona peatonal."
      ]
    },
    ayuntamiento: {
      title: "Desde el Ayuntamiento de Zumarraga",
      type: "walking",
      time: "3 min",
      distance: "250 m",
      steps: [
        "Sal de la Plaza de Euskadi (frente al Ayuntamiento).",
        "Camina en dirección norte por Elizkale Kalea.",
        "Sigue recto cruzando la intersección de Soraluze Kalea.",
        "La tienda Ayat Móviles se encuentra en el número 9 a la izquierda."
      ]
    },
    donostia: {
      title: "En coche desde Donostia / San Sebastián",
      type: "driving",
      time: "40 min",
      distance: "53 km",
      steps: [
        "Toma la autovía AP-8 en dirección Bilbao/Vitoria.",
        "Toma la salida hacia la autovía GI-632 (Beasain/Bergara).",
        "Sigue las indicaciones hacia Zumarraga/Urretxu.",
        "Toma la salida Zumarraga Centro y dirígete al aparcamiento Zelai Arizti."
      ]
    },
    gasteiz: {
      title: "En coche desde Vitoria-Gasteiz",
      type: "driving",
      time: "45 min",
      distance: "55 km",
      steps: [
        "Toma la autovía A-1 en dirección Alsasua/San Sebastián.",
        "Toma la salida hacia la carretera GI-2637 en dirección Idiazabal/Segura.",
        "Conecta con la GI-632 dirección Zumarraga.",
        "Entra por Zumarraga Sur y aparca en el parking gratuito de la Estación."
      ]
    }
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-full font-sans">
      
      {/* Top Controller Bar */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Navegación Interactiva</span>
        </div>
        
        {/* Tab Controls */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("mapa")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "mapa" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Mapa en Vivo
          </button>
          <button
            onClick={() => setActiveTab("direcciones")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "direcciones" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Cómo Llegar
          </button>
          <button
            onClick={() => setActiveTab("aparcamiento")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === "aparcamiento" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Parking
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-[380px] relative bg-slate-950">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Live Interactive OpenStreetMap */}
          {activeTab === "mapa" && (
            <motion.div
              key="mapa"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full flex flex-col"
            >
              <div className="relative flex-1 w-full h-full min-h-[300px]">
                {/* Embedded Interactive OSM Iframe centered on Zumarraga address coordinates */}
                <iframe
                  title="Mapa de Ayat Móviles en Zumarraga"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-2.3182%2C43.0838%2C-2.3112%2C43.0888&amp;layer=mapnik&amp;marker=43.0863%2C-2.3147"
                  className="w-full h-full border-none opacity-85 contrast-[1.05] invert-[0.9] hue-rotate-[200deg]"
                  allowFullScreen
                />
                
                {/* Floating Map Accent HUD */}
                <div className="absolute top-4 left-4 right-4 sm:right-auto bg-slate-950/90 border border-slate-800/85 p-3.5 rounded-2xl backdrop-blur-md shadow-xl flex flex-col gap-1.5 max-w-[280px]">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Tienda Física Oficial</span>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500 animate-bounce" />
                    AYAT MÓVILES
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Elizkale Kalea, 9, Zumarraga.<br/>A pie de calle, acceso adaptado.
                  </p>
                </div>

                <div className="absolute bottom-4 right-4 flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://maps.google.com/?q=Elizkale+Kalea+9+Zumarraga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-indigo-950/50 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Custom Guided Directions / Routing Selector */}
          {activeTab === "direcciones" && (
            <motion.div
              key="direcciones"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 p-5 overflow-y-auto space-y-4"
            >
              <div className="flex flex-col gap-1.5 text-left">
                <h3 className="text-sm font-bold text-white">Ruta de acceso personalizada</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Selecciona tu origen para ver indicaciones paso a paso detalladas hacia nuestra tienda técnica:
                </p>
              </div>

              {/* Route Selector Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "renfe", label: "Renfe/Bus", icon: Train },
                  { id: "ayuntamiento", label: "Plaza/Ayto.", icon: Compass },
                  { id: "donostia", label: "San Sebastián", icon: Car },
                  { id: "gasteiz", label: "Vitoria", icon: Car }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setRouteSource(item.id as any)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all cursor-pointer ${
                        routeSource === item.id 
                          ? "bg-indigo-500/10 border-indigo-500 text-white shadow-lg" 
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${routeSource === item.id ? "text-indigo-400" : "text-slate-500"}`} />
                      <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Steps Box */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    {routeSource === "renfe" || routeSource === "ayuntamiento" ? (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[9px] font-mono font-bold uppercase">A pie</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[9px] font-mono font-bold uppercase">En coche</span>
                    )}
                    {routes[routeSource].title}
                  </span>
                  
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {routes[routeSource].time}
                    </span>
                    <span className="text-slate-700">|</span>
                    <span>{routes[routeSource].distance}</span>
                  </div>
                </div>

                <ol className="space-y-3">
                  {routes[routeSource].steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3 text-xs text-slate-300 leading-normal">
                      <span className="flex items-center justify-center w-5 h-5 bg-slate-900 border border-slate-800 text-[10px] font-mono text-indigo-400 font-bold rounded-full shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Parking Guidance */}
          {activeTab === "aparcamiento" && (
            <motion.div
              key="aparcamiento"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 p-5 overflow-y-auto space-y-4 text-left"
            >
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ParkingSquare className="w-4.5 h-4.5 text-indigo-400" />
                  Aparcamiento Cercano en Zumarraga
                </h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Si vienes en vehículo para dejar o recoger un dispositivo técnico, te recomendamos los siguientes estacionamientos cómodos y cercanos:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Parking 1 */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">Parking Zelai Arizti</span>
                      <span className="px-1.5 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-mono rounded font-bold uppercase">Subterráneo</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Aparcamiento cubierto de pago a menos de 1 minuto andando. Muy seguro y cómodo para reparaciones urgentes.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-900 pt-2.5">
                    <span>Distancia: 100 m</span>
                    <span className="text-indigo-400 font-bold">1 min a pie</span>
                  </div>
                </div>

                {/* Parking 2 */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">Parking Estación Renfe</span>
                      <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono rounded font-bold uppercase">Gratuito</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Aparcamiento exterior público gratuito las 24 horas del día junto a la estación intermodal.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-900 pt-2.5">
                    <span>Distancia: 450 m</span>
                    <span className="text-emerald-400 font-bold">5 min a pie</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-200/80 leading-normal">
                  <strong>Zona de Carga y Descarga:</strong> Hay zonas de aparcamiento rápido temporales justo en los alrededores de la calle Elizkale, ideales para dejar un móvil o recoger un presupuesto en menos de 5 minutos.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom Info HUD & Quick Actions */}
      <div className="p-4.5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 text-left">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-indigo-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-wider">Dirección Postal</span>
            <span className="text-xs text-slate-300 font-semibold">{address}</span>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopyAddress}
            className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            title="Copiar dirección completa al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">¡Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
