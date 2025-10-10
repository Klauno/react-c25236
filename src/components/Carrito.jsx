export default function Carrito({ carrito, eliminarDelCarrito }) {
  const total = carrito.reduce((sum, p) => sum + p.price * p.cantidad, 0);

  return (
    <div>
      <h2>Carrito</h2>
      {carrito.length === 0 ? <p>Carrito vacío</p> : (
        carrito.map((p) => (
          <div key={p.id} style={{ marginBottom: '10px' }}>
            <span>{p.title} - ${p.price} x {p.cantidad}</span>
            <button style={{ marginLeft: '10px' }} onClick={() => eliminarDelCarrito(p.id)}>Eliminar</button>
          </div>
        ))
      )}
      {carrito.length > 0 && <h3>Total: ${total.toFixed(2)}</h3>}
    </div>
  );
}
