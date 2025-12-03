import { useState, useEffect, useRef } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { authorized } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Estado para controlar si ya se mostró el toast de stock agotado
  const [toastShown, setToastShown] = useState(false);

  // ID para evitar duplicados en toast
  const toastId = useRef(`stock-${product.id}`);

  const calcularStockRestante = () => {
    const itemEnCarrito = cart.find(item => item.id === product.id);
    return itemEnCarrito ? product.cantidad - itemEnCarrito.quantity : product.cantidad;
  };

  const stockRestante = calcularStockRestante();

  // Mostrar toast cuando el stock llegue a 0 y no se haya mostrado antes
  useEffect(() => {
    if (stockRestante <= 0 && !toastShown) {
      toast.error(`❌ No hay más stock para "${product.title}"`, {
        icon: <i className="bi bi-x-circle-fill text-danger"></i>,
        position: "top-right",
        toastId: toastId.current,
      });
      setToastShown(true);
    }
    if (stockRestante > 0 && toastShown) {
      setToastShown(false); // Reset para que pueda volver a mostrarse si vuelve stock
    }
  }, [stockRestante, toastShown, product.title]);

  const handleAddToCart = async () => {
    if (!authorized) {
      toast.warn("Debes iniciar sesión para comprar", {
        icon: <i className="bi bi-exclamation-triangle-fill text-warning"></i>,
      });
      return;
    }

    if (stockRestante <= 0) {
      // No repetir el toast aquí porque ya lo maneja el useEffect
      return;
    }

    const result = await addToCart({
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
        position: "top-right",
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
          <small className={`mb-2 d-block ${stockRestante <= 0 ? 'text-danger fw-bold' : 'text-success'}`}>
            📦 {stockRestante}/{product.cantidad} disponibles
          </small>
          <div className="mt-auto">
            <Card.Text className="fw-bold fs-5 mb-3 product-price">
              ${Number(product.price).toFixed(2)}
            </Card.Text>
            <Button className="btn-view-desc w-100 mb-2" onClick={() => setShowModal(true)}>
              Ver descripción
            </Button>
            <Button
              className={`btn-add-cart w-100 ${stockRestante <= 0 ? 'opacity-50' : ''}`}
              onClick={handleAddToCart}
              disabled={stockRestante <= 0}
              title={stockRestante <= 0 ? "Sin stock disponible" : "Añadir al carrito"}
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
