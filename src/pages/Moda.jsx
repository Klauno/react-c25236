import { useState, useEffect } from 'react';
import Producto from '../components/Producto';
import { obtenerProductos } from '../api';

export default function Moda({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  <div>
    <h2>Moda</h2>
    <div className="product-list">
      {productos.map(prod => (
        <Producto key={prod.id} producto={prod} agregarAlCarrito={agregarAlCarrito} />
      ))}
    </div>
  </div>
);

}
