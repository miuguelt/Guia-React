const API = 'http://localhost:8080/api'

async function request(url, options = {}) {
  const res = await fetch(`${API}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  })
  if (!res.ok) {
    const err = new Error(res.statusText)
    err.status = res.status
    err.body = await res.json().catch(() => null)
    throw err
  }
  return res.status === 204 ? null : res.json()
}

export const fincaApi = {
  listar: () => request('/fincas'),
  obtener: (id) => request(`/fincas/${id}`),
  crear: (data) => request('/fincas', { method: 'POST', body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`/fincas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  eliminar: (id) => request(`/fincas/${id}`, { method: 'DELETE' })
}

export const cultivoApi = {
  listar: () => request('/cultivos'),
  obtener: (id) => request(`/cultivos/${id}`),
  crear: (data) => request('/cultivos', { method: 'POST', body: JSON.stringify(data) }),
}

export default API
