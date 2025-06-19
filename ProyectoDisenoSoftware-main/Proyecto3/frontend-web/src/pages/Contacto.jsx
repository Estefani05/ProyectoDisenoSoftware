import './Contacto.css';
import Navbar from '../components/Navbar';

function Contacto() {
  return (
    <div className="pagina-contacto">
      <Navbar />

      <header className="contacto-header">
        <h2>Contáctenos</h2>
        <p>¿Tiene dudas o sugerencias? Escríbanos y con gusto le atenderemos.</p>
      </header>

      <section className="contacto-formulario">
        <header className="contacto-header">
        <h2>Contáctenos</h2>
        <p>¿Tiene dudas o sugerencias? Escríbanos y con gusto le atenderemos.</p>
      </header>
        <form>
          <input type="text" placeholder="Nombre completo" required />
          <input type="email" placeholder="Correo electrónico" required />
          <input type="text" placeholder="Asunto" required />
          <textarea placeholder="Mensaje" rows="5" required></textarea>
          <button type="submit">Enviar mensaje</button>
        </form>
      </section>

      <section className="contacto-info">
        <p><strong>Correo:</strong> contacto@rippsha.cr</p>
        <p><strong>Teléfono:</strong> (506) 2522-0000</p>
        <p><strong>Dirección:</strong> Oficinas centrales, CCSS, Limón</p>
      </section>

      <footer className="inicio-footer2">
        <p>© 2025 RIPPSHA - Caja Costarricense de Seguro Social</p>
      </footer>
    </div>
  );
}

export default Contacto;
