// src/pages/checkout.jsx
import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Guardamos una copia del carrito ANTES de vaciarlo
    setSummary(cart);

    // Simulación del proceso de pago
    const timer = setTimeout(() => {
      clearCart();
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner text="Compra en proceso..." />;
  }

  const total = summary.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  return (
    <Container className="text-center mt-5 p-4" style={{ backgroundColor: "#f4e7ff", borderRadius: "8px" }}>
      <Card className="p-4 shadow-lg" style={{ borderColor: "#a36aff" }}>
        <h2 className="mb-3 fw-bold" style={{ color: "#7a4baf" }}>
          Compra realizada con éxito
        </h2>
        <p className="lead mb-4" style={{ color: "#8366c7" }}>
          Gracias por tu compra
        </p>

        <h4 className="text-start mt-4 mb-3" style={{ color: "#6e42a8" }}>
          Detalle de la compra:
        </h4>

       {summary.map((item) => (
  <div
    key={item.id}
    className="d-flex border-bottom py-2"
    style={{ borderColor: "#d3c4f3" }}
  >
    <div style={{ flex: 3, color: "#592e9e", textAlign: "left" }}>{item.title}</div>
    <div style={{ flex: 1, color: "#592e9e", textAlign: "center" }}>x{item.cantidad}</div>
    <div style={{ flex: 1, color: "#592e9e", textAlign: "right" }}>
      ${item.price * item.cantidad}
    </div>
  </div>
))}


        <h4 className="mt-3 fw-bold" style={{ color: "#7a4baf" }}>
          Total: ${total}
        </h4>

        <Button
          size="lg"
          className="mt-4 px-4"
          onClick={() => navigate("/")}
          style={{ backgroundColor: "#7a4baf", borderColor: "#7a4baf" }}
        >
          Volver al inicio
        </Button>
      </Card>
    </Container>
  );
};
