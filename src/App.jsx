import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Inicio from './pages/Inicio';
import Moda from './pages/Moda';
import DetalleProducto from './pages/DetalleProducto';
import CarritoPage from './pages/CarritoPage';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const exist = prev.find(p => p.id === producto.id);
      if (exist) return prev.map(p => p.id === producto.id ? {...p, cantidad: p.cantidad + 1} : p);
      return [...prev, {...producto, cantidad: 1}];
    });
  };

  const aumentarCantidad = (id) => setCarrito(prev => prev.map(p => p.id === id ? {...p, cantidad: p.cantidad + 1} : p));

  const disminuirCantidad = (id) => setCarrito(prev => prev.map(p => {
    if (p.id === id) {
      const newQty = p.cantidad - 1;
      return newQty > 0 ? {...p, cantidad: newQty} : null;
    }
    return p;
  }).filter(Boolean));

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(p => p.id !== id));

  // Función para vaciar el carrito correctamente
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
    vaciarCarrito(); // Limpia también carrito al cerrar sesión
    localStorage.removeItem('isAuthenticated');
  };

  const carritoCount = carrito.reduce((total, p) => total + p.cantidad, 0);

  return (
    <BrowserRouter>
      <Layout onLogout={handleLogout} isAuthenticated={isAuthenticated} carritoCount={carritoCount}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/moda" element={<Moda agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/login" element={<LoginWrapper isAuthenticated={isAuthenticated} onLogin={handleLogin} />} />
          <Route path="/carrito" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CarritoPage carrito={carrito} aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad}
                eliminarDelCarrito={eliminarDelCarrito} vaciarCarrito={vaciarCarrito} />
            </ProtectedRoute>} />
          <Route path="/checkout" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <h2>Checkout</h2>
            </ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function LoginWrapper({ isAuthenticated, onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  }, [isAuthenticated]);

  return <Login onLogin={onLogin} />;
}

export default App;
