const express = require('express');
const router = express.Router();
const {listarSlides, crearSlide, editarSlide, borrarSlide} = require('../controllers/carruselController');
const upload = require('../middlewares/uploadImage');

router.get('/', listarSlides);             
router.post('/', upload.single('imagen'), crearSlide);             
router.put('/:id', editarSlide);          
router.delete('/:id', borrarSlide); 

module.exports = router;
