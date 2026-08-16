import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import FincaForm from '../components/FincaForm'

function renderForm(path = '/fincas/nueva') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/fincas/nueva" element={<FincaForm />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('FincaForm', () => {
  it('renderiza en modo crear', () => {
    renderForm()
    expect(screen.getByRole('heading', { name: 'Nueva Finca' })).toBeInTheDocument()
  })

  it('muestra campos required', () => {
    renderForm()
    expect(screen.getByText('Nombre *')).toBeInTheDocument()
    expect(screen.getByText('Propietario *')).toBeInTheDocument()
    expect(screen.getByText('Municipio *')).toBeInTheDocument()
    expect(screen.getByText('Area (hectareas) *')).toBeInTheDocument()
  })

  it('tiene boton de submit con texto Crear Finca', () => {
    renderForm()
    expect(screen.getByRole('button', { name: 'Crear Finca' })).toBeInTheDocument()
  })
})
