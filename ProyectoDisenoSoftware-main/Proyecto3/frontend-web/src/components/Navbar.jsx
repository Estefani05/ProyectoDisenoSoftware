import './Navbar.css';
import logo from '../assets/ss.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-ccss ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navbar-links">
          <li><Link to="/usuarioHome">Inicio</Link></li>
          <li><Link to="/usuarioArticulos">Artículos</Link></li>
          <li><Link to="/Contacto">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;