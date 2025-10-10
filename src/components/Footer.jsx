import styles from './footer.module.css';

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <ul className={styles.footerNav}>
        <li>
          <a href="#" className={styles.footerLink}>Acerca de Nosotros</a>
        </li>
        <li>
          <a href="#" className={styles.footerLink}>Política de Privacidad</a>
        </li>
      </ul>
      <p className={styles.copyright}>
        © {anioActual} One Piece. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
