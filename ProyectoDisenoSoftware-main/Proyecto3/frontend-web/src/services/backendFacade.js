import backendRESTAdapter from '../adapters/backendRESTAdapter';

const backendFacade = {
  loginUsuario: backendRESTAdapter.loginUsuario,
  obtenerAdministradores: backendRESTAdapter.obtenerAdministradores,
  crearAdministrador: backendRESTAdapter.crearAdministrador,
  editarAdministrador: backendRESTAdapter.editarAdministrador,
  eliminarAdministrador: backendRESTAdapter.eliminarAdministrador,

  obtenerArticulos: backendRESTAdapter.obtenerArticulos,
  crearArticulo: backendRESTAdapter.crearArticulo,
  editarArticulo: backendRESTAdapter.editarArticulo,
  eliminarArticulo: backendRESTAdapter.eliminarArticulo,

  obtenerSlides: backendRESTAdapter.obtenerSlides,
  crearSlide: backendRESTAdapter.crearSlide,
  eliminarSlide: backendRESTAdapter.eliminarSlide
};

export default backendFacade;
