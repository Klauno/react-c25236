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
    const savedCarrito = localStorage.getItem('carrito');
    return savedCarrito ? JSON.parse(savedCarrito) : [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const aumentarCantidad = (id) => {
    setCarrito(prev =>
      prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p)
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito(prev =>
      prev
        .map(p => {
          if (p.id === id) {
            const nuevaCantidad = p.cantidad - 1;
            return nuevaCantidad > 0 ? { ...p, cantidad: nuevaCantidad } : null;
          }
          return p;
        })
        .filter(p => p !== null)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter(p => p.id !== id));
  };

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  return (
    <BrowserRouter>
      <Layout onLogout={handleLogout} isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/moda" element={<Moda agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />

          <Route
            path="/login"
            element={<LoginWrapper isAuthenticated={isAuthenticated} onLogin={handleLogin} />}
          />

          <Route
            path="/carrito"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CarritoPage
                  carrito={carrito}
                  aumentarCantidad={aumentarCantidad}
                  disminuirCantidad={disminuirCantidad}
                  eliminarDelCarrito={eliminarDelCarrito}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <h2>Checkout</h2>
              </ProtectedRoute>
            }
          />

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
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  return <Login onLogin={onLogin} />;
}

export default App;
