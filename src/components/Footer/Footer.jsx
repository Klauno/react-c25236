import { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="custom-footer mt-auto py-3">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <i className="bi bi-cart3 fs-4 text-primary me-2"></i>
                <div>
                  <span className="fs-5 fw-bold">Carrito de Compras</span>
                  <p className="mt-2 small">Tu tienda online favorita</p>
                </div>
              </div>
            </Col>

            <Col md={4} className="text-center mb-3 mb-md-0">
              <div className="d-flex justify-content-center gap-3 mb-2">
                <a href="#" className="text-white" title="Instagram">
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a href="#" className="text-white" title="Contacto">
                  <i className="bi bi-envelope fs-5"></i>
                </a>
                <a href="#" className="text-white" title="Facebook">
                  <i className="bi bi-facebook fs-5"></i>
                </a>
              </div>
              <p className="small mb-0">Nuestras redes</p>
            </Col>

            <Col md={4} className="text-center text-md-end">
              <p className="small mb-0">© 2025 TiendaModa. Todos los derechos reservados</p>
            </Col>
          </Row>

          <Row className="justify-content-center mt-2">
            <Col className="text-center">
              <button
                className="footer-link mx-2"
                onClick={(e) => { e.preventDefault(); setShowTerms(true); }}
              >
                <i className="bi bi-file-text fs-6 me-1"></i>
                Términos y Condiciones
              </button>
              <button
                className="footer-link mx-3"
                onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}
              >
                <i className="bi bi-shield-lock fs-6 me-1"></i>
                Política de Privacidad
              </button>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Modal Términos y Condiciones */}
      <Modal show={showTerms} onHide={() => setShowTerms(false)} centered className="custom-modal">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Términos y Condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <p>
            Bienvenido a TiendaModa. Al utilizar nuestro sitio web, aceptas nuestros términos y condiciones. 
            Todos los productos se venden sujetos a disponibilidad y precios vigentes. 
            Nos reservamos el derecho de modificar cualquier información sin previo aviso.
          </p>
          <p>
            Los pedidos se procesan de acuerdo con nuestras políticas de envío y devoluciones. 
            Para más detalles, consulta nuestra sección de ayuda o contáctanos directamente.
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button className="btnCerrar" onClick={() => setShowTerms(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Política de Privacidad */}
      <Modal show={showPrivacy} onHide={() => setShowPrivacy(false)} centered className="custom-modal">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Política de Privacidad</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <p>
            En TiendaModa respetamos tu privacidad. Los datos personales que nos proporciones 
            serán utilizados únicamente para procesar tus pedidos y mejorar tu experiencia de compra. 
          </p>
          <p>
            No compartimos tu información con terceros sin tu consentimiento, y aplicamos medidas 
            de seguridad para proteger tus datos en todo momento.
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button className="btnCerrar" onClick={() => setShowPrivacy(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
