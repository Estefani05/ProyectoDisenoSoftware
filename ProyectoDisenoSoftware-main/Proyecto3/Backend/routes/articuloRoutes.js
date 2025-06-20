const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { subirArticulo, listarArti, editarArticulo, eliminarArticulo} = require('../controllers/articuloController');

router.post('/subir', upload.single('archivo'), subirArticulo);
router.get('/listar', listarArti);
router.put('/editar/:id', upload.single('archivo'), editarArticulo);
router.delete('/eliminar/:id', eliminarArticulo);

module.exports = router;
