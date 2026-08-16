export default function TablaFincas({ fincas, onEditar, onEliminar, onVerDetalle }) {
  if (!fincas || fincas.length === 0) {
    return <div className="empty-state">No hay fincas registradas en el sistema.</div>;
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Finca</th>
            <th>Propietario</th>
            <th>Ubicación</th>
            <th>Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fincas.map(f => (
            <tr key={f.id}>
              <td data-label="ID">#{f.id}</td>
              <td data-label="Finca"><strong>{f.nombre}</strong></td>
              <td data-label="Propietario">{f.propietario}</td>
              <td data-label="Ubicación">{f.vereda}, {f.municipio}</td>
              <td data-label="Área"><span className="badge-ha">{f.hectareas} ha</span></td>
              <td data-label="Acciones">
                <div style="display:flex;gap:0.4rem;">
                  {onVerDetalle && (
                    <button className="btn btn-sm btn-secondary" onClick={() => onVerDetalle(f)}>👁️</button>
                  )}
                  {onEditar && (
                    <button className="btn btn-sm btn-primary" onClick={() => onEditar(f)}>✏️</button>
                  )}
                  {onEliminar && (
                    <button className="btn btn-sm btn-danger" onClick={() => onEliminar(f.id)}>🗑️</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
