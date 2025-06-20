const { poolPromise } = require('../db/conection');
const { withLoginLogging } = require('../decorators/loginLogger'); 
const { insertarLog } = require('./logModel'); 

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

async function obtenerUsuarioBase(correo, contrasena) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('correo', correo)
    .input('contrasena', contrasena)
    .execute('sp_Login');

  console.log('Resultado de obtenerUsuarioBase:', result);
  const usuario = result.recordset[0];

  if (!usuario) {
    return { success: false };
  }

  return {
    success: true,
    usuario: {
      id: usuario.Id,
      nombre: usuario.nombre_usuario,
    }
  };
}

const obtenerUsuario = withLoginLogging(obtenerUsuarioBase, async (usuario) => {
  await insertarLog('Acceso al sistema (Login)', usuario.id);
});

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
