import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ClienteModal = ({ show, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
  });

  const [isValid, setIsValid] = useState(false);

  // Validación: habilita botón solo si nombre y email no están vacíos
  useEffect(() => {
    if (form.nombre.trim() !== "" && form.email.trim() !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form.nombre, form.email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    if (e.target.name === "nombre" || e.target.name === "email") {
      setTouched({ ...touched, [e.target.name]: true });
    }
  };

  const handleSave = () => {
    if (isValid) {
      onSuccess(form); // enviar datos al Cart.jsx
    }
  };

  const inputClass = (field) =>
    touched[field] && form[field].trim() === ""
      ? "is-invalid"
      : "";

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Datos del Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Nombre completo <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={inputClass("nombre")}
            />
            <Form.Control.Feedback type="invalid">
              El nombre es obligatorio
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              name="telefono"
              type="text"
              value={form.telefono}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Email <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={inputClass("email")}
            />
            <Form.Control.Feedback type="invalid">
              El email es obligatorio
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              type="text"
              value={form.direccion}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!isValid}
          className="cart-finalize-btn"
        >
          Finalizar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClienteModal;

