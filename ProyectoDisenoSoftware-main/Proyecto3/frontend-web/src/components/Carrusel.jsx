import './Carrusel.css';
import { useState, useEffect } from 'react';

const imagenes = [
  { src: '/imagenes/carrusel1.jpg', texto: 'Campaña de vacunación 2025' },
  { src: '/imagenes/carrusel2.jpg', texto: 'Nueva normativa médica' },
  { src: '/imagenes/carrusel3.jpg', texto: 'Nuevo brote de dengue' }
];

function Carrusel() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carrusel">
      <img src={imagenes[indice].src} alt="Imagen carrusel" />
      <div className="carrusel-texto">{imagenes[indice].texto}</div>

      <div className="carrusel-dots">
        {imagenes.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === indice ? 'active' : ''}`}
            onClick={() => setIndice(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carrusel;
