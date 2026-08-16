function Saludo({ nombre, edad }) {
  return (
    <div className="saludo-card">
      <h2>Hola, {nombre}!</h2>
      {edad && <p>Tienes {edad} años</p>}
    </div>
  )
}

export default Saludo
