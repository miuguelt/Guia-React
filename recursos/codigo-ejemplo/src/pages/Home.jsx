import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h1>Bienvenido a Fincas App</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1.125rem' }}>
          Sistema de gestion de fincas y cultivos del SENA ADSO
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/fincas" className="btn btn-primary">Ver Fincas</Link>
          <Link to="/fincas/nueva" className="btn btn-primary">+ Nueva Finca</Link>
        </div>
      </div>
      <div className="grid" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h2>🌿 Fincas</h2>
          <p style={{ color: '#6b7280' }}>Administra las fincas registradas en el sistema</p>
        </div>
        <div className="card">
          <h2>🌱 Cultivos</h2>
          <p style={{ color: '#6b7280' }}>Gestiona los cultivos asociados a cada finca</p>
        </div>
        <div className="card">
          <h2>📊 Reportes</h2>
          <p style={{ color: '#6b7280' }}>Visualiza estadisticas de produccion</p>
        </div>
      </div>
    </div>
  )
}

export default Home
