import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fincaApi, cultivoApi } from '../services/api'

function FincaDetalle() {
  const { id } = useParams()
  const [finca, setFinca] = useState(null)
  const [cultivos, setCultivos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      fincaApi.obtener(id),
      fetch(`http://localhost:8080/api/finca-cultivos/finca/${id}`).then(r => r.json()).catch(() => [])
    ])
      .then(([f, c]) => { setFinca(f); setCultivos(c) })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading">Cargando detalle...</div>
  if (error) return <div className="error">Error: {error.message}</div>
  if (!finca) return <div className="error">Finca no encontrada</div>

  return (
    <div>
      <Link to="/fincas" className="btn btn-primary btn-sm" style={{ marginBottom: '1rem' }}>&larr; Volver</Link>
      <div className="card">
        <h1>{finca.nombre}</h1>
        <p><strong>Propietario:</strong> {finca.propietario}</p>
        <p><strong>Municipio:</strong> {finca.municipio}</p>
        <p><strong>Hectareas:</strong> {finca.areaHectareas}</p>
        {finca.descripcion && <p><strong>Descripcion:</strong> {finca.descripcion}</p>}
      </div>
      <h2 style={{ marginTop: '2rem' }}>Cultivos asociados</h2>
      {cultivos.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#6b7280' }}>
          <p>Todavia no hay cultivos para esta finca</p>
        </div>
      ) : (
        <div className="grid">
          {cultivos.map(c => (
            <div key={c.id} className="card">
              <h3>{c.nombre}</h3>
              <p><strong>Tipo:</strong> {c.tipo}</p>
              <p><strong>Area:</strong> {c.areaSembrada} has</p>
              {c.descripcion && <p>{c.descripcion}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FincaDetalle
