// models/articuloModel.js
const sql = require('mssql');
const { poolPromise } = require('../db/conection');
const { insertarLog } = require('./logModel'); 


async function insertarArticulo(titulo, descripcion, ruta, creado_por) {
  const pool = await poolPromise;
  await pool.request()
    .input('titulo', titulo)
    .input('descripcion', descripcion)
    .input('archivo_url', ruta)
    .input('creado_por', parseInt(creado_por, 10))
    .execute('sp_CrearArticulo');
}

async function listarArticulos() {
  const pool = await poolPromise;
  const result = await pool.request()
    .execute('sp_ObtenerArticulos');
  return result.recordset;
}

async function actualizarArticulo(id, titulo, descripcion, rutaArchivo) {
  const pool = await poolPromise;
  const request = pool.request()
    .input('id', id)
    .input('titulo', titulo)
    .input('descripcion', descripcion);
  
  if (rutaArchivo) request.input('archivo_url', rutaArchivo);
  else request.input('archivo_url', null);

  await request.execute('sp_ActualizarArticulo');
}

async function borrarArticulo(id) {
  const pool = await poolPromise;
  await pool.request()
    .input('id', id)
    .execute('sp_EliminarArticulo');
}

// Aplicamos el patrón Decorator con registro en la BD

// Exportamos
module.exports = {
  listarArticulos,
  insertarArticulo,
  actualizarArticulo,
  borrarArticulo
};
