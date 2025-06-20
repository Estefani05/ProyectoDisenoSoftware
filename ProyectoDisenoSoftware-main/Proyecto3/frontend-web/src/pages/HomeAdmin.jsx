import { useNavigate } from 'react-router-dom';
import './HomeAdmin.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="admin-menu-container">
      <h1>Panel de Administración</h1>
      <div className="menu-buttons">
        <button onClick={() => navigate('/admin/carrusel')}>
          Gestionar Carrusel
        </button>
        <button onClick={() => navigate('/admin/articulos')}>
          Gestionar Artículos
        </button>
        <button className="btn-volver" onClick={() => navigate('/')}>
           Volver 
        </button>
      </div>
    </div>
  );
}

export default Home;

