// services/usuarioService.js
const { poolPromise } = require('../db/conection');

async function registrarUsuario(nombre, correo, passwordHash, rol) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre_usuario', nombre)
      .input('correo', correo)
      .input('contraseña_hash', passwordHash)
      .input('rol_nombre', rol)
      .execute('sp_RegistrarUsuario');

    return result;
  } catch (err) {
    console.error(' Error al registrar usuario:', err);
    throw err;
  }
}

async function obtenerUsuario(correo, contrasena) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('correo', correo)
   // .input('contrasena', sql.NVarChar, contrasena)
    .execute('sp_LoginUsuario');
  return result.recordset;
}

async function listarUsuarios() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Usuarios');
  return result.recordset;
}

module.exports = {
  registrarUsuario,
  obtenerUsuario,
  listarUsuarios
};
