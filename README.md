# Ayat Móviles

Sitio web oficial y asistente virtual interactivo de **Ayat Móviles**, tienda de venta y reparación exprés de teléfonos móviles, tablets y accesorios en Zumarraga (Gipuzkoa).

## Características

- 📱 **Servicios de Reparación:** Información detallada sobre cambios de pantalla, baterías, conectores de carga y soporte técnico.
- 🗺️ **SEO Local & Mapa Interactivo:** Optimizado con Schema Markup (`LocalBusiness` en JSON-LD) para visibilidad en Google Maps e información local.
- 📦 **Punto Pack Oficial:** Información de recogida y envío de paquetes a través de Mondial Relay.
- 💬 **Asistente Virtual IA:** Integración con la API de Gemini para responder dudas sobre presupuestos, horarios, reparaciones y localización en tiempo real de forma autónoma.
- ✨ **Experiencia Visual Premium:** Interfaz interactiva 3D con Three.js, animaciones fluidas con Motion, y un diseño responsive elegante.

## Tecnologías Utilizadas

- **Frontend:** React, TypeScript, Tailwind CSS, Motion, Lucide React, Three.js
- **Backend:** Express, Node.js, TypeScript (con `tsx` para desarrollo)
- **IA/LLM:** SDK oficial de Google Gen AI (`@google/genai`)

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Una clave de API de Gemini (puedes obtenerla en [Google AI Studio](https://aistudio.google.com/))

## Instalación y Configuración

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar las variables de entorno:**
   Copia el archivo de ejemplo para crear tu archivo local:
   ```bash
   cp .env.example .env.local
   ```
   Abre el archivo `.env.local` y añade tu clave de API de Gemini:
   ```env
   GEMINI_API_KEY=tu_gemini_api_key_aqui
   ```

3. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   El servidor se iniciará en `http://localhost:3000`.

## Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

- `npm run dev`: Inicia el servidor de desarrollo y carga la app mediante Vite.
- `npm run build`: Compila el frontend en `dist/` y empaqueta el servidor Node.js en `dist/server.cjs`.
- `npm run start`: Inicia el servidor de producción compilado.
- `npm run lint`: Ejecuta el comprobador de tipos de TypeScript.

