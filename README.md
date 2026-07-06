# Ayat Móviles

Sitio web oficial y asistente virtual inteligente de **Ayat Móviles**, tienda física de venta y reparación exprés de teléfonos móviles, tablets y accesorios en Zumarraga (Gipuzkoa).

Este repositorio contiene una aplicación web interactiva moderna diseñada con estética premium, animaciones avanzadas e integraciones inteligentes.

---

## 📱 Estructura de la Aplicación (Secciones y Componentes)

La web de Ayat Móviles está construida en una arquitectura Single Page Application (SPA) modularizada. A continuación se detalla para qué sirve cada apartado y componente:

### 1. 🏝️ Menú de Navegación Dinámico (`Floating Navigation Island`)
* **Ubicación:** Superior fija (`fixed`).
* **Función:** Actúa como una "isla dinámica" compacta que se expande al hacer clic en ella. Permite al usuario navegar suavemente a través de las distintas secciones del sitio y ofrece un botón de acceso directo rápido a WhatsApp.

### 2. ⚡ Sección de Inicio / Hero (`#inicio`)
* **Ubicación:** Bloque de entrada del sitio.
* **Componente clave:** `ThreeSmartphone.tsx` (Renderizador interactivo de un dispositivo móvil en 3D utilizando **Three.js**).
* **Función:** Captar la atención del usuario a primera vista. Presenta la marca Ayat Móviles y expone de forma directa cuatro insignias de confianza clave:
  * **Reparación Exprés:** La mayoría de averías listas en 1 hora.
  * **Garantía Real de 6 meses:** En piezas y mano de obra.
  * **Punto Pack Oficial:** Gestión de paquetería de Mondial Relay.
  * **Protección LOPD:** Confidencialidad absoluta de los datos del dispositivo.

### 3. 📂 Catálogo de Servicios Bento Grid (`#servicios`)
* **Ubicación:** Grid de servicios principales.
* **Función:** Presenta visualmente de forma estructurada e interactiva (con efectos de zoom) los servicios que ofrece la tienda física:
  * **Tienda física:** Compra y consulta de smartphones nuevos, seminuevos y reacondicionados.
  * **Accesorios:** Fundas premium, protectores de pantalla y cargadores rápidos.
  * **Punto Pack Autorizado:** Indicador de estado en tiempo real (abierto/cerrado) para envíos y recogidas.
  * **Soporte a Domicilio:** Entrega y asistencia técnica especial en el entorno local.

### 4. 🧮 Simulador / Calculadora de Presupuestos
* **Ubicación:** Sección intermedia de la página principal.
* **Función:** Permite al usuario obtener un presupuesto estimado y transparente al instante. Funciona de manera interactiva:
  1. El cliente selecciona la **marca** (Apple, Samsung, Xiaomi o Genérico).
  2. Escoge el **modelo** específico a través de un desplegable dinámico.
  3. Selecciona la **avería** (Pantalla rota, cambio de batería, conector de carga, cámara/cristal trasero o limpieza por humedad).
  * **Resultado:** Muestra el precio estimado de la reparación final con repuestos grado AAA, IVA y mano de obra incluidos, el tiempo de reparación promedio y un botón directo que genera un enlace a WhatsApp con un mensaje preestablecido indicando la cita deseada.

### 5. 💬 Simulador de Chat de WhatsApp (`#whatsapp`)
* **Ubicación:** Bloque interactivo de mensajería rápida.
* **Función:** Simula la pantalla de un smartphone real con una conversación de WhatsApp. Cuenta con botones rápidos predefinidos (consulta por pantalla rota, dudas de batería, información de Mondial Relay, etc.). El usuario puede modificar el texto de la plantilla directamente en un cuadro de diálogo y enviarlo de forma inmediata al número oficial de la tienda.

### 6. ⭐ Opiniones y Testimonios (`#valoraciones`)
* **Ubicación:** Módulo de prueba social.
* **Función:** Muestra opiniones de clientes reales importadas de **Google Reviews** (puntuación perfecta de 5.0 / 5) presentadas en tarjetas elegantes que reaccionan al movimiento físico del cursor.

### 7. ❓ Preguntas Frecuentes Accordion (`FAQSection.tsx` / `#faq`)
* **Ubicación:** Sección inferior de dudas habituales.
* **Función:** Componente de acordeón interactivo y responsive para resolver las dudas recurrentes sobre costes de diagnóstico, pérdida de datos, reparaciones cubiertas por seguros y uso del Punto Pack sin recargos.

### 8. 📍 Ubicación, Contacto y Horarios (`#contacto`)
* **Ubicación:** Bloque previo al footer.
* **Función:** Muestra la localización física con un mapa interactivo de Zumarraga (Elizkale Kalea, 9, BAJO), el teléfono de contacto oficial (+34 632 447 979) y una tabla detallada que especifica las horas de apertura en días laborables y sábados.

### 9. 🤖 Asistente Virtual Inteligente IA (`ChatBot.tsx`)
* **Ubicación:** Botón flotante persistente en la esquina inferior derecha.
* **Función:** Es un chatbot impulsado por la API de **Gemini** que actúa como asistente de Ayat Móviles. Ha sido configurado y entrenado con directrices específicas de la tienda para proporcionar respuestas amigables en español sobre tarifas, ubicaciones, horarios de entrega de Punto Pack y stock, derivando las consultas más complejas directamente al WhatsApp del equipo humano.

---

## 🛠️ Tecnologías del Proyecto

* **Frontend:** React 19 (con TypeScript), Vite 6, Tailwind CSS 4, Motion/React, Three.js y Lucide Icons.
* **Backend:** Express Server (Node.js en TypeScript con `tsx`).
* **IA/LLM:** SDK oficial de Google Gen AI (`@google/genai`).

