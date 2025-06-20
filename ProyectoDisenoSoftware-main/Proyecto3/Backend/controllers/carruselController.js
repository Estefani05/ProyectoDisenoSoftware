const carruselModel = require('../models/carruselModel');

async function listarSlides(req, res) {
  try {
    const slides = await carruselModel.obtenerSlides();
    res.json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los slides' });
  }
}

async function crearSlide(req, res) {
  try {
    const { titulo, descripcion } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;


    await carruselModel.insertarSlide(titulo, descripcion, imagen); // Convertir string a boolean

    res.status(201).json({ mensaje: 'Slide creado exitosamente' });
  } catch (err) {
    console.error('Error al crear slide:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
}

async function editarSlide(req, res) {
  try {
    const id = req.params.id;
    const datos = req.body;
    await carruselModel.actualizarSlide(id, datos);
    res.json({ mensaje: 'Slide actualizado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar slide' });
  }
}

async function borrarSlide(req, res) {
  try {
    const id = req.params.id;
    await carruselModel.eliminarSlide(id);
    res.json({ mensaje: 'Slide eliminado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar slide' });
  }
}

module.exports = {
  listarSlides,
  crearSlide,
  editarSlide,
  borrarSlide,
};
