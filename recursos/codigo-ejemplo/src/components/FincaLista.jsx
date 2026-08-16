import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fincaApi } from '../services/api'
import FincaCard from './FincaCard'

function FincaLista() {
  const [fincas, setFincas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargar = () => {
    setLoading(true)
    fincaApi.listar()
      .then(setFincas)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(cargar, [])

  if (loading) return <div className="loading">Cargando fincas...</div>
  if (error) return <div className="error">Error: {error.message}</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Fincas</h1>
        <Link to="/fincas/nueva" className="btn btn-primary">+ Nueva Finca</Link>
      </div>
      {fincas.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#6b7280' }}>
          <p>Todavia no hay fincas registradas</p>
          <Link to="/fincas/nueva" className="btn btn-primary" style={{ marginTop: '1rem' }}>Crear primera finca</Link>
        </div>
      ) : (
        <div className="grid">
          {fincas.map(f => <FincaCard key={f.id} finca={f} onDelete={cargar} />)}
        </div>
      )}
    </div>
  )
}

export default FincaLista
