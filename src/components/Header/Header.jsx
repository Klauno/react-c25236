import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const { user, authorized, isLoading, logout } = useAuth();
  const { totalItems } = useCart();

  if (isLoading) return <div></div>;

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`${styles.customNavbar} navbar-dark`} // navbar-dark para texto claro
    >
      <Container fluid>
        {/* Cambié este Navbar.Brand a Button para mejor control de estilo */}
        <Button
          as={Link}
          to="/"
          className={styles.navbarBrandButton}
          variant="none"
        >
          MiTienda
        </Button>

        {/* Carrito visible en móvil */}
        <div className="d-flex align-items-center ms-auto mb-3">
          {authorized && (
            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative px-4 d-lg-none"
            >
              <i className="bi bi-cart3 fs-4"></i>
              {totalItems() > 0 && (
                <span className="position-absolute top-10 start-80 translate-middle badge rounded-pill bg-danger">
                  {totalItems()}
                </span>
              )}
            </Nav.Link>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="flex-column flex-lg-row align-items-end align-items-lg-center">
            {authorized ? (
              <>
                <Nav className="d-flex align-items-end">
                  <Nav.Link
                    as={Link}
                    to="/admin/products"
                    href="#link"
                    className={`fw-bold border border-light border-3 rounded px-2 me-2`}
                  >
                    Administrar
                  </Nav.Link>
                </Nav>

                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="position-relative px-3 d-none d-lg-block"
                >
                  <i className="bi bi-cart3 fs-4"></i>
                  {totalItems() > 0 && (
                    <span className="position-absolute top-10 start-80 translate-middle badge rounded-pill bg-danger">
                      {totalItems()}
                    </span>
                  )}
                </Nav.Link>

                <NavDropdown
                  title={<i className="bi bi-person-circle fs-4"></i>}
                  id="user-dropdown"
                  align="end"
                  className="text-end"
                >
                  <NavDropdown.Item>
                    <strong>Hola {user?.name || "Usuario"}</strong>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                    Mi cuenta
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/cart">
                    Carrito
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <div className="d-flex align-items-center text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Cerrar sesión
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Item className="w-100 px-2 mb-2 mb-lg-0 d-flex justify-content-end">
                  <Button
                    as={Link}
                    to="/login"
                    variant="none"
                    className="d-flex justify-content-center"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </Button>
                </Nav.Item>
                <Nav.Item className="w-100 px-2 mb-2 mb-lg-0 d-flex justify-content-end">
                  <Button
                    as={Link}
                    to="/register"
                    variant="none"
                    className="d-flex justify-content-center"
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    Registrarse
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
