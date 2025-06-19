import './Home.css';
import logo from '../assets/ss.png';
import api from '../services/api';
import { useState, useEffect } from 'react';

function Home() {
  const handleNuevoArticulo = () => {
    alert("Función para crear un nuevo artículo");
  };

  const [articulos, setArticulos] = useState([]);

  useEffect(() => { 
    api.get('/articulos') // asumiendo que el endpoint sea /api/articulos
      .then((res) => setArticulos(res.data))
      .catch((err) => console.error('Error al cargar artículos:', err));
  }, []);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo CCSS" className="logo" />
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <button>🔍</button>
        </div>

        <button className="new-article" onClick={handleNuevoArticulo}>
          + Nuevo Artículo
        </button>

        <div className="icons">
          <span>🔔</span>
          <span>👤</span>
          <span>≡</span>
        </div>
      </header>

      <main className="table-section">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre ⬍</th>
                <th>Categoría ⬍</th>
                <th>Fecha ⬍</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i}>
                  <td><span className="plus">+</span> Artículo</td>
                  <td>Categoría</td>
                  <td>⚠️ Fecha</td>
                  <td className="actions">
                    <button title="Ver">👁️</button>
                    <button title="Editar">✏️</button>
                    <button title="Eliminar">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Home;
