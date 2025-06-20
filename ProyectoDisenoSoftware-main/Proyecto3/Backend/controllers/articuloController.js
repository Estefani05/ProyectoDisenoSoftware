const { insertarArticulo, listarArticulos, actualizarArticulo, borrarArticulo  } = require('../models/articuloModel');

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

async function editarArticulo(req, res) {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;
  const archivo = req.file;

  try {
    const nuevaRuta = archivo ? `/uploads/${archivo.filename}` : null;
    await actualizarArticulo(id, titulo, descripcion, nuevaRuta);
    res.json({ mensaje: 'Artículo actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al editar' });
  }
}

async function eliminarArticulo(req, res) {
  const { id } = req.params;
  try {
    await borrarArticulo(id);
    res.json({ mensaje: 'Artículo eliminado' });
  } catch (err) {
    console.error('Error al eliminar artículo:', err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
}

module.exports = { subirArticulo, listarArti, editarArticulo, eliminarArticulo };
