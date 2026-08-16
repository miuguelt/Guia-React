import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fincaApi } from '../services/api'

function FincaForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState({ nombre: '', propietario: '', municipio: '', areaHectareas: '', descripcion: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    fincaApi.obtener(id).then(f => {
      setForm({ nombre: f.nombre, propietario: f.propietario, municipio: f.municipio, areaHectareas: f.areaHectareas, descripcion: f.descripcion || '' })
    }).catch(setError)
  }, [id])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.nombre || !form.propietario || !form.municipio || !form.areaHectareas) {
      setError('Todos los campos obligatorios deben estar llenos')
      return
    }
    setLoading(true)
    try {
      isEdit ? await fincaApi.actualizar(id, form) : await fincaApi.crear(form)
      navigate('/fincas')
    } catch (e) {
      setError(e.body?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>{isEdit ? 'Editar Finca' : 'Nueva Finca'}</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Nombre *</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Propietario *</label>
          <input name="propietario" value={form.propietario} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Municipio *</label>
          <input name="municipio" value={form.municipio} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Area (hectareas) *</label>
          <input name="areaHectareas" type="number" value={form.areaHectareas} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Descripcion</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="3" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear Finca'}
        </button>
      </form>
    </div>
  )
}

export default FincaForm
