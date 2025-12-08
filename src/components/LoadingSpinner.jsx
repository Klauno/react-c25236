import { Container, Spinner } from "react-bootstrap";
import "./LoadingSpinner.css"; 

export const LoadingSpinner = ({ text = "Cargando..." }) => {
  return (
    <Container className="py-5 text-center">
      <Spinner 
        animation="border" 
        className="spinner-lila"
        style={{ width: '5rem', height: '5rem', borderWidth: '0.4rem' }}
      />
      <p className="mt-2">{text}</p>
    </Container>
  );
};
