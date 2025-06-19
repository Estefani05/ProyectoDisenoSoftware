const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { subirArticulo, listarArti} = require('../controllers/articuloController');

router.post('/subir', upload.single('archivo'), subirArticulo);
router.get('/listar', listarArti);

module.exports = router;
