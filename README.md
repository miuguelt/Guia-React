# Guia React - SENA ADSO

Guia de aprendizaje para el desarrollo de interfaces de usuario con React 19, Vite y JavaScript ES6+.

## Contenido del Repositorio

| Carpeta/Archivo | Descripcion |
|---|---|
| `web/` | Guia interactiva web (HTML + CSS + JS con simuladores y gamificacion) |
| `web/js/` | Modulos JS: content, renderer, simulators, gamification, main |
| `recursos/codigo-ejemplo/` | Codigo fuente React con componentes, hooks y ejemplos |
| `recursos/codigo-ejemplo/src/components/` | Componentes reutilizables (Saludo, Contador, Reloj) |
| `recursos/codigo-ejemplo/src/hooks/` | Custom hooks (useFetch) |
| `tests/` | Tests automatizados |
| `.devbrain/` | Scripts de automatizacion DevBrain |
| `generar_guia.py` | Generador DOCX |
| `start-windows.ps1` | Servidor web (puerto 8030) |
| `CORTEX_MAP.md` | Mapa de arquitectura |

## Inicio Rapido

### Guia Web Interactiva
```powershell
.\start-windows.ps1
```
Abre http://localhost:8030

### Proyecto React Real
```powershell
npm create vite@latest mi-app -- --template react
cd mi-app
npm install
npm run dev
```

## Modulos de la Guia

| # | Modulo | Duracion | Tipo | Descripcion |
|---|--------|----------|------|-------------|
| 1 | Reflexion Inicial | 30 min | Teoria | Por que React? DOM vs Virtual DOM |
| 2 | Entorno | 40 min | Practica | Node.js, Vite, create-vite |
| 3 | Componentes y Props | 60 min | Practica | Componentes funcionales, props, composicion |
| 4 | Estado con useState | 55 min | Practica | Estado local, eventos, formularios |
| 5 | Efectos con useEffect | 60 min | Practica | Fetch, timers, cleanup |
| 6 | React Router | 50 min | Practica | Rutas, Links, parametros |
| 7 | API Calls y Custom Hooks | 60 min | Practica | Fetch, loading/error states, hooks |
| 8 | Simuladores | Interactivo | Practica | 6 simuladores interactivos |

## Simuladores Interactivos

| # | Simulador | Descripcion | XP |
|---|-----------|-------------|-----|
| 1 | JSX Live Editor | Compila JSX a JavaScript | +50 |
| 2 | Props Simulator | Renderiza componentes con props | +50 |
| 3 | useState Simulator | Estado interactivo en vivo | +50 |
| 4 | Hooks Playground | Explora useState, useEffect, useRef, useMemo | +50 |
| 5 | Quiz React | Preguntas aleatorias | +75 |
| 6 | Modo Debugging | Arregla bugs en codigo React | +100 |

## Estructura del Proyecto

```
Guia React/
├── web/
│   ├── index.html              # SPA con sidebar y modulos
│   ├── css/styles.css           # Glassmorphism dark theme
│   └── js/
│       ├── modules-content.js   # Contenido de 6 modulos
│       ├── code-renderer.js     # Bloques de codigo con file headers
│       ├── simulators.js        # 6 simuladores React
│       ├── gamification.js      # XP y niveles
│       └── main.js              # Navegacion y logica
├── recursos/
│   ├── codigo-ejemplo/
│   │   ├── src/
│   │   │   ├── components/      # Saludo, Contador, Reloj
│   │   │   └── hooks/           # useFetch
│   │   └── package.json         # Dependencias
│   ├── sql/                     # Pendiente
│   └── docker/                  # Pendiente
├── tests/                       # Pendiente
├── .devbrain/                   # Automatizacion
├── generar_guia.py              # Generador DOCX
├── CORTEX_MAP.md                # Mapa de arquitectura
└── start-windows.ps1            # Servidor web (puerto 8030)
```

## Tecnologias

