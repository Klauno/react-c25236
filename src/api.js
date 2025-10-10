export const obtenerProductos = async () => {
  const respuesta = await fetch('https://fakestoreapi.com/products');
  if (!respuesta.ok) throw new Error('Error al cargar productos');
  return respuesta.json();
};

export const obtenerProductoDetalle = async (id) => {
  const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!respuesta.ok) throw new Error('Error al cargar detalle del producto');
  return respuesta.json();
};
