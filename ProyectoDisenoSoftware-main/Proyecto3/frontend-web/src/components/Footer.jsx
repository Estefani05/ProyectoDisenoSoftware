import './Footer.css';
import logo from '../assets/ss.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="inicio-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
          <p>RIPPSHA - Caja Costarricense de Seguro Social</p>
        </div>

        <div className="footer-links">
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><Link to="/usuarioArticulos">Artículos</Link></li>
            <li><a href="#">Noticias</a></li>
            <li><Link to="/Contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-contacto">
          <h4>Contacto</h4>
          <p>📍 Limón, Costa Rica</p>
          <p>📞 800-123-CCSS</p>
          <p>✉️ info@ccss.sa.cr</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 RIPPSHA - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;