| Tecnologia | Version | Proposito |
|---|---|---|
| React | 19 | Libreria de UI |
| Vite | 5+ | Build tool |
| JavaScript | ES6+ | Lenguaje |
| React Router | 6+ | Navegacion |
| Node.js | 18+ | Runtime |

## Ejercicios de Transferencia

### Reto 1: App de Tareas (Todo List)
- Crear, completar y eliminar tareas
- Persistencia con localStorage
- Filtro por estado (todas/activas/completadas)
- Bonus: Drag & drop para reordenar

### Reto 2: Frontend Fincas y Cultivos (Spring Boot)
- Consumir API REST de Spring Boot (`http://localhost:8080/api/fincas`)
- Manejo de CORS y estados asincronos (useEffect + fetch)
- Detalle de finca y sus cultivos con ruta dinamica
- Bonus: Formulario para crear nuevas fincas

### Reto 3: Dashboard con Custom Hooks
- useFetch personalizado
- Graficos con Recharts o Chart.js
- Dark/Light mode con Context API
- Bonus: Responsive design

## Competencias Desarrolladas

### Tecnicas
- Componentes funcionales con React 19
- Estado local con useState
- Efectos secundarios con useEffect
- Props y composicion de componentes
- React Router para SPA
- Custom hooks reutilizables
- Fetch API y estados asyncronos
- JSX y Virtual DOM

### Metodologicas
- Component-based architecture
- Single Responsibility Principle
- Custom hooks para separacion de logica
- Debugging con React DevTools

## DevBrain Integration

```powershell
.\.devbrain\session-start.ps1   # Inicio de sesion
.\.devbrain\checkpoint.ps1       # Snapshot git
.\.devbrain\integrity-check.ps1  # Verificacion
.\.devbrain\session-end.ps1      # Cierre de sesion
```

## Reglas de Construccion

### Componente React
```jsx
function Componente({ prop1, prop2 }) {
  const [state, setState] = useState(valorInicial)
  
  useEffect(() => {
    // Efecto
    return () => {} // Cleanup
  }, [deps])
  
  return <div>{prop1}</div>
}
```

### Custom Hook
```javascript
function useCustomHook(param) {
  const [data, setData] = useState(null)
  // Logica reutilizable
  return { data }
}
```

## Explicacion de Modulos

### Modulo 1: Reflexion Inicial
El DOM virtual de React resuelve el problema de la manipulacion directa del DOM. En lugar de actualizar elementos uno por uno (costoso y propenso a errores), React mantiene una representacion virtual del DOM y calcula las minimas actualizaciones necesarias (reconciliation). Esto resulta en codigo mas declarativo, predecible y facil de mantener.

### Modulo 2: Entorno
Vite es el build tool recomendado para nuevos proyectos React. Ofrece HMR (Hot Module Replacement) instantaneo, bundling optimizado con Rollup, y soporte nativo para JSX. Alternativas: Create React App (mas lento), Next.js (para SSR).

### Modulo 3: Componentes y Props
Los componentes funcionales son la unidad basica de React. Reciben datos via props (propiedades) y retornan JSX. Las props son de solo lectura (inmutables). La composicion (anidar componentes) es el patron principal para construir UI complejas. Patron children: `<Layout><Content /></Layout>`.

### Modulo 4: Estado con useState
useState es el Hook fundamental para datos que cambian en el tiempo. Caracteristicas clave:
- El estado es inmutable: usar spread operator o setter funcional
- Las actualizaciones son asyncronas (batching en React 19)
- Regla: nunca mutar el estado directamente

### Modulo 5: Efectos con useEffect
useEffect sincroniza el componente con sistemas externos. Casos de uso comunes:
- Fetch de datos al montar (`useEffect(() => { fetch() }, [])`)
- Timers y suscripciones (con cleanup en return)
- Sincronizacion con DOM/BOM
- Dependencias: pasar array vacio [] = solo al montar/desmontar

### Modulo 6: React Router
React Router 6+ usa elementos en lugar de componentes para las rutas. BrowserRouter provee navegacion con URLs limpias. Link y NavLink reemplazan <a> para evitar recargas completas. useParams extrae parametros de ruta. useNavigate para navegacion programatica.

