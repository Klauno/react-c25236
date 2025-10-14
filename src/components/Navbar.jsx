import { NavLink, Link } from 'react-router-dom';
import UserIcon from '../assets/UserIcon';
import BagIcon from '../assets/BagIcon';

export default function Navbar({ carritoCount }) {
  return (
    <nav style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      fontWeight: 'bold',
      backgroundColor: '#0078d7',
      padding: '10px 20px',
      boxSizing: 'border-box',
      alignItems: 'center',
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
        style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', position: 'relative' }}
      >
        <BagIcon />
        {carritoCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-10px',
            backgroundColor: 'rgb(228, 42, 42)',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
            fontWeight: 'bold',
            lineHeight: '1',
            pointerEvents: 'none',
          }}>
            {carritoCount}
          </span>
        )}
      </NavLink>
      <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px' }}>
        <UserIcon />
      </Link>
    </nav>
  );
}
