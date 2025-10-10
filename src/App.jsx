import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Inicio from './pages/Inicio';
import Moda from './pages/Moda';
import DetalleProducto from './pages/DetalleProducto';
import CarritoPage from './pages/CarritoPage';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter(p => p.id !== id));
  };

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/moda" element={<Moda agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CarritoPage carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
