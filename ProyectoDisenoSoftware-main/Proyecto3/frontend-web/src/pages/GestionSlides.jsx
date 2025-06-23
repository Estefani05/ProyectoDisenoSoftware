import { useEffect, useState } from 'react';
import backendFacade from '../services/backendFacade';
import './GestionSlides.css';
import { slidePrototype, clonarFormulario } from '../prototypes/formPrototype'; // Asegúrate de que el path sea correcto
import { useNavigate } from 'react-router-dom';

function GestionSlides() {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState(clonarFormulario(slidePrototype));
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const rolId = localStorage.getItem('rol_id');

  useEffect(() => {
    cargarSlides();
  }, []);

  const cargarSlides = async () => {
    try {
      const res = await backendFacade.obtenerSlides();
      setSlides(res.data);
    } catch (err) {
      console.error('Error al cargar slides', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      const file = files && files[0];
      if (file) {
        console.log('Archivo seleccionado:', file);
        setForm({ ...form, imagen: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('titulo', form.titulo);
    data.append('descripcion', form.descripcion);
    data.append('imagen', form.imagen);

    try {
      await backendFacade.crearSlide(data);
      setForm(clonarFormulario(slidePrototype)); // Reinicia desde prototipo
      setPreview(null);
      cargarSlides();
    } catch (err) {
      console.error('Error al crear slide', err);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await backendFacade.eliminarSlide(id);
      cargarSlides();
    } catch (err) {
      console.error('Error al eliminar slide', err);
    }
  };

  return (
    <div className="gestion-slides">
      <h2>Gestión de Carrusel</h2>
      <form onSubmit={handleSubmit} className="form-slide">
        <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required></textarea>
        <input type="file" name="imagen" accept="image/*" onChange={handleChange} required />
        {preview && <img src={preview} alt="Vista previa" className="preview" />}
        <div className="botones-formulario">
        <div style={{ display: 'flex', gap: '1rem' ,justifyContent: 'flex-end'}}>
          <button type="submit">Subir Slide</button>
          <button type="button" onClick={() => navigate(`/home/${rolId}`)}>Volver</button>
        </div>
        </div>
      </form>

      <div className="lista-slides">
        {slides.length === 0 ? (
          <p>No hay slides disponibles.</p>
        ) : (
          slides.map((slide) => (
            <div key={slide.id} className="slide-card">
              <img src={`http://localhost:3001${slide.ruta_imagen}`} alt={slide.titulo} />
              <div className="info">
                <h3>{slide.titulo}</h3>
                <p>{slide.descripcion}</p>
                <button onClick={() => handleEliminar(slide.id)}>🗑 Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GestionSlides;
