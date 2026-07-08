import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  AlertCircle,
  MapPin,
  Clock,
  Truck,
  Wrench
} from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Try to restore from localStorage if exists
    const saved = localStorage.getItem("ayat_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      } catch (e) {
        // Fallback to default
      }
    }
    return [
      {
        id: "welcome",
        role: "assistant",
        content: "¡Hola! 👋 Soy el asistente inteligente de Ayat Móviles. ¿En qué puedo ayudarte hoy? Pregúntame sobre reparaciones, horarios, ubicación o nuestro servicio de Punto Pack.",
        timestamp: new Date()
      }
    ];
  });
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Save to localStorage
    localStorage.setItem("ayat_chat_history", JSON.stringify(messages));
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Filter out the welcome message so that the conversation starts with a 'user' turn as required by the Gemini API
      const filteredMessages = [...messages, userMessage].filter(m => m.id !== "welcome");

      const chatHistoryForAPI = filteredMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: chatHistoryForAPI })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ocurrió un error inesperado al conectar con el asistente.");
      }

      const data = await res.json();
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo recibir respuesta del asistente. Comprueba la conexión o inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const clearHistory = () => {
    if (window.confirm("¿Seguro que quieres borrar la conversación actual?")) {
      const initialWelcome: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content: "¡Hola de nuevo! 👋 ¿En qué puedo ayudarte ahora?",
        timestamp: new Date()
      };
      setMessages([initialWelcome]);
      localStorage.removeItem("ayat_chat_history");
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="chat-toggle-btn"
        className="fixed bottom-6 right-6 z-50 bg-white/85 backdrop-blur-2xl text-indigo-600 hover:bg-indigo-600 hover:text-white p-2.5 sm:p-3 rounded-full shadow-[0_12px_30px_rgba(99,102,241,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-indigo-100 hover:border-indigo-600 transition-all duration-300 flex items-center justify-center group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white animate-pulse" />
        </div>
      </motion.button>

      {/* Chat Drawer Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-drawer"
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[550px] bg-white/90 backdrop-blur-3xl border border-white/80 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)] z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0f0724] to-indigo-950 text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative p-2 bg-white/10 rounded-xl">
                  <Bot className="w-5 h-5 text-indigo-300" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-[#0f0724]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-tight flex items-center gap-1.5 text-white">
                    Asistente de Ayat Móviles
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-pulse" />
                  </h3>
                  <span className="text-xs text-white/70 block">En línea • Especialista en tecnología</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearHistory}
                  className="text-xs text-white/55 hover:text-white transition-colors px-2.5 py-1 hover:bg-white/5 rounded-md"
                  title="Borrar historial de chat"
                >
                  Borrar
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-thin bg-slate-50/50">
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isAssistant ? "self-start" : "self-end flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                        isAssistant
                          ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                          : "bg-indigo-600 text-white"
                      }`}
                    >
                      {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div
                        className={`p-3 rounded-2xl text-sm leading-relaxed ${
                          isAssistant
                            ? "bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm"
                            : "bg-indigo-600 text-white rounded-tr-none shadow-sm font-medium"
                        }`}
                      >
                        {message.content}
                      </div>
                      <span className={`text-[10px] px-1 self-start ${isAssistant ? "text-slate-400" : "text-indigo-400"}`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Chat loading states */}
              {isLoading && (
                <div className="flex items-start gap-2.5 max-w-[85%] self-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1 shadow-sm">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-xl text-xs border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2.5 bg-slate-100/80 border-t border-slate-200 flex flex-wrap gap-1.5 shrink-0">
                <button
                  onClick={() => handleQuickQuestion("¿Cuál es vuestro horario de atención?")}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all text-xs px-3 py-1.5 rounded-full text-slate-700 font-bold cursor-pointer shadow-sm"
                >
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  Horario
                </button>
                <button
                  onClick={() => handleQuickQuestion("¿Dónde está ubicada la tienda?")}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all text-xs px-3 py-1.5 rounded-full text-slate-700 font-bold cursor-pointer shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  Dirección
                </button>
                <button
                  onClick={() => handleQuickQuestion("¿Cómo funciona el Punto Pack?")}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all text-xs px-3 py-1.5 rounded-full text-slate-700 font-bold cursor-pointer shadow-sm"
                >
                  <Truck className="w-3.5 h-3.5 text-indigo-600" />
                  Punto Pack
                </button>
                <button
                  onClick={() => handleQuickQuestion("¿Qué servicios de reparación ofrecéis?")}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all text-xs px-3 py-1.5 rounded-full text-slate-700 font-bold cursor-pointer shadow-sm"
                >
                  <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                  Reparaciones
                </button>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Escribe tu consulta aquí..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-slate-50 text-slate-900 placeholder-slate-400 px-4 py-2.5 rounded-full text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-indigo-600 text-white p-2.5 rounded-full hover:bg-indigo-700 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:scale-100 flex items-center justify-center cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
