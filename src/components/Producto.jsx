import { Link } from 'react-router-dom';

export default function Producto({ producto, agregarAlCarrito }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '15px' }}>
      <h3><Link to={`/producto/${producto.id}`}>{producto.title}</Link></h3>
      <img src={producto.image} alt={producto.title} style={{ maxWidth: '150px' }} />
      <p>Precio: ${producto.price}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
}
