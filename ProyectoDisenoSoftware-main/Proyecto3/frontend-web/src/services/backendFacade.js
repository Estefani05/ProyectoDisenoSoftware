import api from './api';

const backendFacade = {

  /*-------------- Usuarios ------------------*/ 
  loginUsuario: (data) => api.post('/usuarios/login', data),

  /*-------------- Articulos ------------------*/ 
  obtenerArticulos: () => api.get('/articulos/listar'),
  crearArticulo: (data) => api.post('/articulos/subir', data),
  editarArticulo: (id, data) => api.put(`/articulos/editar/${id}`,data),
  eliminarArticulo: (id) => api.delete(`/articulos/eliminar/${id}`),

  /*-------------- Carrusel ------------------*/ 
  obtenerSlides: () => api.get('/carrusel'),
  crearSlide: (data) => api.post('/carrusel', data),
  eliminarSlide: (id) => api.delete(`/carrusel/${id}`),
};

export default backendFacade;
