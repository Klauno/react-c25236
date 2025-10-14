import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout({ children, onLogout, isAuthenticated, carritoCount }) {
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
        backgroundColor: '#0078d7'
      }}>
        <Navbar carritoCount={carritoCount} />  {/* Solo Navbar aquí */}
        {isAuthenticated && (
          <button onClick={onLogout} style={{
            backgroundColor: '#c0392b',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}>
            Logout
          </button>
        )}
      </header>

      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
