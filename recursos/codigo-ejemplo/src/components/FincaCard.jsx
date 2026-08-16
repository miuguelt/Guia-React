import { Link } from 'react-router-dom'
import { fincaApi } from '../services/api'

function FincaCard({ finca, onDelete }) {
  const handleDelete = async () => {
    if (!confirm('Eliminar esta finca?')) return
    try {
      await fincaApi.eliminar(finca.id)
      onDelete(finca.id)
    } catch (e) {
      alert('Error al eliminar: ' + e.message)
    }
  }

  return (
    <div className="card">
      <h2>{finca.nombre}</h2>
      <p><strong>Propietario:</strong> {finca.propietario}</p>
      <p><strong>Municipio:</strong> {finca.municipio}</p>
      <p><strong>Hectareas:</strong> {finca.areaHectareas}</p>
      {finca.descripcion && <p>{finca.descripcion}</p>}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '.5rem' }}>
        <Link to={`/fincas/${finca.id}`} className="btn btn-primary btn-sm">Ver</Link>
        <button onClick={handleDelete} className="btn btn-danger btn-sm">Eliminar</button>
      </div>
    </div>
  )
}

export default FincaCard
