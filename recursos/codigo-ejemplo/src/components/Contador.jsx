import { useState } from 'react'

function Contador() {
  const [contador, setContador] = useState(0)

  return (
    <div>
      <h2>Contador: {contador}</h2>
      <button onClick={() => setContador(c => c + 1)}>Incrementar</button>
      <button onClick={() => setContador(0)}>Resetear</button>
    </div>
  )
}

export default Contador
