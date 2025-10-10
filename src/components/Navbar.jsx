import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '20px', fontWeight: 'bold' }}>
      <Link to="/">Inicio</Link>
      <Link to="/moda">Moda</Link>
      <Link to="/carrito">Carrito</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
