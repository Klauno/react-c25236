import Carrito from '../components/Carrito';

export default function CarritoPage({ carrito, aumentarCantidad, disminuirCantidad, eliminarDelCarrito, vaciarCarrito }) {
  return (
    <Carrito 
      carrito={carrito} 
      aumentarCantidad={aumentarCantidad} 
      disminuirCantidad={disminuirCantidad} 
      eliminarDelCarrito={eliminarDelCarrito} 
      vaciarCarrito={vaciarCarrito} />
  );
}
