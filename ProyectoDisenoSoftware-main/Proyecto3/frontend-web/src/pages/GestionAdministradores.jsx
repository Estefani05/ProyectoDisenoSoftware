import { useEffect, useState } from 'react';
import backendFacade from '../services/backendFacade';
import './GestionAdministradores.css';
import { useNavigate } from 'react-router-dom';

function GestionAdministradores() {
  const [Administradores, setAdministradores] = useState([]);
  const [form, setForm] = useState({ nombre_usuario: '', correo: '', contraseña_hash: '',});
  const [previewCorreo, setPreviewCorreo] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const navigate = useNavigate();
  const rolId = localStorage.getItem('rol_id');


  useEffect(() => {
    cargarAdministradores();
  }, []);

  const cargarAdministradores = async () => {
    try {
      const res = await backendFacade.obtenerAdministradores();
      setAdministradores(res.data);
    } catch (err) {
      console.error('Error al cargar Administradors', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
      setForm({ ...form, [name]: value });
      console.log('Form data:', { ...form, [name]: value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre_usuario || !form.correo || !form.contraseña_hash ) {
      alert('Por favor complete todos los campos.');
      return;
    }
    console.log('Datos del formulario:', form);
    const data = new FormData();

    data.append('nombre_usuario', form.nombre_usuario);
    data.append('correo', form.correo);
    data.append('contraseña_hash', form.contraseña_hash);
    console.log('Datos a enviar:', data);

    try {
      if (modoEdicion) {
        await backendFacade.editarAdministrador(previewCorreo, form);
        alert('Administrador actualizado');
      } else {
        await backendFacade.crearAdministrador(form);
        alert('Administrador creado');
      }
      setForm({ nombre_usuario: '', correo: '', contraseña_hash: '', });
      setPreviewCorreo('');
      setModoEdicion(false);
      cargarAdministradores();
    } catch (err) {
      console.error('Error en guardar Administrador', err);
      alert('Error al guardar Administrador');
    }
  };

  const handleEditar = (art) => {
    setPreviewCorreo(art.correo);
    setForm({
        nombre_usuario: art.nombre_usuario,
        correo: art.correo,
        contraseña_hash: art.contraseña_hash,  
    });
 
    setModoEdicion(true);
  };

  const handleEliminar = async (correo) => {
    if (!window.confirm('¿Seguro que quieres eliminar este Administrador?')) return;
    try {
      await backendFacade.eliminarAdministrador(correo);
      alert('Administrador eliminado');
      cargarAdministradores();
    } catch (err) {
      console.error('Error al eliminar Administrador', err);
      alert('Error al eliminar Administrador');
    }
  };

  return (
    <div className="gestion-Administradores">
      <h2>{modoEdicion ? 'Editar Administrador' : 'Crear Administrador'}</h2>
      <form onSubmit={handleSubmit} className="form-Administrador">
        <input
          type="text"
          name="nombre_usuario"
          placeholder="Nombre de Administrador"
          value={form.nombre_usuario}
          onChange={handleChange}
          required
        />
            <input
          type="email"
          name="correo"
          placeholder="Correo Electrónico"
          value={form.correo}
          onChange={handleChange}
          required
        />
            <input
          type="password"
          name="contraseña_hash"
          placeholder="Contraseña"
          value={form.contraseña_hash}
          onChange={handleChange}
          required
        />
      
    
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
                setForm({ nombre_usuario: '', correo: '', contraseña_hash: '',});
                setModoEdicion(false);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Lista de Administradores</h3>
      {Administradores.length === 0 ? (
        <p>No hay Administradors disponibles.</p>
      ) : (
        <table className="tabla-Administradores">
          <thead>
            <tr>
                <th>Nombre de Administrador</th>
                <th>Correo Electrónico</th>
                <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Administradores.map((art) => (
              <tr key={art.correo}>
                <td className="tituloArti">{art.nombre_usuario}</td>
                <td className="descripcionArti">{art.correo}</td>
                <td className= "descripcionArti">{art.contraseña_hash}</td>
             
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(art)}>✏️        Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(art.correo)}>🗑 Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GestionAdministradores;