/**
 * MODULES_CONTENT_FASE3 - Guia React ADSO 2026
 * Contenido de codigo para Fase 3: Consumo de APIs con React.
 * SSOT: recursos/codigo-ejemplo/ (proyecto Vite de ejemplo)
 */
const MODULES_CONTENT_FASE3 = {
    'fase3_entorno': {
        title: 'Preparación del Entorno',
        codeBlocks: [
            {
                file: 'Terminal (PowerShell)',
                lang: 'bash',
                title: 'Crear proyecto con Vite',
                url: 'recursos/codigo-ejemplo/',
                code: `npm create vite@latest frontend-fincas -- --template react

cd frontend-fincas
npm install
npm run dev`
            },
            {
                file: 'vite.config.js',
                lang: 'javascript',
                title: 'Configurar proxy para la API',
                url: 'recursos/codigo-ejemplo/vite.config.js',
                code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3009,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8009',
        changeOrigin: true
      }
    }
  }
})`
            }
        ]
    },
    'fase3_holamundo': {
        title: 'Hola Mundo en React',
        codeBlocks: [
            {
                file: 'src/App.jsx',
                lang: 'jsx',
                title: 'Primer componente funcional',
                url: 'recursos/codigo-ejemplo/src/App.jsx',
                code: `function App() {
  return (
    <div className="app">
      <h1>Finca Los Alamos</h1>
      <p>Vereda la Mesa, municipio de Vélez, Santander</p>
      <p>Hectareas: 12.5</p>
    </div>
  )
}

export default App`
            }
        ]
    },
    'fase3_jsx': {
        title: 'JSX y Componentes',
        codeBlocks: [
            {
                file: 'src/components/FincaCard.jsx',
                lang: 'jsx',
                title: 'Expresiones en JSX con props',
                url: 'recursos/codigo-ejemplo/src/components/FincaCard.jsx',
                code: `function FincaCard({ finca }) {
  return (
    <div className="finca-card">
      <h3>{finca.nombre}</h3>
      <p>Propietario: {finca.propietario}</p>
      <p>Vereda: {finca.vereda}, {finca.municipio}</p>
      <p>
        Hectareas: <strong>{finca.hectareas}</strong>
        {finca.hectareas > 10 ? ' (grande)' : ' (pequena)'}
      </p>
    </div>
  )
}

export default FincaCard`
            },
            {
                file: 'src/components/ListaFincas.jsx',
                lang: 'jsx',
                title: 'Renderizar listas con .map()',
                url: 'recursos/codigo-ejemplo/src/components/ListaFincas.jsx',
                code: `function ListaFincas({ fincas }) {
  if (fincas.length === 0) {
    return <p className="empty">No hay fincas registradas.</p>
  }

  return (
    <div className="lista-fincas">
      {fincas.map(finca => (
        <FincaCard key={finca.id} finca={finca} />
      ))}
    </div>
  )
}

export default ListaFincas`
            },
            {
                file: 'src/App.jsx',
                lang: 'jsx',
                title: 'Composicion de componentes',
                url: 'recursos/codigo-ejemplo/src/App.jsx',
                code: `import ListaFincas from './components/ListaFincas'

function App() {
  const fincas = [
    { id: 1, nombre: 'El Porvenir', propietario: 'Jose Rodriguez',
      vereda: 'La Mesa', municipio: 'Vélez', hectareas: 8.5 },
    { id: 2, nombre: 'Los Alamos', propietario: 'Maria Peña',
      vereda: 'El Rosario', municipio: 'Vélez', hectareas: 15.2 }
  ]

  return (
    <div>
      <h1>Fincas de Vélez</h1>
      <ListaFincas fincas={fincas} />
    </div>
  )
}`
            }
        ]
    },
    'fase3_estado': {
        title: 'Estado con useState y useEffect',
        codeBlocks: [
            {
                file: 'src/components/ContadorHectareas.jsx',
                lang: 'jsx',
                title: 'useState — datos reactivos',
                url: 'recursos/codigo-ejemplo/src/components/ContadorHectareas.jsx',
                code: `import { useState } from 'react'

