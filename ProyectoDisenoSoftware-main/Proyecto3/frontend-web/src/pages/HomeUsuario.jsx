import './HomeUsuario.css';
import Navbar from '../components/Navbar';
import Carrusel from '../components/Carrusel';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function InicioUsuario() {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <Navbar />
      <Carrusel />

      <main className="inicio-main">
        <div className="bienvenida-container">
          <h2>Bienvenido al sistema de consulta médica</h2>
          <div className="linea-decorativa"></div>
          <p>Seleccione la opción que desea consultar:</p>
        </div>

        <section className="accesos-rapidos">
        <div onClick={() => navigate('/usuarioArticulos')} className="acceso">
            <span className="icono">📚</span>
            <h4>Artículos Médicos</h4>
            <p>Consulta protocolos, lineamientos y más.</p>
        </div>

        <div className="acceso acceso-disabled">
            <span className="icono">🔔</span>
            <h4>Alertas</h4>
            <p>Próximamente...</p>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default InicioUsuario;