import './Carrusel.css';
import { useState, useEffect } from 'react';
import { getSlides } from '../services/api'; // ← Importa la función que consulta el backend

function Carrusel() {
  const [slides, setSlides] = useState([]);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    // Cargar los slides al montar
    getSlides().then(data => {
      if (Array.isArray(data)) setSlides(data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice(prev => (slides.length > 0 ? (prev + 1) % slides.length : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null; // Evita errores si no hay slides

  
 console.log(`Ruta de la imagen actual: http://localhost:3001${slides[indice].ruta_imagen}`);
  return (
    <div className="carrusel">
      <img src={`http://localhost:3001${slides[indice].ruta_imagen}`} alt="Imagen carrusel" />
      <div className="carrusel-texto">{slides[indice].titulo}</div>

      <div className="carrusel-dots">
        {slides.map((_, i) => (
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
