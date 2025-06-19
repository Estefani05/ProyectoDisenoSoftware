// routes/usuarios.js
const express = require('express');
const router = express.Router();
const { registrar,login,listar } = require('../controllers/userController');

router.post('/registro', registrar);
router.post('/login', login);
router.get('/listar', listar);

module.exports = router;
