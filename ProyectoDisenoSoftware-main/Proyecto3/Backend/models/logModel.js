
const { poolPromise } = require('../db/conection');

async function insertarLog(accion, usuarioId ) {
   try {
    const pool = await poolPromise;
    await pool.request()
      .input('accion', accion)
      .input('usuarioId', usuarioId)
      .execute('sp_InsertarAuditLog');
      console.log(' Log insertado en BD');
  } catch (error) {
    console.error(' Error al insertar log en BD:', error);
  }
}

module.exports = { insertarLog };