function ContadorHectareas() {
  const [hectareas, setHectareas] = useState(0)

  return (
    <div>
      <p>Hectareas acumuladas: {hectareas}</p>
      <button onClick={() => setHectareas(h => h + 1)}>+1 ha</button>
      <button onClick={() => setHectareas(0)}>Reiniciar</button>
    </div>
  )
}

export default ContadorHectareas`
            },
            {
                file: 'src/components/ListaFincas.jsx',
                lang: 'jsx',
                title: 'useEffect con fetch a API',
                url: 'recursos/codigo-ejemplo/src/components/ListaFincas.jsx',
                code: `import { useState, useEffect } from 'react'

function ListaFincas() {
  const [fincas, setFincas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/fincas')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar fincas')
        return res.json()
      })
      .then(data => setFincas(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  if (cargando) return <p>Cargando fincas...</p>
  if (error) return <p className="error">Error: {error}</p>
  if (fincas.length === 0) return <p>No hay fincas registradas.</p>

  return (
    <ul>
      {fincas.map(f => <li key={f.id}>{f.nombre} - {f.municipio}</li>)}
    </ul>
  )
}

export default ListaFincas`
            }
        ]
    },
    'fase3_apis': {
        title: 'Consumo de APIs con Fetch',
        codeBlocks: [
            {
                file: 'src/hooks/useApi.js',
                lang: 'javascript',
                title: 'Custom Hook useApi',
                url: 'recursos/codigo-ejemplo/src/hooks/useApi.js',
                code: `import { useState, useEffect } from 'react'

export function useApi(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}`
            },
            {
                file: 'src/services/api.js',
                lang: 'javascript',
                title: 'Servicio API centralizado',
                url: 'recursos/codigo-ejemplo/src/services/api.js',
                code: `const BASE = '/api'

async function request(endpoint, options = {}) {
  const res = await fetch(BASE + endpoint, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || 'Error ' + res.status)
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  fincas: {
    getAll: () => request('/fincas'),
    getById: (id) => request('/fincas/' + id),
    create: (data) => request('/fincas', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request('/fincas/' + id, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request('/fincas/' + id, { method: 'DELETE' })
  },
  cultivos: {
    getAll: () => request('/cultivos'),
    create: (data) => request('/cultivos', { method: 'POST', body: JSON.stringify(data) })
  },
  fincaCultivo: {
    getByFinca: (fincaId) => request('/fincas/' + fincaId + '/cultivos'),
    asociar: (data) => request('/finca-cultivo', { method: 'POST', body: JSON.stringify(data) }),
    eliminar: (fincaId, cultivoId) =>
      request('/finca-cultivo/' + fincaId + '/' + cultivoId, { method: 'DELETE' })
  }
}`
            }
        ]
    },
    'fase3_crud': {
        title: 'CRUD Frontend: Fincas, Cultivos y N:M',
        codeBlocks: [
            {
                file: 'src/components/FincaTable.jsx',
                lang: 'jsx',
                title: 'Tabla interactiva de Fincas',
                url: 'recursos/codigo-ejemplo/src/components/FincaTable.jsx',
                code: `import { useState, useEffect } from 'react'
import { api } from '../services/api'

function FincaTable({ onVerDetalle }) {
  const [fincas, setFincas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.fincas.getAll()
      .then(setFincas)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta finca?')) return
    await api.fincas.delete(id)
    setFincas(fincas.filter(f => f.id !== id))
  }

  if (loading) return <div className="spinner">Cargando fincas...</div>
  if (error) return <div className="error-box">Error: {error}</div>
  if (fincas.length === 0)
    return <div className="empty-state">No hay fincas. Crea la primera.</div>

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th><th>Propietario</th>
            <th>Vereda</th><th>Municipio</th>
            <th>Hectareas</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fincas.map(f => (
            <tr key={f.id}>
              <td>{f.nombre}</td>
              <td>{f.propietario}</td>
              <td>{f.vereda}</td>
              <td>{f.municipio}</td>
              <td>{f.hectareas}</td>
              <td className="actions">
                <button onClick={() => onVerDetalle(f.id)}
                  className="btn-action btn-view">Ver cultivos</button>
                <button onClick={() => eliminar(f.id)}
                  className="btn-action btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FincaTable`
            },
            {
                file: 'src/components/CultivoTable.jsx',
                lang: 'jsx',
                title: 'Tabla de Cultivos',
                url: 'recursos/codigo-ejemplo/src/components/CultivoTable.jsx',
                code: `import { useState, useEffect } from 'react'
import { api } from '../services/api'

function CultivoTable() {
  const [cultivos, setCultivos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.cultivos.getAll()
      .then(setCultivos)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="spinner">Cargando cultivos...</div>
  if (error) return <div className="error-box">{error}</div>
  if (cultivos.length === 0)
    return <div className="empty-state">No hay cultivos registrados.</div>

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th><th>Tipo</th><th>Ciclo (dias)</th>
          </tr>
        </thead>
        <tbody>
          {cultivos.map(c => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td><span className={'badge badge-' + c.tipo.toLowerCase()}>
                {c.tipo}
              </span></td>
              <td>{c.ciclo_dias}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CultivoTable`
            },
            {
                file: 'src/components/AsociarForm.jsx',
                lang: 'jsx',
                title: 'Formulario de Asociacion (N:M)',
                url: 'recursos/codigo-ejemplo/src/components/AsociarForm.jsx',
                code: `import { useState, useEffect } from 'react'
import { api } from '../services/api'

function AsociarForm({ onAsociado }) {
  const [fincas, setFincas] = useState([])
  const [cultivos, setCultivos] = useState([])
  const [form, setForm] = useState({
    finca_id: '',
    cultivo_id: '',
    area_sembrada_ha: '',
    fecha_siembra: '',
    temporada: 'seca',
    estado: 'activo'
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([api.fincas.getAll(), api.cultivos.getAll()])
      .then(([f, c]) => { setFincas(f); setCultivos(c) })
      .catch(err => setError(err.message))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError(null)
    try {
      await api.fincaCultivo.asociar({
        ...form,
        finca_id: Number(form.finca_id),
        cultivo_id: Number(form.cultivo_id),
        area_sembrada_ha: parseFloat(form.area_sembrada_ha)
      })
      setForm({ finca_id: '', cultivo_id: '', area_sembrada_ha: '',
        fecha_siembra: '', temporada: 'seca', estado: 'activo' })
      if (onAsociado) onAsociado()
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="asociar-form" onSubmit={handleSubmit}>
      <h3>Asociar Cultivo a Finca</h3>

      <div className="form-grid">
        <label>
          Finca
          <select name="finca_id" value={form.finca_id}
            onChange={handleChange} required>
            <option value="">-- Seleccionar finca --</option>
            {fincas.map(f =>
              <option key={f.id} value={f.id}>{f.nombre}</option>
            )}
          </select>
        </label>

        <label>
          Cultivo
          <select name="cultivo_id" value={form.cultivo_id}
            onChange={handleChange} required>
            <option value="">-- Seleccionar cultivo --</option>
            {cultivos.map(c =>
              <option key={c.id} value={c.id}>{c.nombre} ({c.tipo})</option>
            )}
          </select>
        </label>

        <label>
          Area sembrada (ha)
          <input type="number" name="area_sembrada_ha" step="0.01" min="0.01"
            value={form.area_sembrada_ha} onChange={handleChange} required />
        </label>

        <label>
          Fecha de siembra
          <input type="date" name="fecha_siembra"
            value={form.fecha_siembra} onChange={handleChange} required />
        </label>

        <label>
          Temporada
          <select name="temporada" value={form.temporada}
            onChange={handleChange}>
            <option value="seca">Seca</option>
            <option value="lluvia">Lluvia</option>
            <option value="todo_el_anio">Todo el año</option>
          </select>
        </label>

        <label>
          Estado
          <select name="estado" value={form.estado}
            onChange={handleChange}>
            <option value="activo">Activo</option>
            <option value="cosechado">Cosechado</option>
          </select>
        </label>
      </div>

      {error && <div className="form-error">{error}</div>}

      <button type="submit" className="btn-submit" disabled={enviando}>
        {enviando ? 'Asociando...' : 'Asociar cultivo'}
      </button>
    </form>
  )
}

export default AsociarForm`
            },
            {
                file: 'src/components/FincaDetalle.jsx',
                lang: 'jsx',
                title: 'Detalle de Finca con atributos propios',
                url: 'recursos/codigo-ejemplo/src/components/FincaDetalle.jsx',
                code: `import { useState, useEffect } from 'react'
import { api } from '../services/api'

function FincaDetalle({ fincaId, onVolver }) {
  const [finca, setFinca] = useState(null)
  const [cultivosAsociados, setCultivosAsociados] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState('todos')

  useEffect(() => {
    Promise.all([
      api.fincas.getById(fincaId),
      api.fincaCultivo.getByFinca(fincaId)
    ])
      .then(([f, cultivos]) => { setFinca(f); setCultivosAsociados(cultivos) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [fincaId])

  const cultivosFiltrados = filtroEstado === 'todos'
    ? cultivosAsociados
    : cultivosAsociados.filter(c => c.estado === filtroEstado)

  if (loading) return <div className="spinner">Cargando detalle...</div>
  if (!finca) return <div className="error-box">Finca no encontrada</div>

  return (
    <div className="finca-detalle">
      <button onClick={onVolver} className="btn-back">← Volver</button>

      <div className="finca-header">
        <h2>{finca.nombre}</h2>
        <p>{finca.propietario} — {finca.vereda}, {finca.municipio}</p>
        <p>{finca.hectareas} hectareas en total</p>
      </div>

      <div className="filtro-bar">
        <span>Filtrar:</span>
        {['todos', 'activo', 'cosechado'].map(est => (
          <button key={est}
            className={'filtro-btn ' + (filtroEstado === est ? 'active' : '')}
            onClick={() => setFiltroEstado(est)}>
            {est === 'todos' ? 'Todos' : est.charAt(0).toUpperCase() + est.slice(1)}
          </button>
        ))}
      </div>

      <h3>Cultivos asociados ({cultivosFiltrados.length})</h3>

      {cultivosFiltrados.length === 0 ? (
        <div className="empty-state">
          Esta finca no tiene cultivos {filtroEstado !== 'todos' ? filtroEstado : 'registrados'}.
        </div>
      ) : (
        <div className="cultivos-grid">
          {cultivosFiltrados.map(fc => (
            <div key={fc.finca_id + '-' + fc.cultivo_id} className="cultivo-card">
              <div className="cultivo-card-header">
                <h4>{fc.cultivo_nombre}</h4>
                <span className={'badge badge-' + fc.estado}>{fc.estado}</span>
              </div>
              <div className="cultivo-card-body">
                <p><strong>Area:</strong> {fc.area_sembrada_ha} ha</p>
                <p><strong>Siembra:</strong> {fc.fecha_siembra}</p>
                <p><strong>Temporada:</strong> {fc.temporada}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FincaDetalle`
            }
        ]
    },
    'fase3_ux': {
        title: 'UX: Visualizar N:M en la Interfaz',
        codeBlocks: [
            {
                file: 'Estructura de navegacion UX',
                lang: 'text',
                title: 'Patron de vista jerarquica',
                url: '',
                code: `Lista de Fincas (tabla simple)
  └── Click en "Ver cultivos" → Detalle de Finca
        ├── Info de la finca (nombre, propietario, hectareas)
        ├── Filtros: Todos | Activos | Cosechados
        └── Grid de cards de cultivos asociados
              ├── Nombre del cultivo
              ├── Area sembrada (atributo de la relacion)
              ├── Fecha de siembra (atributo de la relacion)
              ├── Temporada (atributo de la relacion)
              └── Estado: activo/cosechado (atributo de la relacion)`
            }
        ]
    },
    'fase3_reto': {
        title: 'Reto Final: Filtro de Cultivos Activos',
        codeBlocks: [
            {
                file: 'Ayuda: estructura del filtro',
                lang: 'jsx',
                title: 'Patron de filtro funcional',
                url: '',
                code: `const [filtroEstado, setFiltroEstado] = useState('todos')

const cultivosFiltrados = cultivosAsociados.filter(fc => {
  if (filtroEstado === 'todos') return true
  return fc.estado === filtroEstado
})

// En el JSX:
<div className="filtro-bar">
  {['todos', 'activo', 'cosechado'].map(est => (
    <button
      key={est}
      className={'filtro-btn ' + (filtroEstado === est ? 'active' : '')}
      onClick={() => setFiltroEstado(est)}
      >
      {est === 'todos' ? 'Todos' : est}
    </button>
  ))}
</div>

<p>Mostrando {cultivosFiltrados.length} de {cultivosAsociados.length} cultivos</p>`
            }
        ]
    },
    'fase3_descargar': {
        title: 'Descargar y ejecutar el proyecto',
        codeBlocks: [
            {
                file: 'Terminal 1 — Iniciar API FastAPI',
                lang: 'bash',
                title: 'Paso 1: Servidor backend',
                url: 'recursos/codigo-ejemplo/',
                code: `# Ve a la carpeta de la API (desde la guia FastAPI)
cd ../Guia FastApi/recursos/codigo-ejemplo

python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt

# Inicia el servidor
uvicorn main:app --reload --port 8009`
            },
            {
                file: 'Terminal 2 — Frontend React',
                lang: 'bash',
                title: 'Paso 2: Iniciar frontend Vite',
                url: 'recursos/codigo-ejemplo/',
                code: `cd recursos/codigo-ejemplo
npm install
npm run dev`
            },
            {
                file: 'Terminal 3 — Pruebas cURL',
                lang: 'bash',
                title: 'Comandos para probar CRUD N:M',
                url: '',
                code: `# 1. Crear una finca
curl -X POST http://localhost:8009/api/fincas \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"El Porvenir\",\"propietario\":\"Jose Rodriguez\",\"vereda\":\"La Mesa\",\"municipio\":\"Velez\",\"hectareas\":8.5}"

# 2. Crear un cultivo
curl -X POST http://localhost:8009/api/cultivos \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Cafe\",\"tipo\":\"Cafe\",\"ciclo_dias\":180}"

# 3. Asociar cultivo a finca (N:M)
curl -X POST http://localhost:8009/api/finca-cultivo \
  -H "Content-Type: application/json" \
  -d "{\"finca_id\":1,\"cultivo_id\":1,\"area_sembrada_ha\":3.2,\"fecha_siembra\":\"2026-03-15\",\"temporada\":\"lluvia\"}"

# 4. Listar cultivos de una finca
curl http://localhost:8009/api/fincas/1/cultivos`
            },
            {
                file: 'setup.ps1 — PowerShell',
                lang: 'powershell',
                title: 'Script de setup automatico',
                url: 'setup.ps1',
                code: `# setup.ps1 — Configura todo automaticamente
Write-Host "=== Configurando Frontend React + API FastAPI ===" -ForegroundColor Cyan

# 1. Verificar Node.js
$nodeVer = node --version
Write-Host "Node.js: $nodeVer" -ForegroundColor Green

# 2. Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
npm install

# 3. Iniciar servidor
Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Yellow
npm run dev`
            }
        ]
    }
};

window.MODULES_CONTENT_FASE3 = MODULES_CONTENT_FASE3;