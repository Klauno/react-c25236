import { Link } from 'react-router-dom';

export default function Producto({ producto, agregarAlCarrito }) {
  return (
    <div className="product-card">
      <h3><Link to={`/producto/${producto.id}`}>{producto.title}</Link></h3>
      <img src={producto.image} alt={producto.title} />
      <p>Precio: ${producto.price}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
}
