import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',  // centra los enlaces
      gap: '40px',               // separa bien los enlaces
      fontWeight: 'bold',
      backgroundColor: '#0078d7',
      padding: '10px 20px',
      boxSizing: 'border-box',
    }}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => isActive ? 'active' : ''}
        style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}
      >
        Inicio
      </NavLink>
      <NavLink
        to="/moda"
        className={({ isActive }) => isActive ? 'active' : ''}
        style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}
      >
        Moda
      </NavLink>
      <NavLink
        to="/carrito"
        className={({ isActive }) => isActive ? 'active' : ''}
        style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}
      >
        Carrito
      </NavLink>
    </nav>
  );
}
