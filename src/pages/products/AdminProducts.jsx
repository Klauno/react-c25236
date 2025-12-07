import { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Container, Alert, Row, Col, Card } from "react-bootstrap";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/AdminProductsService";
import { useAuth } from "../../hooks/useAuth";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import styles from "./AdminProducts.module.css";

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Error al cargar productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("Solo los administradores pueden modificar o agregar productos");
      setShowModal(false);
      return;
    }
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setShowModal(false);
      fetchProducts();
      resetForm();
    } catch (err) {
      setError("Error al guardar el producto");
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      toast.error("Solo los administradores pueden borrar productos");
      return;
    }
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        setError("Error al eliminar el producto");
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", price: "", description: "", image: "" });
    setCurrentProduct(null);
  };

  if (loading) return <LoadingSpinner text="Cargando información..." />;

  return (
    <Container className={styles.adminContainer}>
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          <div className={styles.headerSection}>
            <h2 className={styles.pageTitle}>Administrar Productos</h2>
            <Button className={styles.btnAgregar} onClick={() => setShowModal(true)}>
              ➕ Agregar Producto
            </Button>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          {/* ===== Tabla en desktop ===== */}
          <div className="d-none d-lg-block">
            <Table responsive className={styles.productsTable}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>${parseFloat(product.price).toFixed(2)}</td>
                    <td>{product.description}</td>
                    <td>
                      {product.image ? (
                        <img src={product.image} alt={product.title} className={styles.productImage} />
                      ) : (
                        <span className={styles.noImage}>Sin imagen</span>
                      )}
                    </td>
                    <td>
                      <Button size="sm" className={styles.btnEditar} onClick={() => handleEdit(product)}>
                        ✏️ Editar
                      </Button>
                      <Button size="sm" className={styles.btnEliminar} onClick={() => handleDelete(product.id)}>
                        🗑️ Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* ===== Cards en mobile ===== */}
          <div className="d-block d-lg-none">
            {products.map((product) => (
              <Card key={product.id} className={styles.mobileCard}>
                <Card.Body>
                  <Row>
                    <Col xs={4}>
                      {product.image ? (
                        <img src={product.image} alt={product.title} className={styles.productImageMobile} />
                      ) : (
                        <span className={styles.noImage}>Sin imagen</span>
                      )}
                    </Col>
                    <Col xs={8}>
                      <h5>{product.title}</h5>
                      <p className={styles.productDesc}>{product.description}</p>
                      <p className={styles.productPriceMobile}>${parseFloat(product.price).toFixed(2)}</p>
                      <div className={styles.actionsMobile}>
                        <Button size="sm" className={styles.btnEditar} onClick={() => handleEdit(product)}>
                          ✏️ Editar
                        </Button>
                        <Button size="sm" className={styles.btnEliminar} onClick={() => handleDelete(product.id)}>
                          🗑️ Eliminar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      {/* ===== Modal ===== */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetForm();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct ? "✏️ Editar Producto" : "➕ Nuevo Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </Form.Group>
            <div className="d-flex gap-2 mt-3">
              <Button type="submit" className={styles.btnEditar}>💾 Guardar</Button>
              <Button variant="secondary" onClick={() => {setShowModal(false); resetForm();}}>❌ Cancelar</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
