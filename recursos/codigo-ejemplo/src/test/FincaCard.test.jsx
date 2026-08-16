import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FincaCard from '../components/FincaCard'

const fincaMock = {
  id: 1,
  nombre: 'El Porvenir',
  propietario: 'Carlos Lopez',
  municipio: 'San Vicente',
  areaHectareas: 50,
  descripcion: 'Finca ganadera'
}

function renderCard(finca = fincaMock, onDelete = vi.fn()) {
  return render(
    <MemoryRouter>
      <FincaCard finca={finca} onDelete={onDelete} />
    </MemoryRouter>
  )
}

describe('FincaCard', () => {
  it('renderiza con datos de finca', () => {
    renderCard()
    expect(screen.getByText('El Porvenir')).toBeInTheDocument()
  })

  it('muestra el propietario', () => {
    renderCard()
    expect(screen.getByText(/Carlos Lopez/)).toBeInTheDocument()
  })

  it('tiene un link Ver a /fincas/1', () => {
    renderCard()
    const link = screen.getByRole('link', { name: 'Ver' })
    expect(link).toHaveAttribute('href', '/fincas/1')
  })

  it('muestra descripcion si existe', () => {
    renderCard()
    expect(screen.getByText('Finca ganadera')).toBeInTheDocument()
  })

  it('no muestra descripcion si no tiene', () => {
    renderCard({ ...fincaMock, descripcion: undefined })
    expect(screen.queryByText('Finca ganadera')).not.toBeInTheDocument()
  })
})