### Modulo 7: API Calls
Fetch API es nativo del navegador. Los custom hooks encapsulan logica reutilizable de fetching:
- Estado: data, loading, error
- useFetch(url) retorna { data, loading, error }
- Se reutiliza en cualquier componente que necesite datos asyncronos

## Performance en React

### React.memo
Evita re-renders innecesarios cuando las props no cambian:
```jsx
const ComponenteMemo = React.memo(function Componente({ prop }) {
  return <div>{prop}</div>
})
```

### useCallback y useMemo
useCallback memoriza funciones, useMemo memoriza valores calculados:
```javascript
const fn = useCallback(() => { hacerAlgo(data) }, [data])
const total = useMemo(() => items.reduce((s, i) => s + i.price, 0), [items])
```

### Key Prop
Siempre usar keys unicas y estables en listas para optimizar reconciliation:
```jsx
{items.map(item => <Item key={item.id} data={item} />)}
```

## Patrones Avanzados

### Context API para estado global
```jsx
const TemaContext = createContext()

function App() {
  const [tema, setTema] = useState('dark')
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      <Toolbar />
    </TemaContext.Provider>
  )
}

function Toolbar() {
  const { tema, setTema } = useContext(TemaContext)
  return <button onClick={() => setTema(t => t === 'dark' ? 'light' : 'dark')}>
    Cambiar a {tema === 'dark' ? 'light' : 'dark'}
  </button>
}
```

### Compound Components
```jsx
function Select({ children }) {
  const [value, setValue] = useState('')
  return <div>{React.Children.map(children, child =>
    React.cloneElement(child, { value, setValue })
  )}</div>
}
Select.Option = function Option({ value, label, setValue }) {
  return <div onClick={() => setValue(value)}>{label}</div>
}
```

## Herramientas de Desarrollo

### React DevTools
Extension de navegador (Chrome/Firefox) que permite:
- Inspeccionar arbol de componentes
- Ver props y estado en tiempo real
- Analizar rendimiento (Profiler)
- Depurar re-renders

### ESLint + Prettier
```json
// .eslintrc.json
{
  "extends": ["react-app", "prettier"],
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

## Despliegue en Produccion

### Build para Produccion
```bash
npm run build  # Genera carpeta dist/
```

### Opciones de Despliegue
| Plataforma | Comando | URL |
|------------|---------|-----|
| Vercel | `vercel --prod` | https://mi-app.vercel.app |
| Netlify | `netlify deploy --prod` | https://mi-app.netlify.app |
| GitHub Pages | `npm run deploy` | https://user.github.io/mi-app |
| Coolify | Docker + nginx | Puerto configurable |

## Historial de Versiones

| Version | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | Junio 2026 | Version inicial con 7 modulos y 6 simuladores |

## Licencia

Material educativo creado para el SENA - ADSO. Uso exclusivo para aprendices del programa.

---

*Ultima actualizacion: Junio 2026*

---

## Navegacion entre Guias - Ruta de Aprendizaje ADSO

| Orden | Guia | Puerto | Fase ADSO |
|-------|------|--------|-----------|
| 1 | [Guia Flask](../Guia-Flask) | 5000 | 4 - Ejecucion |
| 2 | [Guia FastAPI](../Guia%20FastApi) | 8025 | 4 - Ejecucion |
| 3 | [Guia Spring](../guia-spring) | 8080 | 4 - Ejecucion |
| **4** | **Guia React (aqui)** | **8030** | **4 - Ejecucion** |
| 5 | [Guia FastAPI](../guia-fastapi) | 8025 | 4 - Ejecucion |
| 6 | [Guia Testing & QA](../Guia%20Testing) | 8035 | 5 - Evaluacion |

**Anterior:** [Guia Spring](../guia-spring) - Backend Empresarial (API REST).
**Siguiente:** [Guia FastAPI](../guia-fastapi) - Microservicios con Python (se conectará a Flutter).
