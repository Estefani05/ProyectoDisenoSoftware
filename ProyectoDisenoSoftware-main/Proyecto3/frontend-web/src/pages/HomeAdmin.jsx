import { useNavigate, useParams } from 'react-router-dom';
import './HomeAdmin.css';

function Home() {
  const navigate = useNavigate();
  const {rol_id} = useParams();
  return (
    <div className="admin-menu-container">
      <h1>Panel de Administración</h1>
      <div className="menu-buttons">
        <button onClick={() => navigate(`/admin/carrusel`)}>
          Gestionar Carrusel
        </button>
        <button onClick={() => navigate(`/admin/articulos`)}>
          Gestionar Artículos
        </button>
        {rol_id ==='1'? <button className onClick={()=> navigate(`/admin/administradores`)}>
            Gestionar Administradores
        </button>: <></>}
        <button className="btn-volver" onClick={() => navigate('/')}>
           Volver 
        </button>
      </div>
    </div>
  );
}

export default Home;
