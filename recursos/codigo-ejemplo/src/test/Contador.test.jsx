import { render, screen, fireEvent } from '@testing-library/react'
import Contador from '../components/Contador'

describe('Contador', () => {
  it('renderiza con valor inicial 0', () => {
    render(<Contador />)
    expect(screen.getByText('Contador: 0')).toBeInTheDocument()
  })

  it('incrementa al hacer click en Incrementar', () => {
    render(<Contador />)
    fireEvent.click(screen.getByText('Incrementar'))
    expect(screen.getByText('Contador: 1')).toBeInTheDocument()
  })

  it('resetea a 0 al hacer click en Resetear', () => {
    render(<Contador />)
    fireEvent.click(screen.getByText('Incrementar'))
    fireEvent.click(screen.getByText('Incrementar'))
    expect(screen.getByText('Contador: 2')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Resetear'))
    expect(screen.getByText('Contador: 0')).toBeInTheDocument()
  })
})
