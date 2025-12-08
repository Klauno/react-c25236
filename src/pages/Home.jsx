// Home.jsx
import { Container, Row, Col, Alert, Form, ButtonGroup, Button } from 'react-bootstrap';
import ProductCard from '../components/Card/ProductCard';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { API_URL_PRODUCTS } from '../config/constants';
import './Home.css'; // <- Nuevo archivo CSS para los botones

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Todos', 'Indumentaria', 'Calzado', 'Accesorios'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL_PRODUCTS);
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (selectedCategory !== 'Todos') filtered = filtered.filter(p => p.category === selectedCategory);
    if (searchTerm.trim() !== '') filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  if (loading) return <LoadingSpinner text="Cargando productos..." />;
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2">
        <h2 className="mb-3 mb-md-0">Productos Disponibles</h2>
        
        <div className="d-flex flex-wrap gap-2 align-items-center">
          {/* Botones de categoría con clases personalizadas */}
          <ButtonGroup className="category-buttons">
            {categories.map(cat => (
              <Button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </ButtonGroup>

          <Form.Control
            type="text"
            placeholder="Buscar producto..."
            style={{ minWidth: '200px', maxWidth: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Alert variant="info" className="text-center">
              {searchTerm || selectedCategory !== 'Todos'
                ? 'No se encontraron productos para esos filtros'
                : 'No hay productos disponibles'}
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
