// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const usuarioRoutes = require('./routes/userRoutes');
const articuloRoutes = require('./routes/articuloRoutes');
const carruselRoutes = require('./routes/carruselRoutes');

//Poner publicos los archivos de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Usar rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/articulos', articuloRoutes);
app.use('/api/carrusel', carruselRoutes);

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
