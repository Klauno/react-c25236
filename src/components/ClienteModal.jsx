import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth"; // Asumo que tienes useAuth para obtener email del usuario

const ClienteModal = ({ show, onClose, onSuccess }) => {
  const { user } = useAuth(); // user.email será el email del usuario logueado

  const [form, setForm] = useState({
    nombreCompleto: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const [touched, setTouched] = useState({
    nombreCompleto: false,
    email: false,
  });

  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Validación: habilita botón solo si nombre y email no están vacíos y email coincide
  useEffect(() => {
    const nombreValido = form.nombreCompleto.trim() !== "";
    const emailValido = form.email.trim() !== "";
    const emailCoincide = form.email === user.email;

    if (!emailCoincide && form.email.trim() !== "") {
      setEmailError("El email ingresado no coincide con tu email registrado");
    } else {
      setEmailError("");
    }

    setIsValid(nombreValido && emailValido && emailCoincide);
  }, [form, user.email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === "nombreCompleto" || name === "email") {
      setTouched({ ...touched, [name]: true });
    }
  };

  const handleSave = () => {
    if (isValid) {
      onSuccess(form); // enviar datos al Cart.jsx
    }
  };

  const inputClass = (field) =>
    touched[field] && form[field].trim() === "" ? "is-invalid" : "";

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
              name="nombreCompleto"
              type="text"
              value={form.nombreCompleto}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={inputClass("nombreCompleto")}
            />
            <Form.Control.Feedback type="invalid">
              El nombre completo es obligatorio
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
            {emailError && <Alert variant="danger" className="mt-2">{emailError}</Alert>}
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
