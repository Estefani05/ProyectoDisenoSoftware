import './ArticulosUsuario.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import api from '../services/api';

function ArticulosUsuario() {
  const [articulos, setArticulos] = useState([]);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [ordenAlfabetico, setOrdenAlfabetico] = useState(true);
  const [ordenFechaReciente, setOrdenFechaReciente] = useState(true);

  useEffect(() => {
    api.get('/articulos/listar')
      .then(res => setArticulos(res.data))
      .catch(err => console.error('Error al cargar artículos:', err));
  }, []);

  const abrirPDF = (url) => {
    window.open(`http://localhost:3001${url}`, '_blank');
  };


  const articulosFiltrados = articulos
    .filter(art => art.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()))
    .sort((a, b) => {

      const tituloA = a.titulo.toLowerCase();
      const tituloB = b.titulo.toLowerCase();

      const ordenTitulo = ordenAlfabetico
        ? tituloA.localeCompare(tituloB)
        : tituloB.localeCompare(tituloA);

      if (ordenTitulo !== 0) return ordenTitulo;

      // Si el título es igual, se ordena por fecha
      const fechaA = new Date(a.fecha_creacion);
      const fechaB = new Date(b.fecha_creacion);
      return ordenFechaReciente ? fechaB - fechaA : fechaA - fechaB;
    });

  return (
    <div className="pagina-articulos">
      <Navbar />
      <header className="articulos-header">
        <h2>Artículos Médicos</h2>

      </header>

      <header className="articulos-header">
        <h2>Artículos Médicos</h2>
        <p>Consulta protocolos, lineamientos, normativas y más.</p>
      </header>

      {/* Sección de filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filtroTitulo}
          onChange={e => setFiltroTitulo(e.target.value)}
        />
        <button onClick={() => setOrdenAlfabetico(!ordenAlfabetico)}>
          Orden {ordenAlfabetico ? 'A-Z' : 'Z-A'}
        </button>
        <button onClick={() => setOrdenFechaReciente(!ordenFechaReciente)}>
          {ordenFechaReciente ? 'Más recientes primero' : 'Más antiguos primero'}
        </button>
      </div>

      <section className="lista-articulos">
        {articulosFiltrados.length === 0 ? (
          <p className="sin-articulos">No hay artículos disponibles.</p>
        ) : (
          <table className="tabla-articulos">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {articulosFiltrados.map((art, i) => (
                <tr key={i}>
                  <td className="titulo">{art.titulo}</td>
                  <td className="descripcion">{art.descripcion}</td>
                  <td className="fecha">{new Date(art.fecha_creacion).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-ver" onClick={() => abrirPDF(art.archivo_url)}>
                      📄 Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <footer className="inicio-footer2">
        <p>© 2025 RIPPSHA - Caja Costarricense de Seguro Social</p>
      </footer>
    </div>
  );
}

export default ArticulosUsuario;
