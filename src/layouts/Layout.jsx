import Navbar from '../components/Navbar';

export default function Layout({ children, onLogout, isAuthenticated }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
   <header style={{ 
  padding: '10px 20px',
  borderBottom: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#0078d7'  // Opcional: para que tenga fondo azul que combine con nav
}}>
  <Navbar style={{ flexGrow: 1 }} />
  {isAuthenticated && (
    <button onClick={onLogout} style={{
      backgroundColor: '#c0392b',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '10px'
    }}>
      Logout
    </button>
  )}
</header>

       

      <main style={{ 
        flex: 1, 
        padding: '20px' 
      }}>
        {children}
      </main>

      <footer style={{ 
        borderTop: '1px solid #ccc',
        padding: '10px 20px', 
        textAlign: 'center'
      }}>
        © 2025 Mi Tienda - Todos los derechos reservados
      </footer>
    </div>
  );
}
