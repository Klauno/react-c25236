import { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Container, Alert, Row, Col } from "react-bootstrap";
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
      if (currentProduct) await updateProduct(currentProduct.id, formData);
      else await createProduct(formData);
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
    <Container className={`${styles.adminContainer} py-4`}>
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          <div className={`${styles.headerSection} mb-4`}>
            <h2 className={styles.pageTitle}>Administrar Productos</h2>
            <Button className={styles.btnEditar} onClick={() => setShowModal(true)}>
              ➕ Agregar Producto
            </Button>
          </div>

          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

          <div className={styles.tableContainer}>
            <Table responsive className={`${styles.productsTable} mb-0`}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th className="d-none d-lg-table-cell">Descripción</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={styles.productRow}>
                    <td data-label="Nombre" className={styles.productTitle}>{product.title}</td>
                    <td data-label="Precio" className={styles.productPrice}>${parseFloat(product.price).toFixed(2)}</td>
                    <td data-label="Descripción" className="d-none d-lg-table-cell">{product.description}</td>
                    <td data-label="Imagen">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className={styles.productImage}
                        />
                      ) : (
                        <span className={styles.noImage}>Sin imagen</span>
                      )}
                    </td>
                    <td data-label="Acciones">
                      <div className={styles.actionsContainer}>
                        <Button
                          className={`${styles.btnEditar} ${styles.btnSm}`}
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          ✏️ Editar
                        </Button>
                        <Button
                          className={`${styles.btnEliminar} ${styles.btnSm}`}
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          🗑️ Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetForm();
        }}
        className={styles.modalCustom}
        centered
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            {currentProduct ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>Precio ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className={styles.formLabel}>URL de la Imagen</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={styles.formControl}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </Form.Group>
            <div className={styles.modalActions}>
              <Button className={`${styles.btnEditar} ${styles.btnLg}`} type="submit">
                💾 Guardar Producto
              </Button>
              <Button
                variant="secondary"
                className={styles.btnCancel}
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                ❌ Cancelar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
