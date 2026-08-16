/**
 * MODULES CONTENT - Guia React 19 & Spring Boot 3.5 API (SENA ADSO)
 * Contenido didactico de profundidad senior, explicaciones paso a paso, diagramas y prompts para IA.
 */

const MODULES_CONTENT = {

    // ── MÓDULO 1: FUNDAMENTOS Y MENTALIDAD REACT ──
    'm-reflexion': {
        codeBlocks: [
            {
                file: 'teoria/arquitectura-react.md',
                lang: 'markdown',
                title: 'Arquitectura Interna: Virtual DOM, Reconciliation y React Fiber',
                code: `### 🧠 ¿Cómo funciona React por dentro?

1. **Virtual DOM (VDOM):** Es un árbol de objetos JavaScript en memoria que representa la estructura visual del HTML.
2. **Reconciliation (Algoritmo Diffing):** Cuando el estado de un componente cambia:
   - React genera un NUEVO árbol de Virtual DOM.
   - Compara el árbol nuevo con el anterior usando una heurística O(n).
   - Identifica con precisión matemática qué nodos del DOM real necesitan modificarse.
3. **React Fiber (Motor de Renderizado):** Divide el trabajo de renderizado en unidades pequeñas (chunks) y puede pausar, abortar o reutilizar trabajo según la prioridad de la pantalla, garantizando 60 FPS fluidos.

### ⚖️ Comparativa de Enfoques:
- **Imperativo (Vanilla JS / jQuery):** *TÚ* eres el obrero que pega cada ladrillo manualmente con \`document.getElementById()\`. Si olvidas actualizar un nodo, la UI queda inconsistente.
- **Declarativo (React):** *TÚ* eres el arquitecto que diseña los planos según los datos (\`UI = f(State)\`). React se encarga de construir y sincronizar la pantalla.`
            },
            {
                file: 'src/vanilla-vs-react/imperative.js',
                lang: 'javascript',
                title: '1. Enfoque Imperativo tradicional (DOM manual propenso a errores)',
                code: `// Enfoque Imperativo: TÚ le dices al navegador CADA PASO manual
const btn = document.getElementById('contador-btn');
const display = document.getElementById('contador-display');
let count = 0;

btn.addEventListener('click', () => {
    count++;
    display.textContent = \`Clics: \${count}\`;
    
    // Tienes que sincronizar manualmente la clase y el color
    if (count >= 5) {
        display.classList.add('alerta-activa');
        display.style.color = '#10b981';
    }
});
// ❌ Desventaja: Si la app crece, el DOM manual se vuelve inmanejable y propenso a inconsistencias.`
            },
            {
                file: 'src/components/ContadorDeclarativo.jsx',
                lang: 'jsx',
                title: '2. Enfoque Declarativo en React 19 (El estado manda)',
                code: `// Enfoque Declarativo: TÚ describes CÓMO debe verse la UI según el estado.
import { useState } from 'react';

export default function ContadorDeclarativo() {
    const [count, setCount] = useState(0);

    return (
        <div className="contador-box">
            <p className={count >= 5 ? 'alerta-activa text-success' : 'text-normal'}>
                Clics: <strong>{count}</strong>
            </p>
            <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)}>
                Incrementar
            </button>
        </div>
    );
}
// ✅ Ventaja: El código es predecible, reutilizable y React solo actualiza lo que cambió.`
            },
            {
                type: 'prompt',
                text: 'Explica la diferencia entre el DOM real y el Virtual DOM en React 19 usando una analogía cotidiana para un aprendiz de desarrollo de software.\nIncluye un ejemplo sencillo donde se evidencie por qué React es más rápido y eficiente que manipular el document.getElementById() manualmente.',
                tool: 'Claude / ChatGPT / Copilot',
                tip: 'Pídele que use analogías como un borrador de arquitecto vs la construcción final.'
            }
        ]
    },

    // ── MÓDULO 2: PRIMER PROYECTO REACT (SETUP Y HOLA MUNDO) ──
    'm-entorno': {
        codeBlocks: [
            {
                file: 'teoria/estructura-proyecto.md',
                lang: 'markdown',
                title: 'Estructura Estándar Profesional en Proyectos React + Spring Boot',
                code: `📁 mi-fincas-app/
├── 📁 public/                 # Archivos estáticos directos (favicon, logos)
├── 📁 src/
│   ├── 📁 assets/             # Imágenes, iconos y fuentes procesadas
│   ├── 📁 components/         # Componentes UI reutilizables
│   │   ├── 📁 ui/             # Botones, Modales, Toasts, Skeletons
│   │   └── 📁 layout/         # Navbar, Sidebar drawer, Footer
│   ├── 📁 context/            # AuthContext, ThemeContext, NotificationContext
│   ├── 📁 hooks/              # Custom Hooks (useFetch, useDebounce, useAuth)
│   ├── 📁 pages/              # Vistas principales (FincasPage, CultivosPage)
│   ├── 📁 services/           # Clientes HTTP hacia Spring Boot (api.js)
│   ├── 📄 App.jsx             # Enrutador principal y layout
│   ├── 📄 main.jsx            # Punto de montaje ReactDOM en #root
│   └── 📄 index.css           # Tokens de diseño y estilos globales
├── 📄 .env                    # Variables de entorno (VITE_API_URL)
├── 📄 vite.config.js          # Configuración del empaquetador y Proxy
└── 📄 package.json            # Dependencias y scripts de ejecución`
            },
            {
                file: 'terminal / powershell',
                lang: 'bash',
                title: '1. Creación del proyecto con Vite',
                code: `# 1. Crear proyecto React usando Vite (rápido y moderno)
npm create vite@latest fincas-react-app -- --template react

# 2. Ingresar a la carpeta del proyecto
cd fincas-react-app

# 3. Instalar dependencias base
npm install

# 4. Iniciar el servidor de desarrollo local (HMR activo)
npm run dev

# 🌐 Tu aplicación estará disponible en: http://localhost:5173/`
            },
            {
                file: '.env',
                lang: 'bash',
                title: '2. Configurar Variable de Entorno para Spring Boot',
                code: `# Conexión con la API Spring Boot (Puerto 31026)
VITE_API_URL=http://localhost:31026/api
VITE_APP_TITLE=Fincas y Cultivos ADSO`
            },
            {
                file: 'src/main.jsx',
                lang: 'jsx',
                title: '3. Punto de entrada de React (src/main.jsx)',
                code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Montamos la aplicación React en el elemento #root del index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`
            },
            {
                file: 'src/App.jsx',
                lang: 'jsx',
                title: '4. Hola Mundo Profesional (src/App.jsx)',
                code: `function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <main className="app-container">
      <header className="hero-header">
        <h1>🌱 Bienvenido a Fincas App</h1>
        <p className="lead">Sistema de Gestión de Fincas y Cultivos - SENA ADSO</p>
        <span className="badge-status">API Spring Boot: {apiUrl}</span>
      </header>
    </main>
  );
}

export default App;`
            },
            {
                type: 'prompt',
                text: 'Genera la estructura de carpetas estándar profesional para un proyecto React + Vite que consumirá una API REST de Spring Boot.\nDebe incluir carpetas para: components (ui, layout), pages, services, hooks, context y assets.\nExplica brevemente la responsabilidad de cada carpeta.',
                tool: 'Antigravity / ChatGPT',
                tip: 'Mantener la estructura organizada evita refactorizaciones dolorosas a futuro.'
            }
        ]
    },

    // ── MÓDULO 3: COMPONENTES Y PROPS ──
    'm-componentes': {
        codeBlocks: [
            {
                file: 'teoria/reglas-componentes.md',
                lang: 'markdown',
                title: 'Principios Fundamentales de Componentes y Props',
                code: `### 📌 Reglas de Oro en React:
1. **Flujo de Datos Unidireccional:** Las Props viajan de arriba hacia abajo (del padre al hijo). Un hijo NUNCA debe modificar sus props directamente (las props son de solo lectura / inmutables).
2. **Funciones Puras:** Dado el mismo conjunto de props y estado, un componente siempre debe retornar el mismo JSX sin alterar variables globales.
3. **Composición sobre Herencia:** Usa la prop \`children\` para crear contenedores reutilizables como tarjetas, modales y layouts.
4. **Regla de la Key en Listas:** Cuando uses \`.map()\`, usa siempre un identificador único (\`key={finca.id}\`). NUNCA uses el índice del array si los elementos pueden ordenarse, agregarse o eliminarse.`
            },
            {
                file: 'src/components/FincaCard.jsx',
                lang: 'jsx',
                title: 'Componente FincaCard con Props y Desestructuración',
                code: `// Un componente es una función que retorna JSX.
// Recibe "props" (parámetros) para personalizar su contenido.
export default function FincaCard({ nombre, propietario, vereda, municipio, hectareas, onVerDetalle }) {
  return (
    <article className="finca-card">
      <div className="finca-card-header">
        <h3>🏡 {nombre}</h3>
        <span className="badge-ha">{hectareas} ha</span>
      </div>
      <div className="finca-card-body">
        <p><strong>Propietario:</strong> {propietario}</p>
        <p><strong>Ubicación:</strong> {vereda}, {municipio}</p>
      </div>
      <div className="finca-card-footer">
        <button className="btn btn-sm btn-primary" onClick={onVerDetalle}>
          Ver Cultivos Asociados
        </button>
      </div>
    </article>
  );
}`
            },
            {
                file: 'src/components/FincaLista.jsx',
                lang: 'jsx',
                title: 'Renderizado de Listas con .map() y Key única',
                code: `import FincaCard from './FincaCard';

export default function FincaLista({ fincas, onSeleccionarFinca }) {
  if (!fincas || fincas.length === 0) {
    return (
      <div className="empty-state">
        <p>⚠️ No hay fincas registradas aún en el sistema.</p>
      </div>
    );
  }

  return (
    <div className="fincas-grid">
      {fincas.map(finca => (
        <FincaCard 
          key={finca.id}
          nombre={finca.nombre}
          propietario={finca.propietario}
          vereda={finca.vereda}
          municipio={finca.municipio}
          hectareas={finca.hectareas}
          onVerDetalle={() => onSeleccionarFinca(finca)}
        />
      ))}
    </div>
  );
}`
            },
            {
                type: 'prompt',
                text: 'Crea un componente CultivoCard en React 19 que reciba por props: { nombre, tipo, cicloDias, estado }.\n- Si tipo es "permanente", muestra una insignia verde, si es "transitorio" una amarilla.\n- Si cicloDias > 180, muestra un icono de reloj de arena.\n- Utiliza desestructuración de props con valores por defecto.',
                tool: 'Copilot / Claude',
                tip: 'Prueba renderizarlo dentro de una cuadrícula CSS responsiva.'
            }
        ]
    },

    // ── MÓDULO 4: LAYOUTS MAESTROS Y MENÚ HAMBURGUESA MOBILE-FIRST ──
    'm-layout': {
        codeBlocks: [
            {
                file: 'src/components/Navbar.jsx',
                lang: 'jsx',
                title: 'Barra de Navegación con Menú Hamburguesa Accesible',
                code: `import { useState } from 'react';

export default function Navbar({ activeSection, onNavigate }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(prev => !prev);
  const handleNavClick = (section) => {
    onNavigate(section);
    setMenuAbierto(false); // Cierra el menú al hacer clic en móvil
  };

  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <span className="brand-logo">🌿</span>
        <span className="brand-name">AgroManager <strong>Santander</strong></span>
      </div>

      {/* Botón Hamburguesa solo visible en móviles y tablets */}
      <button 
        className="hamburger-btn" 
        onClick={toggleMenu} 
        aria-label="Abrir menú de navegación"
        aria-expanded={menuAbierto}
      >
        <span className={menuAbierto ? 'bar open' : 'bar'}></span>
        <span className={menuAbierto ? 'bar open' : 'bar'}></span>
        <span className={menuAbierto ? 'bar open' : 'bar'}></span>
      </button>

      {/* Backdrop oscuro con desenfoque en móvil */}
      {menuAbierto && <div className="nav-backdrop" onClick={toggleMenu}></div>}

      {/* Menú de enlaces (Sidebar drawer en móvil, horizontal en escritorio) */}
      <nav className={\`nav-menu \${menuAbierto ? 'is-active' : ''}\`}>
        <a 
          href="#fincas" 
          className={activeSection === 'fincas' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleNavClick('fincas')}
        >
          🏡 Fincas
        </a>
        <a 
          href="#cultivos" 
          className={activeSection === 'cultivos' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleNavClick('cultivos')}
        >
          🌱 Cultivos
        </a>
        <a 
          href="#asociaciones" 
          className={activeSection === 'asociaciones' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleNavClick('asociaciones')}
        >
          🔄 Siembra (N:M)
        </a>
      </nav>
    </header>
  );
}`
            },
            {
                file: 'src/layouts/MainLayout.jsx',
                lang: 'jsx',
                title: 'Layout Maestro con Header, Contenido Fluido y Footer',
                code: `import Navbar from '../components/Navbar';

export default function MainLayout({ children, activeSection, onNavigate }) {
  return (
    <div className="layout-root">
      <Navbar activeSection={activeSection} onNavigate={onNavigate} />
      
      {/* Contenedor central fluido con soporte Mobile-First */}
      <main className="layout-content container">
        {children}
      </main>

      <footer className="layout-footer">
        <p>© 2026 SENA ADSO · Centro de Gestión Agroempresarial del Oriente</p>
      </footer>
    </div>
  );
}`
            }
        ]
    },

    // ── MÓDULO 5: ESTADO CON USESTATE, USEREF Y FORMULARIOS ──
    'm-estado': {
        codeBlocks: [
            {
                file: 'teoria/estado-inmutabilidad.md',
                lang: 'markdown',
                title: 'Inmutabilidad y State Batching en React 19',
                code: `### 🛡️ ¿Por qué NUNCA debemos mutar el estado directamente?

\`\`\`javascript
// ❌ INCORRECTO: React no detecta el cambio de referencia y NO re-renderiza
fincas.push(nuevaFinca);
setFincas(fincas);

// ✅ CORRECTO: Creamos un NUEVO array con el operador spread (...)
setFincas(prevFincas => [...prevFincas, nuevaFinca]);
\`\`\`

### ⚡ Automatic Batching en React 18/19:
React agrupa múltiples llamadas a \`setState\` dentro de eventos asíncronos o promesas en un solo re-render, evitando parpadeos y aumentando el rendimiento.`
            },
            {
                file: 'src/components/FincaForm.jsx',
                lang: 'jsx',
                title: 'Formulario Controlado con Objeto en useState y Validación',
                code: `import { useState, useRef } from 'react';

export default function FincaForm({ onSubmit, fincaInicial = null, onCancelar }) {
  const [formData, setFormData] = useState(fincaInicial || {
    nombre: '',
    propietario: '',
    vereda: '',
    municipio: 'Vélez',
    hectareas: ''
  });

  const [errores, setErrores] = useState({});
  const primerInputRef = useRef(null); // useRef para autofocus y manipulación segura del DOM

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hectareas' ? (value === '' ? '' : Number(value)) : value
    }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const validar = () => {
    const err = {};
    if (!formData.nombre.trim()) {
      err.nombre = 'El nombre de la finca es obligatorio.';
      if (primerInputRef.current) primerInputRef.current.focus();
    }
    if (!formData.propietario.trim()) err.propietario = 'El propietario es obligatorio.';
    if (!formData.vereda.trim()) err.vereda = 'La vereda es obligatoria.';
    if (!formData.hectareas || formData.hectareas <= 0) err.hectareas = 'Las hectáreas deben ser mayores a 0.';
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="finca-form" noValidate>
      <div className="form-group">
        <label htmlFor="nombre">Nombre de la Finca *</label>
        <input 
          ref={primerInputRef}
          id="nombre" 
          name="nombre" 
          className="form-control" 
          value={formData.nombre} 
          onChange={handleChange} 
          placeholder="Ej. Finca La Esperanza" 
        />
        {errores.nombre && <span className="error-text">{errores.nombre}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="propietario">Propietario *</label>
          <input 
            id="propietario" 
            name="propietario" 
            className="form-control" 
            value={formData.propietario} 
            onChange={handleChange} 
            placeholder="Ej. Carlos Rueda" 
          />
          {errores.propietario && <span className="error-text">{errores.propietario}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hectareas">Hectáreas *</label>
          <input 
            id="hectareas" 
            name="hectareas" 
            type="number" 
            step="0.1" 
            className="form-control" 
            value={formData.hectareas} 
            onChange={handleChange} 
            placeholder="Ej. 12.5" 
          />
          {errores.hectareas && <span className="error-text">{errores.hectareas}</span>}
        </div>
      </div>

      <div className="form-actions">
        {onCancelar && (
          <button type="button" className="btn btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {fincaInicial ? '💾 Guardar Cambios' : '➕ Crear Finca'}
        </button>
      </div>
    </form>
  );
}`
            }
        ]
    },

    // ── MÓDULO 6: EFECTOS SECUNDARIOS CON USEEFFECT Y CICLO DE VIDA ──
    'm-efectos': {
        codeBlocks: [
            {
                file: 'teoria/ciclo-de-vida.md',
                lang: 'markdown',
                title: 'El Ciclo de Vida de useEffect: Montaje, Actualización y Desmontaje',
                code: `| Arreglo de Dependencias | ¿Cuándo se ejecuta? | Caso de uso típico |
| :--- | :--- | :--- |
| \`useEffect(() => { ... })\` (Sin arreglo) | En **CADA** render | Sincronización continua (usar con precaución) |
| \`useEffect(() => { ... }, [])\` (Arreglo vacío) | Solo **1 vez al montar** | Fetch inicial de datos, addEventListener |
| \`useEffect(() => { ... }, [id])\` (Con variables) | Al montar y **cuando cambie \`id\`** | Fetch de detalle según parámetro de URL |

### 🧹 Función de Limpieza (Cleanup):
Evita fugas de memoria cancelando peticiones HTTP con \`AbortController\`, timers (\`clearTimeout\`) o listeners.`
            },
            {
                file: 'src/components/EfectosDemo.jsx',
                lang: 'jsx',
                title: 'Ejemplo Profesional: useEffect con AbortController contra fugas de memoria',
                code: `import { useState, useEffect } from 'react';

export default function FincaDetalleConAbort({ fincaId }) {
  const [finca, setFinca] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Creamos el controlador de aborto
    const abortController = new AbortController();

    async function cargarDetalle() {
      setCargando(true);
      try {
        const res = await fetch(\`http://localhost:31026/api/fincas/\${fincaId}\`, {
          signal: abortController.signal
        });
        const data = await res.json();
        setFinca(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error de red:', err);
        }
      } finally {
        setCargando(false);
      }
    }

    cargarDetalle();

    // Función de limpieza: si el usuario cambia de finca antes de que termine el fetch, se aborta
    return () => {
      abortController.abort();
    };
  }, [fincaId]);

  if (cargando) return <p>Cargando detalle de la finca...</p>;
  return <div>{finca ? <h3>{finca.nombre}</h3> : <p>No encontrada</p>}</div>;
}`
            }
        ]
    },

    // ── MÓDULO 7: CONEXIÓN CON SPRING BOOT (CONSUMO DE APIS) ──
    'm-api': {
        codeBlocks: [
            {
                file: 'src/services/api.js',
                lang: 'javascript',
                title: '1. Cliente HTTP Centralizado con Manejo de Errores RFC 7807',
                code: `const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:31026/api';

async function httpRequest(endpoint, options = {}) {
  const token = localStorage.getItem('jwt_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': \`Bearer \${token}\` } : {}),
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(\`\${BASE_URL}\${endpoint}\`, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.mensaje || errorData.detail || errorData.message || \`Error HTTP \${response.status}\`);
      error.status = response.status;
      error.details = errorData;
      throw error;
    }
    if (response.status === 204) return null;
    return await response.json();
  } catch (err) {
    console.error(\`❌ Error en \${endpoint}:\`, err);
    throw err;
  }
}

export const fincaService = {
  obtenerTodas: (page = 0, size = 10, sort = 'nombre,asc') => httpRequest(\`/fincas?page=\${page}&size=\${size}&sort=\${sort}\`),
  obtenerPorId: (id) => httpRequest(\`/fincas/\${id}\`),
  crear: (finca) => httpRequest('/fincas', { method: 'POST', body: JSON.stringify(finca) }),
  actualizar: (id, finca) => httpRequest(\`/fincas/\${id}\`, { method: 'PUT', body: JSON.stringify(finca) }),
  eliminar: (id) => httpRequest(\`/fincas/\${id}\`, { method: 'DELETE' }),
  subirFoto: async (id, file) => {
    const formData = new FormData();
    formData.append('foto', file);
    return fetch(\`\${BASE_URL}/fincas/\${id}/foto\`, {
      method: 'POST',
      body: formData
    }).then(res => res.json());
  }
};`
            },
            {
                file: 'src/hooks/useFetch.js',
                lang: 'javascript',
                title: '2. Custom Hook useFetch con los 4 Estados UI',
                code: `import { useState, useEffect, useCallback } from 'react';

export function useFetch(fetchFunction, dependencias = []) {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const ejecutar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const resultado = await fetchFunction();
      setData(resultado);
    } catch (err) {
      setError(err.message || 'Error al cargar los datos de la API');
    } finally {
      setCargando(false);
    }
  }, dependencias);

  useEffect(() => {
    ejecutar();
  }, [ejecutar]);

  const isEmpty = !cargando && !error && (!data || data.length === 0);
  return { data, cargando, error, isEmpty, refetch: ejecutar };
}`
            }
        ]
    },

    // ── MÓDULO 8: COMPONENTES UI ESENCIALES PARA CRUD ──
    'm-componentes-ui': {
        codeBlocks: [
            {
                file: 'src/components/Modal.jsx',
                lang: 'jsx',
                title: '1. Componente Modal Accesible (Dialog con Backdrop y Focus Trap)',
                code: `import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, titulo, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content glass-panel" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 id="modal-title">{titulo}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}`
            },
            {
                file: 'src/components/Toast.jsx',
                lang: 'jsx',
                title: '2. Mensajes Flotantes (Toasts / Notificaciones)',
                code: `import { useEffect } from 'react';

export default function Toast({ id, mensaje, tipo = 'info', onClose, duracion = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose(id);
    }, duracion);
    return () => clearTimeout(timer);
  }, [id, onClose, duracion]);

  const iconos = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

  return (
    <div className={\`toast toast-\${tipo}\`} role="alert" aria-live="polite">
      <span className="toast-icon">{iconos[tipo]}</span>
      <div className="toast-body">
        <div className="toast-title">{tipo.toUpperCase()}</div>
        <div className="toast-msg">{mensaje}</div>
      </div>
      <button className="toast-close" onClick={() => onClose && onClose(id)}>×</button>
    </div>
  );
}`
            }
        ]
    },

    // ── MÓDULO 9: IMPLEMENTACIÓN DEL CRUD COMPLETO (FINCAS Y CULTIVOS) ──
    'm-crud': {
        codeBlocks: [
            {
                file: 'src/pages/FincasCrudPage.jsx',
                lang: 'jsx',
                title: 'Página Completa del CRUD de Fincas conectada a Spring Boot',
                code: `import { useState, useEffect } from 'react';
import { fincaService } from '../services/api';
import TablaFincas from '../components/TablaFincas';
import Modal from '../components/Modal';
import FincaForm from '../components/FincaForm';

export default function FincasCrudPage({ onNotificar }) {
  const [fincas, setFincas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fincaSeleccionada, setFincaSeleccionada] = useState(null);

  const cargarFincas = async () => {
    setCargando(true);
    try {
      const data = await fincaService.obtenerTodas();
      setFincas(data);
    } catch (err) {
      if (onNotificar) onNotificar('Error al cargar fincas', 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarFincas(); }, []);

  const handleGuardarFinca = async (formData) => {
    try {
      if (fincaSeleccionada) {
        const actualizada = await fincaService.actualizar(fincaSeleccionada.id, formData);
        setFincas(prev => prev.map(f => f.id === fincaSeleccionada.id ? actualizada : f));
        if (onNotificar) onNotificar('Finca actualizada (PUT 200)', 'success');
      } else {
        const nueva = await fincaService.crear(formData);
        setFincas(prev => [...prev, nueva]);
        if (onNotificar) onNotificar('Finca creada (POST 201)', 'success');
      }
      setModalAbierto(false);
      setFincaSeleccionada(null);
    } catch (err) {
      if (onNotificar) onNotificar(err.message || 'Error al guardar', 'error');
    }
  };

  return (
    <section className="fincas-crud-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>🏡 Gestión de Fincas</h2>
        <button className="btn btn-primary" onClick={() => { setFincaSeleccionada(null); setModalAbierto(true); }}>
          ➕ Nueva Finca
        </button>
      </div>

      <TablaFincas 
        fincas={fincas} 
        onEditar={(f) => { setFincaSeleccionada(f); setModalAbierto(true); }}
        onEliminar={async (id) => {
          if (confirm('¿Eliminar finca?')) {
            await fincaService.eliminar(id);
            setFincas(prev => prev.filter(f => f.id !== id));
            if (onNotificar) onNotificar('Finca eliminada (DELETE 204)', 'warning');
          }
        }}
      />

      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} titulo={fincaSeleccionada ? '✏️ Editar Finca' : '➕ Nueva Finca'}>
        <FincaForm fincaInicial={fincaSeleccionada} onSubmit={handleGuardarFinca} onCancelar={() => setModalAbierto(false)} />
      </Modal>
    </section>
  );
}`
            }
        ]
    },

    // ── MÓDULO 10: REACT 19 ACTIONS Y OPTIMISTIC UI ──
    'm-react19': {
        codeBlocks: [
            {
                file: 'src/components/FincaOptimisticCrud.jsx',
                lang: 'jsx',
                title: '1. UI Optimista instantánea con useOptimistic (0 ms)',
                code: `import { useState, useOptimistic, useTransition } from 'react';
import { fincaService } from '../services/api';

export default function FincaOptimisticCrud({ fincasIniciales }) {
  const [fincas, setFincas] = useState(fincasIniciales || []);
  const [isPending, startTransition] = useTransition();

  const [optimisticFincas, setOptimisticFincas] = useOptimistic(
    fincas,
    (state, nuevaFinca) => [...state, { ...nuevaFinca, id: Date.now(), isOptimistic: true }]
  );

  const handleCrearFinca = async (formData) => {
    startTransition(async () => {
      // 1. La UI muestra la finca AL INSTANTE (0 ms)
      setOptimisticFincas(formData);

      try {
        // 2. Spring Boot procesa en segundo plano
        const guardada = await fincaService.crear(formData);
        setFincas(prev => [...prev, guardada]);
      } catch (error) {
        alert('❌ Error en el servidor. La acción fue revertida.');
      }
    });
  };

  return (
    <div>
      <h3>Lista de Fincas (Actualización Optimista)</h3>
      <ul>
        {optimisticFincas.map(f => (
          <li key={f.id}>
            {f.nombre} ({f.hectareas} ha)
            {f.isOptimistic && <span className="badge-optimistic">⏳ Guardando en Spring Boot...</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}`
            }
        ]
    },

    // ── MÓDULO 11: AUTENTICACIÓN JWT Y RUTAS PROTEGIDAS ──
    'm-auth': {
        codeBlocks: [
            {
                file: 'src/context/AuthContext.jsx',
                lang: 'jsx',
                title: '1. AuthContext y useAuth para Gestión de Sesión JWT',
                code: `import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (token) {
      setUsuario({ email: 'aprendiz@sena.edu.co', rol: 'ROLE_ADMIN' });
    }
    setCargando(false);
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch('http://localhost:31026/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Credenciales inválidas');
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('jwt_token', data.token);
    setUsuario(data.usuario);
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('jwt_token');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);`
            }
        ]
    },

    // ── MÓDULO 12: VITE PROXY VS CORS ──
    'm-vite-proxy': {
        codeBlocks: [
            {
                file: 'vite.config.js',
                lang: 'javascript',
                title: 'Configuración de Vite Proxy para Desarrollo sin Errores CORS',
                code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:31026', // Backend Spring Boot
        changeOrigin: true,
        secure: false
      }
    }
  }
});`
            }
        ]
    },

    // ── MÓDULO 13: UX AVANZADA (SKELETONS, DEBOUNCE Y PAGINACIÓN) ──
    'm-ux-avanzada': {
        codeBlocks: [
            {
                file: 'src/hooks/useDebounce.js',
                lang: 'javascript',
                title: '1. Custom Hook useDebounce para Búsquedas Eficientes',
                code: `import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`
            }
        ]
    },

    // ── MÓDULO 14: PROGRAMACIÓN ASISTIDA POR IA ──
    'm-ia': {
        codeBlocks: [
            {
                file: 'prompts/prompt-componente-ui.md',
                lang: 'markdown',
                title: 'Prompt Maestro: Componente React Accesible',
                code: `Actúa como Desarrollador Frontend Senior.
Crea un componente llamado [NombreComponente] en React 19 para gestión agrícola.
Requisitos:
1. Recibe props: [ListaDeProps]
2. Maneja los estados: Cargando (Skeleton), Error y Vacío.
3. Mobile-First (320px a 2560px) con accesibilidad ARIA y tipado JSDoc.`
            }
        ]
    }
};

window.MODULES_CONTENT = MODULES_CONTENT;
