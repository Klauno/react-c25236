import Navbar from '../components/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Navbar />
      </header>
      <main style={{ padding: '20px' }}>{children}</main>
      <footer style={{ marginTop: '20px', borderTop: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
        © 2025 Mi Tienda - Todos los derechos reservados
      </footer>
    </>
  );
}
