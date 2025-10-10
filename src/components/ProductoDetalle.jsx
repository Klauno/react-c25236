export default function ProductoDetalle({ producto, agregarAlCarrito }) {
  return (
    <div>
      <h2>{producto.title}</h2>
      <img src={producto.image} alt={producto.title} style={{ maxWidth: '200px' }} />
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
}
