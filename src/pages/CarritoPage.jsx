import Carrito from '../components/Carrito';

export default function CarritoPage({ carrito, eliminarDelCarrito }) {
  return <Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />;
}
