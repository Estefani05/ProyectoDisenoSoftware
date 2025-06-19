const { insertarArticulo, listarArticulos  } = require('../models/articuloModel');

async function subirArticulo(req, res) {
  const { titulo, descripcion, subidoPor } = req.body;
  const archivo = req.file;

  if (!archivo) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  try {
    const rutaArchivo = `/uploads/${archivo.filename}`;
    await insertarArticulo(titulo, descripcion, rutaArchivo, subidoPor);

    res.status(201).json({ mensaje: 'Artículo subido con éxito' });
  } catch (err) {
    console.error('Error al subir artículo:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
}

//Lista los articulos en la BD
async function listarArti(req, res) {
  try {
    const articulos = await listarArticulos();
    res.json(articulos); 
  } catch (err) {
    console.error('Error al listar artículos:', err);
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
}

module.exports = { subirArticulo, listarArti };
