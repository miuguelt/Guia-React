import { useState, useEffect } from 'react'

function Reloj() {
  const [hora, setHora] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setHora(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return <h2>{hora.toLocaleTimeString('es-CO')}</h2>
}

export default Reloj
