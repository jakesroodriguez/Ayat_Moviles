import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini initialization
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Chat API route proxying Gemini content generation safely
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request body: 'messages' array is required." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server. Please check your Secrets." });
      }

      // Convert messages to Gemini format: role must be 'user' or 'model' (or we map role 'assistant' to 'model')
      const formattedContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const systemInstruction = `Eres el asistente virtual inteligente oficial de "AYAT MÓVILES", una tienda de tecnología y reparación de teléfonos móviles de primer nivel ubicada en Zumarraga, Gipuzkoa.
Tus respuestas deben ser siempre profesionales, amables, claras y orientadas a ayudar al cliente. Responde siempre en español.

Información clave sobre AYAT MÓVILES que debes conocer y usar cuando te pregunten:
- Dirección: Elizkale Kalea, 9, BAJO, 20700 Zumarraga, Gipuzkoa.
- Teléfono/WhatsApp: 632 44 79 79.
- Horario de Atención:
  * Lunes a Viernes: 10:00 a 14:00 y de 16:30 a 20:30.
  * Sábado: 10:00 a 14:00 y de 16:30 a 20:30.
  * Domingo: Cerrado.
- Servicios principales:
  1. Tienda de Móviles: Venta de teléfonos nuevos y seminuevos de las mejores marcas (iPhone, Samsung, Xiaomi, etc.), tablets, accesorios (fundas, protectores de pantalla, cargadores).
  2. Servicio de Reparaciones Exprés: Cambios de pantalla rota, reemplazo de batería, reparación de conector de carga, problemas de software, mojados, etc., con garantía.
  3. Punto Pack oficial: Retirada y envío cómodo de paquetes (Mundial Relay / Punto Pack).
  4. Soporte y Asistencia a Domicilio: Entrega de terminales y ayuda técnica directa en el hogar para personas con dificultades.
  5. Espacio Seguro: Tratamiento confidencial de datos y privacidad absoluta para tu dispositivo.

Intenta guiar a los clientes para que visiten la tienda, llamen por teléfono o manden un WhatsApp si necesitan un presupuesto de reparación específico. Sé empático, cercano y muy servicial.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "Lo siento, no he podido procesar tu solicitud. Por favor, inténtalo de nuevo.";
      res.json({ content: responseText });
    } catch (error: any) {
      console.error("Error communicating with Gemini API:", error);
      res.status(500).json({ error: error?.message || "Ocurrió un error en el servidor al conectar con el asistente." });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
