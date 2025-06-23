// routes/usuarios.js
const express = require('express');
const router = express.Router();
const { registrar,login,listar, editar, eliminar } = require('../controllers/userController');

router.post('/registro', registrar);
router.post('/login', login);
router.get('/listar', listar);
router.post('/crear', registrar); 
router.put('/editar/:correoAnterior', editar);
router.delete('/eliminar/:correo' , eliminar);

module.exports = router;

