const API = import.meta.env.VITE_API_URL || 'http://localhost:31026/api';

async function request(url, options = {}) {
  const res = await fetch(`${API}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const err = new Error((errorBody && (errorBody.mensaje || errorBody.message)) || res.statusText);
    err.status = res.status;
    err.body = errorBody;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

export const fincaApi = {
  listar: () => request('/fincas'),
  obtener: (id) => request(`/fincas/${id}`),
  crear: (data) => request('/fincas', { method: 'POST', body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`/fincas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  eliminar: (id) => request(`/fincas/${id}`, { method: 'DELETE' })
};

export const cultivoApi = {
  listar: () => request('/cultivos'),
  obtener: (id) => request(`/cultivos/${id}`),
  crear: (data) => request('/cultivos', { method: 'POST', body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`/cultivos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  eliminar: (id) => request(`/cultivos/${id}`, { method: 'DELETE' })
};

export const fincaCultivoApi = {
  listar: () => request('/finca-cultivos'),
  asociar: (data) => request('/finca-cultivos', { method: 'POST', body: JSON.stringify(data) }),
  eliminar: (id) => request(`/finca-cultivos/${id}`, { method: 'DELETE' })
};

export default API;
