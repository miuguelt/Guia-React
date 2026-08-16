import { render, screen } from '@testing-library/react'
import Saludo from '../components/Saludo'

describe('Saludo', () => {
  it('renderiza con nombre', () => {
    render(<Saludo nombre="Ana" />)
    expect(screen.getByText('Hola, Ana!')).toBeInTheDocument()
  })

  it('renderiza con nombre y edad', () => {
    render(<Saludo nombre="Luis" edad={25} />)
    expect(screen.getByText('Hola, Luis!')).toBeInTheDocument()
    expect(screen.getByText('Tienes 25 años')).toBeInTheDocument()
  })

  it('no muestra la edad si no se pasa', () => {
    render(<Saludo nombre="Eva" />)
    expect(screen.getByText('Hola, Eva!')).toBeInTheDocument()
    expect(screen.queryByText(/años/)).not.toBeInTheDocument()
  })
})
