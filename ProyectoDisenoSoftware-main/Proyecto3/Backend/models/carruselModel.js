const { poolPromise } = require('../db/conection');

async function obtenerSlides() {
  const pool = await poolPromise;
  const result = await pool.request().execute('sp_SlidesCarrusel');
  return result.recordset;
}



async function insertarSlide(titulo, descripcion, rutaImagen) {
  const pool = await poolPromise;
  await pool.request()
    .input('titulo', titulo)
    .input('descripcion', descripcion)
    .input('ruta_imagen', rutaImagen)
    .execute('sp_InsertarSlide'); 
}

// Actualizar slide
async function actualizarSlide(id, datos) {
  const pool = await poolPromise;
  await pool.request()
    .input('id', id)
    .input('titulo', datos.titulo)
    .input('descripcion', datos.descripcion)
    .input('ruta_imagen', datos.ruta_imagen)
    .execute('sp_Slides_Actualizar');
}

// Eliminar slide
async function eliminarSlide(id) {
  const pool = await poolPromise;
  await pool.request()
    .input('id', id)
    .execute('sp_Slides_Eliminar');
}

module.exports = {
  insertarSlide,
  obtenerSlides,
  actualizarSlide,
  eliminarSlide,
};
