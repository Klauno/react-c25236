import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductoDetalle from '../components/ProductoDetalle';
import { obtenerProductoDetalle } from '../api';

export default function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProductoDetalle(id)
      .then(setProducto)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return <ProductoDetalle producto={producto} agregarAlCarrito={agregarAlCarrito} />;
}
