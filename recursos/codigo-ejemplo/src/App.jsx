import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import FincaLista from './components/FincaLista'
import FincaForm from './components/FincaForm'
import FincaDetalle from './components/FincaDetalle'

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/" className="nav-logo">🌿 Fincas App</Link>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/fincas">Fincas</Link>
          <Link to="/fincas/nueva">+ Nueva Finca</Link>
        </div>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fincas" element={<FincaLista />} />
          <Route path="/fincas/nueva" element={<FincaForm />} />
          <Route path="/fincas/:id" element={<FincaDetalle />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
