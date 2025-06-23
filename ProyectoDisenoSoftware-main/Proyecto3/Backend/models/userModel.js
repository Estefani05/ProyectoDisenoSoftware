const { poolPromise } = require('../db/conection');
const { withLoginLogging } = require('../decorators/loginLogger'); 
const { insertarLog } = require('./logModel'); 

async function registrarUsuario(nombre, correo, passwordHash) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre_usuario', nombre)
      .input('correo', correo)
      .input('contraseña_hash', passwordHash)
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
      rol_id: usuario.rol_id,
      nombre: usuario.nombre_usuario
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

async function editarUsuario(nombre_usuario, correo, contraseña_hash, correoAnterior) {
  const pool = await poolPromise;
 const request = pool.request()
    .input('nombre_usuario', nombre_usuario)
    .input('correo', correo)
    .input('contraseña_hash', contraseña_hash)
    .input('correoAnterior', correoAnterior);
  const result = await request.execute('sp_EditarUsuario');
  return result.recordset;

}

async function eliminarUsuario(correo) {
  const pool = await poolPromise;
 const request = pool.request()
    .input('correo', correo)
  const result = await request.execute('sp_eliminarUsuario');
  return result.recordset;
}

module.exports = {
  registrarUsuario,
  obtenerUsuario, 
  listarUsuarios,
  editarUsuario,
  eliminarUsuario
};
