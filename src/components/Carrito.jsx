export default function Carrito({ carrito, vaciarCarrito, aumentarCantidad, disminuirCantidad, eliminarDelCarrito }) {
  const total = carrito.reduce((sum, p) => sum + p.price * p.cantidad, 0);

  return (
    <div>
      <h2>Carrito</h2>
      {carrito.length === 0 ? <p>Tu carrito está vacío</p> : (
        <>
          {carrito.map(p => (
            <div key={p.id} className="carrito-item">
              <span>{p.title} - ${p.price} x {p.cantidad}</span>
              <button onClick={() => disminuirCantidad(p.id)}>-</button>
              <button onClick={() => aumentarCantidad(p.id)}>+</button>
              <button onClick={() => eliminarDelCarrito(p.id)}>Eliminar</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button
            onClick={vaciarCarrito}
            style={{ marginTop: 10, backgroundColor: '#c0392b', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}
