const { registrarUsuario,obtenerUsuario,listarUsuarios } = require('../models/userModel');

async function registrar(req, res) {
  //Validación básica 
  const { nombre, correo, contraseña, rol } = req.body;
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }


  try {
    await registrarUsuario(nombre, correo, hash, rol); 
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro' });
  }
}


async function login(req, res) {
    const { correo, contrasena } = req.body;
    try {
      const usuarios = await obtenerUsuario(correo, contrasena);
      if (usuarios.length > 0) {
        res.json({ success: true, usuario: usuarios[0] });
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

module.exports = { registrar , login, listar};