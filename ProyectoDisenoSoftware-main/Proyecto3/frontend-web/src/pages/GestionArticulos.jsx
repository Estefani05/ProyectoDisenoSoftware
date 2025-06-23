import { useEffect, useState } from 'react';
import backendFacade from '../services/backendFacade';
import './GestionArticulos.css';
import { useNavigate } from 'react-router-dom';

function GestionArticulos() {
  const [articulos, setArticulos] = useState([]);
  const [form, setForm] = useState({ id: null, titulo: '', descripcion: '', archivo: null });
  const [previewNombreArchivo, setPreviewNombreArchivo] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const navigate = useNavigate();
  const rolId = localStorage.getItem('rol_id');

  useEffect(() => {
    cargarArticulos();
  }, []);

  const cargarArticulos = async () => {
    try {
      const res = await backendFacade.obtenerArticulos();
      setArticulos(res.data);
    } catch (err) {
      console.error('Error al cargar artículos', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'archivo') {
      const file = files && files[0];
      setForm({ ...form, archivo: file });
      setPreviewNombreArchivo(file ? file.name : '');
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.descripcion || (!form.archivo && !modoEdicion)) {
      alert('Por favor complete todos los campos y seleccione un archivo.');
      return;
    }

    const data = new FormData();
    data.append('titulo', form.titulo);
    data.append('descripcion', form.descripcion);
    if (form.archivo) data.append('archivo', form.archivo);

    try {
      if (modoEdicion) {
        await backendFacade.editarArticulo(form.id, data);
        alert('Artículo actualizado');
      } else {
        await backendFacade.crearArticulo(data);
        alert('Artículo creado');
      }
      setForm({ id: null, titulo: '', descripcion: '', archivo: null });
      setPreviewNombreArchivo('');
      setModoEdicion(false);
      cargarArticulos();
    } catch (err) {
      console.error('Error en guardar artículo', err);
      alert('Error al guardar artículo');
    }
  };

  const handleEditar = (art) => {
    setForm({
      id: art.id,
      titulo: art.titulo,
      descripcion: art.descripcion,
      archivo: null
    });
    setPreviewNombreArchivo('');
    setModoEdicion(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este artículo?')) return;
    try {
      await backendFacade.eliminarArticulo(id);
      alert('Artículo eliminado');
      cargarArticulos();
    } catch (err) {
      console.error('Error al eliminar artículo', err);
      alert('Error al eliminar artículo');
    }
  };

  return (
    <div className="gestion-articulos">
      <h2>{modoEdicion ? 'Editar Artículo' : 'Crear Artículo'}</h2>
      <form onSubmit={handleSubmit} className="form-articulo">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          name="archivo"
          accept="application/pdf"
          onChange={handleChange}
          {...(modoEdicion ? {} : { required: true })}
        />
        {previewNombreArchivo && <p>Archivo seleccionado: {previewNombreArchivo}</p>}
        <div className="botones-formulario">
          <div style={{ display: 'flex', gap: '1rem' ,justifyContent: 'flex-end'}}>
            <button type="submit">{modoEdicion ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => navigate(`/home/${rolId}`)}>Volver</button>
          </div>
          {modoEdicion && (
            <button
              type="button"
              className="cancelar"
              onClick={() => {
                setForm({ id: null, titulo: '', descripcion: '', archivo: null });
                setPreviewNombreArchivo('');
                setModoEdicion(false);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Lista de Artículos</h3>
      {articulos.length === 0 ? (
        <p>No hay artículos disponibles.</p>
      ) : (
        <table className="tabla-articulos">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Archivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articulos.map((art) => (
              <tr key={art.id}>
                <td className="tituloArti">{art.titulo}</td>
                <td className="descripcionArti">{art.descripcion}</td>
                <td>{new Date(art.fecha_creacion).toLocaleDateString()}</td>
                <td>
                  <a href={`http://localhost:3001${art.archivo_url}`} target="_blank" rel="noreferrer">
                    Ver PDF
                  </a>
                </td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(art)}>✏️        Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(art.id)}>🗑 Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GestionArticulos;