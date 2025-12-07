import React, { useState } from "react";
import { Button, Card, ListGroup, Image, Row, Col, Modal } from "react-bootstrap";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useCart } from "../../hooks/useCart";
import ClienteModal from "../../components/ClienteModal";
import "./Cart.css";

const Cart = () => {
  const { cart, isLoadingCart, removeFromCart, updateQuantity, calculateTotal, clearCart, getStockRemaining } = useCart();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showClienteModal, setShowClienteModal] = useState(false);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) removeFromCart(itemToDelete.id);
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      handleDeleteClick(item);
    }
  };

  const handleIncrease = (item) => {
    const stockRestante = getStockRemaining(item.id);
    if (stockRestante <= 0) {
      alert(`No hay más stock disponible para "${item.title}"\nStock: ${item.cantidad} unidades`);
      return;
    }
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleOpenClienteModal = () => setShowClienteModal(true);

  const handleClienteGuardado = (clienteData) => {
    const orden = {
      cliente: clienteData,
      productos: cart,
      fecha: new Date().toLocaleString(),
    };
    localStorage.setItem("ultimaOrden", JSON.stringify(orden));
    clearCart();
    setShowClienteModal(false);
    navigate("/gracias");
  };

  if (isLoadingCart) return <LoadingSpinner text="Cargando carrito..." />;

  if (cart.length === 0) {
    return (
      <Card className="mt-4 text-center p-4 empty-cart-card">
        <FaShoppingCart size={48} className="mb-3 text-muted" />
        <h5>Tu carrito está vacío</h5>
        <p>Agrega productos para comenzar</p>
      </Card>
    );
  }

  return (
    <>
      <Card className="mt-4 cart-card">
        <Card.Header className="bg-light">
          <h5 className="mb-0">Carrito de Compras</h5>
        </Card.Header>

        <Card.Body>
          <ListGroup variant="flush">
            {cart.map((item) => {
              const stockRestante = getStockRemaining(item.id);
              const sinStock = stockRestante <= 0;

              return (
                <ListGroup.Item key={item.id} className="cart-item-card py-3">
                  <Row className="align-items-center">

                    {/* Imagen */}
                    <Col xs={3} md={2}>
                      <Image src={item.image} fluid thumbnail className="cart-item-image" />
                    </Col>

                    {/* Título */}
                    <Col xs={4} md={4}>
                      <h6 className="cart-item-title">{item.title}</h6>
                      <small className="text-muted">{item.category}</small>
                    </Col>

                    {/* Precio fijo */}
                    <Col xs={2} className="cart-price">
                      ${Number(item.price).toFixed(2)}
                    </Col>

                    {/* Cantidad */}
                    <Col xs={3} md={2}>
                      <div className="cart-quantity-wrapper">
                        <Button 
                          size="sm"
                          onClick={() => handleDecrease(item)}
                          className="cart-quantity-btn"
                        >
                          -
                        </Button>

                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="cart-quantity-input"
                        />

                        <Button
                          size="sm"
                          className={`cart-quantity-btn ${sinStock ? 'opacity-50' : ''}`}
                          onClick={() => handleIncrease(item)}
                          disabled={sinStock}
                        >
                          +
                        </Button>
                      </div>

                      {/* Stock */}
                      <small className={`cart-item-stock ${sinStock ? 'text-danger fw-bold' : 'text-info'}`}>
                        📦 {stockRestante}/{item.cantidad} disponibles
                        {sinStock && ' (agotado)'}
                      </small>
                    </Col>

                    {/* Eliminar */}
                    <Col xs={1} className="text-end">
                      <Button onClick={() => handleDeleteClick(item)} className="cart-remove-btn">
                        <FaTrash />
                      </Button>
                    </Col>

                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>

          {/* Panel total */}
          <div className="mt-4 cart-total-panel">
            <Row className="justify-content-end">
              <Col xs={12} md={4}>
                <div className="d-flex justify-content-between mb-3">
                  <h5>Total:</h5>
                  <h4 className="text-primary">${calculateTotal().toFixed(2)}</h4>
                </div>

                <Button className="cart-finalize-btn w-100" onClick={handleOpenClienteModal}>
                  Finalizar Compra
                </Button>
              </Col>
            </Row>
          </div>

        </Card.Body>
      </Card>

      {/* Modal eliminar */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Deseas eliminar "<strong>{itemToDelete?.title}</strong>" del carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal cliente */}
      <ClienteModal
        show={showClienteModal}
        onClose={() => setShowClienteModal(false)}
        onSuccess={handleClienteGuardado}
      />
    </>
  );
};

export default Cart;
