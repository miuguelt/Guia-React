# Guía React — SENA ADSO

Guía de aprendizaje práctica e interactiva para el desarrollo de aplicaciones web con **React 19/18**, **Vite** y consumo de endpoints de **Spring Boot 3.5**.

---

## 🎯 Objetivo de la Guía
Llevar al aprendiz desde los fundamentos ("Hola Mundo", JSX, Vite, Layouts maestros, Menú Hamburguesa responsive) hasta la construcción de aplicaciones completas con Modales, Mensajes Flotantes (Toasts), Tablas responsivas, CRUD completo N:M sobre el dominio **Fincas y Cultivos (Santander, Colombia)** y programación asistida por Inteligencia Artificial.

---

## 🌐 Conexión con Spring Boot
* **Frontend React (Vite):** `http://localhost:5173` (o guía servida en `http://localhost:8030`)
* **Backend Spring Boot:** `http://localhost:31026/api`
* **Base de Datos:** PostgreSQL en `localhost:5434`
* **Endpoints consumidos:**
  - `GET /api/hello` — Verificación de conectividad
  - `GET/POST/PUT/DELETE /api/fincas` — CRUD de Fincas
  - `GET/POST/PUT/DELETE /api/cultivos` — CRUD de Cultivos
  - `GET/POST/DELETE /api/finca-cultivos` — Relación Muchos a Muchos (N:M)

---

## 📚 Módulos de Aprendizaje

| # | Módulo | Foco Técnico y Práctico |
|---|--------|-------------------------|
| **M1** | **Mentalidad React** | DOM Imperativo vs Declarativo, Virtual DOM y Reconciliation. |
| **M2** | **Setup y Hola Mundo** | Node.js, `npm create vite@latest`, variables `.env` y arranque con HMR. |
| **M3** | **Componentes y Props** | Componentes funcionales, Props, desestructuración, `.map()` con `key` única. |
| **M4** | **Layouts & Menú Hamburguesa** | Mobile-First desde 320px, Drawer móvil animado, backdrop desenfocado y accesibilidad ARIA. |
| **M5** | **Estado & Formularios** | `useState`, inmutabilidad con spread `...`, formularios controlados y validación. |
| **M6** | **Efectos & Ciclo de Vida** | `useEffect`, arreglo de dependencias, cleanup y prevención de memory leaks. |
| **M7** | **Consumo de Spring Boot** | Cliente `api.js` (Fetch/Axios), solución a errores CORS, y los 4 estados UI (`Loading`, `Success`, `Error`, `Empty`). |
| **M8** | **Componentes UI para CRUD** | Modales accesibles (Dialogs), Mensajes Flotantes (Toasts) y Tablas responsivas que se convierten en cards. |
| **M9** | **CRUD Completo N:M** | Crear (Modal POST), Listar (GET), Editar (Modal PUT), Eliminar (DELETE) y Gestión N:M Finca-Cultivo. |
| **M10** | **Desarrollo con IA** | Prompts estructurados para Copilot/Claude/ChatGPT: generación de hooks, tipado y depuración. |
| **M11** | **Simuladores en Vivo** | Spring Boot API Tester, CRUD Studio interactivo, Mobile Layout Simulator y Visualizador de Hooks. |
| **M12** | **Retos y Portafolio** | Gestor de Cultivos, Asignación N:M y Proyecto Integrador "AgroManager React + Spring Boot". |

---

## ⚡ Inicio Rápido

### Servir la Guía Web Interactiva
```powershell
.\start-windows.ps1
```
Abre en tu navegador: [http://localhost:8030](http://localhost:8030)

### Crear tu Propio Proyecto React con Vite
```powershell
npm create vite@latest fincas-react -- --template react
cd fincas-react
npm install
npm run dev
```

---

## 📁 Estructura del Repositorio
```
Guia React/
├── web/                          # Guía web interactiva (Puerto 8030)
│   ├── index.html                # SPA con 12 módulos y drawer accesible
│   ├── css/styles.css            # Tema Glassmorphism Mobile-First (320px a 2560px)
│   └── js/
│       ├── main.js               # Controlador SPA, Toasts flotantes y Modales
│       ├── modules-content.js    # Contenido didáctico y snippets de código
│       ├── simulators.js         # Simuladores en vivo (Spring Tester, CRUD, Layout)
│       ├── code-renderer.js      # Resaltador de sintaxis con Prism y AI Prompts
│       └── gamification.js       # Sistema de XP y niveles de maestría
├── recursos/
│   └── codigo-ejemplo/           # Código fuente React completo y funcional
│       ├── src/
│       │   ├── components/       # Navbar, Modal, Toast, TablaFincas, FincaCard, etc.
│       │   ├── pages/            # Home, FincasCrudPage
│       │   ├── services/         # api.js con conexión a Spring Boot (31026)
│       │   └── hooks/            # useFetch
│       └── package.json
├── CORTEX_MAP.md                 # Arquitectura y mapa de servicios
└── start-windows.ps1             # Lanzador de la guía web en Windows
```
