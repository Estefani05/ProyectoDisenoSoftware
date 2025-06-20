
export const articuloPrototype = {
  titulo: '',
  descripcion: '',
  archivo: null
};

export const slidePrototype = {
  titulo: '',
  descripcion: '',
  imagen: null
};

export function clonarFormulario(prototype) {
  return JSON.parse(JSON.stringify(prototype)); // clona sin referencias
}
