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
      <Container fluid className="py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 text-center">
            <h3 className="mb-3">No se encontró ningún pedido reciente.</h3>
            <Link to="/">
              <Button className="gracias-btn">Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  const total = orden.productos.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <Container fluid className="py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <Card className="gracias-card w-100">
            <Card.Body>
              <h2>¡Gracias por tu compra! 🎉</h2>
              <p>
                {orden.cliente.nombre} tu pedido ha sido registrado con éxito.<br/>
                Fecha: {orden.fecha}
              </p>

              <h5>Detalle de tu pedido:</h5>
              <div className="table-responsive">
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
              </div>

              <Link to="/">
                <Button className="gracias-btn">Volver al inicio</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Gracias;
