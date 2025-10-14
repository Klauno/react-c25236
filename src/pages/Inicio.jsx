import { useState } from 'react';
import './Inicio.css';

export default function Inicio() {
  const [imgSrc, setImgSrc] = useState('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80');

  return (
    <div className="inicio-container">
      <h1 className="inicio-title">Bienvenidos a Mi Tienda</h1>
      <p className="inicio-subtitle">
        Explora nuestra amplia variedad de productos y promociones exclusivas.
      </p>
      <div className="inicio-image-container">
        <img
          src={imgSrc}
          alt="Tienda online"
          className="inicio-image"
          loading="lazy" // Lazy loading nativo
          onError={() => setImgSrc('https://via.placeholder.com/800x400?text=Imagen+no+disponible')} // reemplazo si falla
          width="800"
          height="400"
        />
      </div>
      <button
        className="inicio-button"
        onClick={() => window.location.href = '/moda'}
      >
        Ver Productos
      </button>
    </div>
  );
}
