import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import UserProfile from "./pages/user/UserProfile";
import Cart from "./pages/cart/Cart";
import { AdminProducts } from "./pages/products/AdminProducts";
// ❌ Eliminado: import Checkout from "./pages/checkout.jsx";
import Gracias from "./pages/gracias.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <Header />

          <main className="flex-grow-1 mt-5">
            <Container className="py-4 mt-1">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/cart" element={<Cart />} />

                  {/* ❌ Eliminado el checkout */}
                  {/* <Route path="/checkout" element={<Checkout />} /> */}

                  <Route path="/gracias" element={<Gracias />} />
                  <Route
                    path="/admin/products"
                    element={<AdminProducts />}
                  />
                </Route>
              </Routes>
            </Container>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
