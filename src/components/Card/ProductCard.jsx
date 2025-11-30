import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { authorized } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (!authorized) {
      toast.warn("Debes iniciar sesión para comprar", {
        icon: <i className="bi bi-exclamation-triangle-fill text-warning"></i>,
      });
      return;
    }

    // CONTROL REAL DE STOCK: comprobar stock antes de llamar al contexto
    if (Number(product.cantidad) <= 0) {
      toast.error("No hay stock disponible para este producto", {
        icon: <i className="bi bi-x-circle-fill text-danger"></i>,
      });
      return;
    }

    // addToCart devuelve { success, message }
    const result = addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      cantidad: product.cantidad,
    });

    if (result.success) {
      toast.success(result.message, {
        icon: <i className="bi bi-cart-check-fill text-success"></i>,
      });
    } else {
      // por seguridad: si el contexto devuelve fail (p. ej. stock alcanzado),
      // mostramos la advertencia (sin duplicarla porque el contexto no toastea)
      toast.warn(result.message, {
        icon: <i className="bi bi-exclamation-triangle-fill text-warning"></i>,
      });
    }
  };

  return (
    <>
      <Card className="h-100 shadow-sm product-card">
        <Card.Img
          variant="top"
          src={product.image || "/placeholder-image.jpg"}
          alt={product.title}
          className="p-3 bg-light"
          style={{ height: "200px", objectFit: "contain" }}
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6 product-title" style={{ minHeight: "48px" }}>
            {product.title}
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted text-capitalize">
            {product.category}
          </Card.Subtitle>

          <div className="mt-auto">
            <Card.Text className="fw-bold fs-5 mb-3 product-price">
              ${Number(product.price).toFixed(2)}
            </Card.Text>

            <Button className="btn-view-desc w-100 mb-2" onClick={() => setShowModal(true)}>
              Ver descripción
            </Button>

            <Button
              className="btn-add-cart w-100"
              onClick={handleAddToCart}
              disabled={Number(product.cantidad) <= 0}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Añadir al carrito
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{product.descripcion || "No hay descripción disponible."}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;


