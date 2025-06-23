import './App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/HomeAdmin'; 
import HomeUsuario from './pages/HomeUsuario';
import ArticulosUsuario from './pages/ArticulosUsuario';
import Contacto from './pages/Contacto';
import GestionSlides from './pages/GestionSlides';
import GestionArticulos from './pages/GestionArticulos';
import backendFacade from './services/backendFacade';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GestionAdministradores from './pages/GestionAdministradores';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const navigate = useNavigate();

  //  Credenciales fijas
  const USUARIO_VALIDO = "admin";
  const CONTRASENA_VALIDA = "1234";

  const handleAceptar = async () => {
    const loginINFO = {
        correo: usuario,
        contrasena: contrasena
    }


    try{
        const response = await backendFacade.loginUsuario(loginINFO)
        const data = response.data
        console.log('Respuesta del servidor:', data);
        if (data.success === true) {
          const rolId = data.usuario.rol_id;

          console.log("TIPO ROL", rolId);
          localStorage.setItem('rol_id', rolId);
          navigate(`/home/${(data.usuario.rol_id).toString()}`);

        } else {
          toast.error('Usuario o contraseña incorrectos.');
        }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
       toast.error('Ocurrió un error al iniciar sesión. Intente más tarde.');

    }
  };

  const handleCancelar = () => {
    setUsuario('');
    setContrasena('');
  };

  return (
    <div className="container">
      <form className="login-box" onSubmit={(e) => { e.preventDefault(); handleAceptar(); }}>
        <h2>Iniciar Sesión</h2>

        <div className="input-group">
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="usuario">Usuario</label>
        </div>

        <div className="input-group">
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="contrasena">Contraseña</label>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">Aceptar</button>
          <button type="button" onClick={handleCancelar} className="btn-secondary">Cancelar</button>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </form>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home/:rol_id" element={<Home />} />
      <Route path="/usuarioArticulos" element={<ArticulosUsuario />} />
      <Route path="/usuarioHome" element={<HomeUsuario />} />
      <Route path="/Contacto" element={<Contacto />} />
      <Route path="/admin/carrusel" element={<GestionSlides />} />
      <Route path="/admin/articulos" element={<GestionArticulos />} />
      <Route path="/admin/administradores" element={<GestionAdministradores />} />
    </Routes>
  );
}

export default App;
