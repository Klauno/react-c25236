import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Table } from "react-bootstrap";
import "./Gracias.css";

const Gracias = () => {
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("ultimaOrden");
    if (saved) setOrden(JSON.parse(saved));
  }, []);

  if (!orden) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <h3>No se encontró ningún pedido reciente.</h3>
        <Link to="/" className="ms-3">
          <Button className="gracias-btn">Volver al inicio</Button>
        </Link>
      </Container>
    );
  }

  const total = orden.productos.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <Card className="gracias-card">
        <Card.Body>
          <h2>¡Gracias por tu compra! 🎉</h2>
          <p>
            {orden.cliente.nombre} tu pedido ha sido registrado con éxito.<br/>
            Fecha: {orden.fecha}
          </p>

          <h5>Detalle de tu pedido:</h5>
          <Table striped bordered hover size="sm" className="gracias-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.productos.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="text-end fw-bold">Total:</td>
                <td className="fw-bold">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>

          <Link to="/">
            <Button className="gracias-btn">Volver al inicio</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Gracias;

