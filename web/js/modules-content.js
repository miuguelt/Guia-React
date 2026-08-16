/**
 * MODULES CONTENT - Guia React & Spring Boot API (SENA ADSO)
 * Contenido didactico, codigo de ejemplo, explicaciones paso a paso y prompts para IA.
 */

const MODULES_CONTENT = {

    // ── MÓDULO 1: FUNDAMENTOS Y MENTALIDAD REACT ──
    'm-reflexion': {
        codeBlocks: [
            {
                file: 'src/vanilla-vs-react/imperative.js',
                lang: 'javascript',
                title: 'Enfoque Imperativo tradicional (DOM manual / jQuery)',
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
                title: 'Enfoque Declarativo en React (El estado manda)',
                code: `// Enfoque Declarativo: TÚ describes CÓMO debe verse la UI según el estado.
// React se encarga de actualizar el DOM de forma óptima mediante su Virtual DOM.
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
  // Manejo de estado vacío si la lista no contiene elementos
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
        // IMPORTANTE: Cada elemento en un .map() debe tener una prop "key" única
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
            },
            {
                type: 'prompt',
                text: 'Crea los estilos CSS para un Navbar responsive Mobile-First en React.\nEn pantallas menores a 768px debe comportarse como un Drawer lateral que entra deslizándose desde la izquierda con backdrop oscuro.\nEn pantallas de 768px o más, debe ser una barra horizontal fija superior.\nUsa variables CSS y transiciones suaves.',
                tool: 'Claude / ChatGPT',
                tip: 'Recuerda usar unidades clamp() y evitar desbordamientos horizontales.'
            }
        ]
    },

    // ── MÓDULO 5: ESTADO CON USESTATE Y FORMULARIOS ──
    'm-estado': {
        codeBlocks: [
            {
                file: 'src/components/FincaForm.jsx',
                lang: 'jsx',
                title: 'Formulario Controlado con Objeto en useState y Validación',
                code: `import { useState } from 'react';

export default function FincaForm({ onSubmit, fincaInicial = null, onCancelar }) {
  // Estado que agrupa todos los campos del formulario
  const [formData, setFormData] = useState(fincaInicial || {
    nombre: '',
    propietario: '',
    vereda: '',
    municipio: 'Vélez',
    hectareas: ''
  });

  const [errores, setErrores] = useState({});

  // Manejador genérico para inputs y selects
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, // Mantener los otros campos intactos (Inmutabilidad)
      [name]: name === 'hectareas' ? (value === '' ? '' : Number(value)) : value
    }));
    // Limpiar error al escribir
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const validar = () => {
    const err = {};
    if (!formData.nombre.trim()) err.nombre = 'El nombre de la finca es obligatorio.';
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

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="vereda">Vereda *</label>
          <input 
            id="vereda" 
            name="vereda" 
            className="form-control" 
            value={formData.vereda} 
            onChange={handleChange} 
            placeholder="Ej. El Gualilo" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="municipio">Municipio</label>
          <select id="municipio" name="municipio" className="form-control" value={formData.municipio} onChange={handleChange}>
            <option value="Vélez">Vélez</option>
            <option value="Barbosa">Barbosa</option>
            <option value="Guavatá">Guavatá</option>
            <option value="Puente Nacional">Puente Nacional</option>
          </select>
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
            },
            {
                type: 'prompt',
                text: 'Crea un custom hook useForm en React que administre el estado de cualquier formulario.\nDebe recibir los valores iniciales y una función de validación.\nDebe retornar: { values, errors, isSubmitting, handleChange, handleSubmit, resetForm }.\nIncluye un ejemplo de cómo usarlo en un formulario de registro de Cultivo.',
                tool: 'Claude / ChatGPT',
                tip: 'Los custom hooks aíslan la lógica y hacen los componentes mucho más limpios.'
            }
        ]
    },

    // ── MÓDULO 6: EFECTOS SECUNDARIOS CON USEEFFECT Y CICLO DE VIDA ──
    'm-efectos': {
        codeBlocks: [
            {
                file: 'src/components/EfectosDemo.jsx',
                lang: 'jsx',
                title: 'Los 3 escenarios de useEffect explicados',
                code: `import { useState, useEffect } from 'react';

export default function EfectosDemo() {
  const [contador, setContador] = useState(0);
  const [fincaId, setFincaId] = useState(1);

  // 1. CASO 1: [] Arreglo vacío -> Se ejecuta SOLO UNA VEZ al montar el componente.
  // Ideal para cargar datos iniciales de la API o suscribirse a eventos globales.
  useEffect(() => {
    console.log('✅ Componente montado en el DOM');
    
    return () => {
      // Función de Cleanup (limpieza) -> Se ejecuta al desmontar el componente
      console.log('🛑 Componente desmontado (limpieza de recursos)');
    };
  }, []);

  // 2. CASO 2: [fincaId] -> Se ejecuta al montar y CADA VEZ que fincaId cambie de valor.
  useEffect(() => {
    console.log(\`🔄 Consultando detalles de la finca ID: \${fincaId}\`);
  }, [fincaId]);

  // 3. ⚠️ CASO 3: Sin arreglo de dependencias -> Se ejecuta en CADA renderizado.
  // ¡CUIDADO! Nunca actualices el estado aquí adentro sin condiciones o provocarás un bucle infinito.
  useEffect(() => {
    document.title = \`Fincas App - Contador: \${contador}\`;
  });

  return (
    <div className="card glass-panel-inner">
      <h3>Visualizador del Ciclo de Vida</h3>
      <p>Contador: {contador}</p>
      <button className="btn btn-sm btn-primary" onClick={() => setContador(c => c + 1)}>+1</button>
      <button className="btn btn-sm btn-secondary" onClick={() => setFincaId(id => id + 1)}>Cambiar Finca ID ({fincaId})</button>
    </div>
  );
}`
            },
            {
                type: 'prompt',
                text: '¿Por qué ocurre un bucle infinito en React cuando llamamos a una función setState dentro de useEffect sin arreglo de dependencias?\nExplica el ciclo de renderizado paso a paso y muestra cómo corregirlo.',
                tool: 'Copilot / Antigravity',
                tip: 'Comprender el ciclo de render es lo que diferencia a un novato de un profesional en React.'
            }
        ]
    },

    // ── MÓDULO 7: CONEXIÓN CON SPRING BOOT (CONSUMO DE APIS) ──
    'm-api': {
        codeBlocks: [
            {
                file: 'src/services/api.js',
                lang: 'javascript',
                title: '1. Cliente HTTP Centralizado con Manejo de Errores',
                code: `// Cliente HTTP base conectado a Spring Boot (Puerto 31026)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:31026/api';

async function httpRequest(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(\`\${BASE_URL}\${endpoint}\`, config);

    // Si el backend responde con error HTTP (400, 404, 500, etc.)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.mensaje || errorData.message || \`Error HTTP \${response.status}\`);
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // Si la respuesta es 204 No Content (típico en DELETE)
    if (response.status === 204) return null;

    return await response.json();
  } catch (err) {
    console.error(\`❌ Error en petición a \${endpoint}:\`, err);
    throw err;
  }
}

// 📦 Servicios del Dominio Fincas & Cultivos
export const fincaService = {
  obtenerTodas: () => httpRequest('/fincas'),
  obtenerPorId: (id) => httpRequest(\`/fincas/\${id}\`),
  crear: (finca) => httpRequest('/fincas', { method: 'POST', body: JSON.stringify(finca) }),
  actualizar: (id, finca) => httpRequest(\`/fincas/\${id}\`, { method: 'PUT', body: JSON.stringify(finca) }),
  eliminar: (id) => httpRequest(\`/fincas/\${id}\`, { method: 'DELETE' })
};

export const cultivoService = {
  obtenerTodos: () => httpRequest('/cultivos'),
  obtenerPorId: (id) => httpRequest(\`/cultivos/\${id}\`),
  crear: (cultivo) => httpRequest('/cultivos', { method: 'POST', body: JSON.stringify(cultivo) })
};

export const fincaCultivoService = {
  obtenerAsociaciones: () => httpRequest('/finca-cultivos'),
  asociar: (datos) => httpRequest('/finca-cultivos', { method: 'POST', body: JSON.stringify(datos) }),
  eliminarAsociacion: (id) => httpRequest(\`/finca-cultivos/\${id}\`, { method: 'DELETE' })
};`
            },
            {
                file: 'src/hooks/useFetch.js',
                lang: 'javascript',
                title: '2. Custom Hook useFetch con los 4 Estados UI',
                code: `import { useState, useEffect, useCallback } from 'react';

/**
 * Custom Hook para gestionar peticiones GET con los 4 estados esenciales:
 * 1. cargando (isLoading)
 * 2. datos (data)
 * 3. error (error)
 * 4. vacio (isEmpty)
 */
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
            },
            {
                file: 'Spring Boot (Java) - CorsConfig.java',
                lang: 'java',
                title: '3. Habilitar CORS en Spring Boot para permitir React',
                code: `// En tu backend Spring Boot (guia-spring puerto 31026)
package com.sena.fincas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8030")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}`
            },
            {
                type: 'prompt',
                text: 'Explica qué es el error de CORS (Cross-Origin Resource Sharing) en el navegador al conectar un frontend de React (puerto 5173) con un backend de Spring Boot (puerto 31026).\n¿Por qué el error lo arroja el navegador y no el servidor de Java?\nMuestra la configuración exacta en Spring Boot y en Vite para solucionarlo.',
                tool: 'Claude / Copilot / ChatGPT',
                tip: 'Este es el error número 1 al que se enfrenta todo aprendiz al conectar frontend y backend.'
            }
        ]
    },

    // ── MÓDULO 8: COMPONENTES UI ESENCIALES PARA CRUD ──
    'm-componentes-ui': {
        codeBlocks: [
            {
                file: 'src/components/Modal.jsx',
                lang: 'jsx',
                title: '1. Componente Modal Accesible (Dialog con Backdrop)',
                code: `import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, titulo, children }) {
  // Cerrar modal al presionar la tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{titulo}</h3>
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
      onClose(id);
    }, duracion);
    return () => clearTimeout(timer);
  }, [id, onClose, duracion]);

  const iconos = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={\`toast toast-\${tipo}\`}>
      <span className="toast-icon">{iconos[tipo]}</span>
      <div className="toast-body">
        <div className="toast-title">{tipo.toUpperCase()}</div>
        <div className="toast-msg">{mensaje}</div>
      </div>
      <button className="toast-close" onClick={() => onClose(id)}>×</button>
    </div>
  );
}`
            },
            {
                file: 'src/components/TablaFincas.jsx',
                lang: 'jsx',
                title: '3. Tabla Responsiva con Transformación en Tarjetas Móvil',
                code: `export default function TablaFincas({ fincas, onEditar, onEliminar, onVerDetalle }) {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Propietario</th>
            <th>Vereda</th>
            <th>Municipio</th>
            <th>Hectáreas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fincas.map(f => (
            <tr key={f.id}>
              <td data-label="ID">#{f.id}</td>
              <td data-label="Nombre"><strong>{f.nombre}</strong></td>
              <td data-label="Propietario">{f.propietario}</td>
              <td data-label="Vereda">{f.vereda}</td>
              <td data-label="Municipio">{f.municipio}</td>
              <td data-label="Hectáreas"><span className="badge-ha">{f.hectareas} ha</span></td>
              <td data-label="Acciones">
                <div className="table-actions">
                  <button className="btn btn-sm btn-secondary" onClick={() => onVerDetalle(f)}>👁️</button>
                  <button className="btn btn-sm btn-primary" onClick={() => onEditar(f)}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onEliminar(f.id)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`
            },
            {
                type: 'prompt',
                text: 'Diseña un sistema de Toast Container en React usando Context API o useState.\nDebe permitir disparar alertas desde cualquier componente llamando: toast.success("Finca creada"), toast.error("Error al conectar"), etc.\nLas alertas deben auto-eliminarse a los 4 segundos con animación de salida.',
                tool: 'Claude / ChatGPT',
                tip: 'Los Toasts proporcionan retroalimentación inmediata sin interrumpir el flujo del usuario.'
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
  const [error, setError] = useState(null);
  
  // Estado para el modal de Crear/Editar
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fincaSeleccionada, setFincaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  // 1. Cargar lista de fincas al montar (GET /api/fincas)
  const cargarFincas = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await fincaService.obtenerTodas();
      setFincas(data);
    } catch (err) {
      setError('No se pudo conectar con el backend Spring Boot.');
      onNotificar('Error al cargar fincas', 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarFincas();
  }, []);

  // 2. Guardar (POST o PUT según si estamos creando o editando)
  const handleGuardarFinca = async (formData) => {
    try {
      if (fincaSeleccionada) {
        // Actualizar finca existente (PUT /api/fincas/{id})
        const actualizada = await fincaService.actualizar(fincaSeleccionada.id, formData);
        setFincas(prev => prev.map(f => f.id === fincaSeleccionada.id ? actualizada : f));
        onNotificar('Finca actualizada exitosamente', 'success');
      } else {
        // Crear nueva finca (POST /api/fincas)
        const nueva = await fincaService.crear(formData);
        setFincas(prev => [...prev, nueva]);
        onNotificar('Finca registrada en la base de datos', 'success');
      }
      setModalAbierto(false);
      setFincaSeleccionada(null);
    } catch (err) {
      onNotificar(err.message || 'Error al guardar la finca', 'error');
    }
  };

  // 3. Eliminar finca (DELETE /api/fincas/{id})
  const handleEliminarFinca = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta finca?')) return;
    try {
      await fincaService.eliminar(id);
      setFincas(prev => prev.filter(f => f.id !== id));
      onNotificar('Finca eliminada correctamente', 'success');
    } catch (err) {
      onNotificar('No se pudo eliminar la finca', 'error');
    }
  };

  // Filtro de búsqueda en tiempo real
  const fincasFiltradas = fincas.filter(f => 
    f.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    f.propietario.toLowerCase().includes(busqueda.toLowerCase()) ||
    f.municipio.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="fincas-crud-page">
      <div className="page-header">
        <div>
          <h2>🏡 Gestión de Fincas</h2>
          <p className="text-muted">Conectado a Spring Boot en http://localhost:31026/api/fincas</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { setFincaSeleccionada(null); setModalAbierto(true); }}
        >
          ➕ Nueva Finca
        </button>
      </div>

      {/* Barra de Búsqueda y Filtros en Vivo */}
      <div className="search-bar-container">
        <input 
          type="text" 
          className="form-control search-input" 
          placeholder="🔍 Buscar por nombre, propietario o municipio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Manejo de los 4 estados de la UI */}
      {cargando && <div className="loading-state">⏳ Cargando fincas desde PostgreSQL...</div>}
      {error && <div className="error-state">❌ {error}</div>}
      {!cargando && !error && fincasFiltradas.length === 0 && (
        <div className="empty-state">No se encontraron fincas que coincidan con la búsqueda.</div>
      )}
      {!cargando && !error && fincasFiltradas.length > 0 && (
        <TablaFincas 
          fincas={fincasFiltradas} 
          onEditar={(finca) => { setFincaSeleccionada(finca); setModalAbierto(true); }}
          onEliminar={handleEliminarFinca}
          onVerDetalle={(finca) => alert(\`Finca: \${finca.nombre} en \${finca.vereda}\`)}
        />
      )}

      {/* Modal Reutilizable para Crear / Editar */}
      <Modal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)}
        titulo={fincaSeleccionada ? '✏️ Editar Finca' : '➕ Registrar Nueva Finca'}
      >
        <FincaForm 
          fincaInicial={fincaSeleccionada}
          onSubmit={handleGuardarFinca}
          onCancelar={() => setModalAbierto(false)}
        />
      </Modal>
    </section>
  );
}`
            },
            {
                type: 'prompt',
                text: 'Crea un componente FincaCultivoManager en React para gestionar la relación Muchos a Muchos (N:M) entre Fincas y Cultivos.\nDebe incluir:\n1. Un selector para elegir la Finca.\n2. Un selector para elegir el Cultivo.\n3. Campos para: área sembrada (ha), fecha de siembra y temporada.\n4. Botón "Asociar Cultivo" que llame a POST /api/finca-cultivos.\n5. Tabla con los cultivos sembrados en la finca seleccionada y opción de desvincular (DELETE).',
                tool: 'Claude / ChatGPT',
                tip: 'Este componente demuestra el dominio completo del ciclo N:M en frontend.'
            }
        ]
    },

    // ── MÓDULO 10: PROGRAMACIÓN ASISTIDA POR INTELIGENCIA ARTIFICIAL ──
    'm-ia': {
        codeBlocks: [
            {
                file: 'prompts/prompt-componente-ui.md',
                lang: 'markdown',
                title: 'Prompt Maestro: Crear Componente React Accesible y Tipado',
                code: `Actúa como un Desarrollador Frontend Senior especializado en React 19 y TypeScript.

Crea un componente llamado [NombreComponente] para una aplicación agrícola.
Requisitos:
1. Recibe las siguientes props: [ListaDeProps]
2. Maneja los estados: Cargando (Skeleton), Error (Mensaje claro) y Vacío (Ilustración o texto).
3. Debe ser totalmente Mobile-First con diseño responsivo desde 320px hasta 2560px.
4. Incluye accesibilidad WAI-ARIA (roles, aria-labels, navegación por teclado).
5. Usa CSS Modules o estilos con variables CSS estándar.
6. Incluye validación de tipos con JSDoc o TypeScript interfaces.`
            },
            {
                file: 'prompts/prompt-debug-cors.md',
                lang: 'markdown',
                title: 'Prompt Maestro: Diagnosticar y Resolver Errores de Conexión y CORS',
                code: `Estoy conectando mi frontend React (Vite en http://localhost:5173) con mi API Spring Boot (puerto 31026).
Tengo el siguiente error en la consola del navegador:
"[Pegar el error exacto de consola / Network tab]"

1. Explica la causa raíz del error.
2. Proporciona la solución exacta en el backend Spring Boot (CorsConfiguration / @CrossOrigin).
3. Proporciona la configuración de proxy opcional en vite.config.js si aplica.
4. Explica cómo verificar con curl o Postman antes de volver a probar en React.`
            },
            {
                type: 'prompt',
                text: 'Genera pruebas unitarias con Vitest y React Testing Library para el componente FincaForm.\nLas pruebas deben verificar:\n1. Que los campos se renderizan correctamente.\n2. Que muestra mensajes de validación si se envía el formulario vacío.\n3. Que llama a la función onSubmit con los datos correctos al presionar Guardar.',
                tool: 'Claude / Antigravity / ChatGPT',
                tip: 'Escribir pruebas garantiza que tus cambios futuros no rompan funcionalidades previas.'
            }
        ]
    }
};

window.MODULES_CONTENT = MODULES_CONTENT;
