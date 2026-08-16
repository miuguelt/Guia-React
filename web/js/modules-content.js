const MODULES_CONTENT = {
    'm-entorno': {
        codeBlocks: [
            {
                file: 'powershell',
                lang: 'bash',
                title: 'Crear proyecto React con Vite',
                code: `# 1. Crear proyecto con Vite (recomendado)
npm create vite@latest mi-app -- --template react

# 2. Entrar al proyecto
cd mi-app

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev`
            },
            {
                file: 'src/App.jsx',
                lang: 'jsx',
                title: 'Componente inicial App.jsx',
                code: `function App() {
  return (
    <div>
      <h1>Hola, React!</h1>
      <p>Mi primera aplicacion</p>
    </div>
  )
}

export default App`
            }
        ]
    },
    'm-componentes': {
        codeBlocks: [
            {
                file: 'src/components/Saludo.jsx',
                lang: 'jsx',
                title: 'Componente funcional con props',
                code: `function Saludo({ nombre, edad }) {
  return (
    <div className="saludo-card">
      <h2>Hola, {nombre}!</h2>
      {edad && <p>Tienes {edad} años</p>}
    </div>
  )
}

export default Saludo`
            },
            {
                file: 'src/App.jsx',
                lang: 'jsx',
                title: 'Usando el componente Saludo',
                code: `import Saludo from './components/Saludo'

function App() {
  return (
    <div>
      <Saludo nombre="Ana" edad={25} />
      <Saludo nombre="Carlos" />
      <Saludo nombre="Maria" edad={30} />
    </div>
  )
}

export default App`
            },
            {
                type: 'prompt',
                text: 'Genera un componente FincaCard en React 19 que:\n\nProps: finca (id, nombre, propietario, municipio, hectareas)\n- Muestra los datos en una tarjeta con estilo\n- Boton "Ver detalle" que navega a /fincas/{id}\n- Boton "Eliminar" con confirmacion\n- Estados: loading, error, empty\n- Usa CSS modules o styled components\n\nIncluye PropTypes o TypeScript interfaces.',
                tool: 'opencode + ChatGPT',
                tip: 'Especifica si usas TypeScript o JavaScript'
            }
        ]
    },
    'm-estado': {
        codeBlocks: [
            {
                file: 'src/components/Contador.jsx',
                lang: 'jsx',
                title: 'useState - Contador interactivo',
                code: `import { useState } from 'react'

function Contador() {
  const [contador, setContador] = useState(0)

  return (
    <div>
      <h2>Contador: {contador}</h2>
      <button onClick={() => setContador(c => c + 1)}>
        Incrementar
      </button>
      <button onClick={() => setContador(0)}>
        Resetear
      </button>
    </div>
  )
}

export default Contador`
            },
            {
                file: 'src/components/Formulario.jsx',
                lang: 'jsx',
                title: 'Formulario controlado con useState',
                code: `import { useState } from 'react'

function Formulario() {
  const [form, setForm] = useState({
    nombre: '', email: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    alert(JSON.stringify(form, null, 2))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={form.nombre}
             onChange={handleChange} placeholder="Nombre" />
      <input name="email" value={form.email}
             onChange={handleChange} placeholder="Email" />
      <button type="submit">Enviar</button>
    </form>
  )
}`
            },
            {
                type: 'prompt',
                text: 'Crea un custom hook useForm que:\n\n- Reciba un objeto con valores iniciales\n- Retorne: values, handleChange, reset, errors\n- Valide campos requeridos automaticamente\n- Soporte submit con validacion previa\n\nEjemplo de uso:\nconst { values, handleChange, reset, errors } = useForm({ nombre: "", email: "" });\n\nGenera el hook y un componente de ejemplo.',
                tool: 'opencode',
                tip: 'Pruebalo con el formulario del ejemplo anterior'
            }
        ]
    },
    'm-efectos': {
        codeBlocks: [
            {
                file: 'src/components/Reloj.jsx',
                lang: 'jsx',
                title: 'useEffect - Reloj en tiempo real',
                code: `import { useState, useEffect } from 'react'

function Reloj() {
  const [hora, setHora] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setHora(new Date())
    }, 1000)

    return () => clearInterval(id) // cleanup
  }, []) // [] = solo al montar

  return <h2>{hora.toLocaleTimeString('es-CO')}</h2>
}

export default Reloj`
            },
            {
                file: 'src/components/ListaUsuarios.jsx',
                lang: 'jsx',
                title: 'useEffect con fetch a API',
                code: `import { useState, useEffect } from 'react'

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsuarios(data)
        setCargando(false)
      })
  }, [])

  if (cargando) return <p>Cargando...</p>

  return (
    <ul>
      {usuarios.map(u => (
        <li key={u.id}>{u.name} - {u.email}</li>
      ))}
    </ul>
  )
}

export default ListaUsuarios`
            }
        ]
    },
    'm-routing': {
        codeBlocks: [
            {
                file: 'src/App.jsx',
                lang: 'jsx',
                title: 'React Router DOM basico',
                code: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Acerca from './pages/Acerca'
import Contacto from './pages/Contacto'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/acerca">Acerca</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  )
}`
            }
        ]
    },
    'm-reflexion-jquery': {
        codeBlocks: [{
            file: 'jQuery/DOM Manual',
            lang: 'javascript',
            title: 'Manipulación DOM con jQuery',
            code: '$("#btn").click(function() {\n  var count = parseInt($("#count").text()) + 1;\n  $("#count").text(count);\n  if (count % 2 === 0) {\n    $("#status").text("Par");\n  }\n});'
        }]
    },
    'm-reflexion-react': {
        codeBlocks: [{
            file: 'React Component',
            lang: 'jsx',
            title: 'Componente React con estado',
            code: 'function Contador() {\n  const [count, setCount] = useState(0);\n  return <div>\n    <p>{count} - {count % 2 === 0 ? "Par" : "Impar"}</p>\n    <button onClick={() => setCount(c => c + 1)}>+1</button>\n  </div>\n}'
        }]
    },
    'm-api': {
        codeBlocks: [
            {
                file: 'src/hooks/useFetch.js',
                lang: 'javascript',
                title: 'Custom hook useFetch para llamadas API',
                code: `import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Error ' + res.status)
        return res.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}`
            },
            {
                type: 'prompt',
                text: 'Extiende el hook useFetch para soportar:\n\n1. Metodo HTTP configurable (GET, POST, PUT, DELETE)\n2. Body para POST/PUT\n3. Headers personalizados\n4. Cache con stale-while-revalidate\n5. Refetch manual\n6. Abort controller para cancelacion\n\nFirma sugerida:\nconst { data, loading, error, refetch, cancel } = useFetch(url, { method, body, headers });',
                tool: 'opencode + ChatGPT',
                tip: 'Agrega tipos TypeScript para mejor DX'
            }
        ]
    }
};

window.MODULES_CONTENT = MODULES_CONTENT;
