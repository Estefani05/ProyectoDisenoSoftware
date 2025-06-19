const sql = require('mssql');
const { poolPromise } = require('../db/conection');

async function insertarArticulo(titulo, descripcion, ruta, creado_por) {
  const pool = await poolPromise;
  await pool.request()
    .input('titulo',  titulo)
    .input('descripcion',  descripcion)
    .input('archivo_url',  ruta)
    .input('creado_por', parseInt(creado_por,10))
    .execute('sp_CrearArticulo');
}


async function listarArticulos() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT id, titulo, descripcion, archivo_url, fecha_creacion, fecha_modificacion, creado_por FROM Articulos');
  return result.recordset;
}

module.exports = { insertarArticulo, listarArticulos  };
