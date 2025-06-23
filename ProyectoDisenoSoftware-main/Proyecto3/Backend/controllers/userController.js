const { registrarUsuario,obtenerUsuario,listarUsuarios, editarUsuario, eliminarUsuario } = require('../models/userModel');

async function registrar(req, res) {
  //Validación básica 
  const { nombre_usuario, correo, contraseña_hash } = req.body;
  console.log('Datos recibidos:', req.body);
  if (!nombre_usuario || !correo || !contraseña_hash) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }


  try {
    await registrarUsuario(nombre_usuario, correo, contraseña_hash); 
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro' });
  }
 res.status(200).json({ mensaje: 'prueba' });
}


async function login(req, res) {
    const { correo, contrasena } = req.body;
    try {
      const resultado = await obtenerUsuario(correo, contrasena);
      if (resultado.success) {
        res.json({ success: true, usuario: resultado.usuario });
      } else {
        res.status(401).json({ success: false, mensaje: 'Credenciales inválidas' });
      }
    } catch (err) {
      console.error('Error en login:', err);
      res.status(500).send('Error del servidor');
    }
  }

async function listar(req, res) {
    try {
      const usuarios = await listarUsuarios();
      res.json(usuarios);
    } catch (err) {
      console.error('Error al listar usuarios:', err);
      res.status(500).send('Error del servidor');
    }
}

async function editar (req, res) {
    const {correoAnterior} = req.params;
    const { nombre_usuario, correo, contraseña_hash } = req.body;

    try {
      const usuarios = await editarUsuario(nombre_usuario, correo, contraseña_hash, correoAnterior);
      res.json(usuarios);
    } catch (err) {
      console.error('Error al editar usuarios:', err);
      res.status(500).send('Error del servidor');
    }
}

async function eliminar (req, res) {
    const {correo} = req.params;

    try {
      const usuarios = await eliminarUsuario(correo);
      res.json(usuarios);
    } catch (err) {
      console.error('Error al eliminar usuarios:', err);
      res.status(500).send('Error del servidor');
    }
}

module.exports = { registrar , login, listar, registrarUsuario, obtenerUsuario, listarUsuarios, editar, eliminar};