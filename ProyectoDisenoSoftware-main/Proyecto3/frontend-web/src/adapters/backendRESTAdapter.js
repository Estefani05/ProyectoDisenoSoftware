
import api from '../services/api';

const backendRESTAdapter = {
  // --- Usuarios ---
  loginUsuario: (data) => api.post('/usuarios/login', data),
  obtenerAdministradores: () => api.get('/usuarios/listar'),
  crearAdministrador: (data) => api.post('/usuarios/crear', data),
  editarAdministrador: (correo, data) => api.put(`/usuarios/editar/${correo}`, data),
  eliminarAdministrador: (correo) => api.delete(`/usuarios/eliminar/${correo}`),

  // --- Artículos ---
  obtenerArticulos: () => api.get('/articulos/listar'),
  crearArticulo: (data) => api.post('/articulos/subir', data),
  editarArticulo: (id, data) => api.put(`/articulos/editar/${id}`, data),
  eliminarArticulo: (id) => api.delete(`/articulos/eliminar/${id}`),

  // --- Carrusel ---
  obtenerSlides: () => api.get('/carrusel'),
  crearSlide: (data) => api.post('/carrusel', data),
  eliminarSlide: (id) => api.delete(`/carrusel/${id}`)
};

export default backendRESTAdapter;
