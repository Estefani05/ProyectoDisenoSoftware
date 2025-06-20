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

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const navigate = useNavigate();

  // ✅ Credenciales fijas
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
        if (data.success === true) {
          navigate('/home');
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

        <label htmlFor="usuario" className="input-label">Usuario</label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Ingrese su usuario"
          required
        />

        <label htmlFor="contrasena" className="input-label">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Ingrese su contraseña"
          required
        />

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
      <Route path="/home" element={<Home />} />
      <Route path="/usuarioArticulos" element={<ArticulosUsuario />} />
      <Route path="/usuarioHome" element={<HomeUsuario />} />
      <Route path="/Contacto" element={<Contacto />} />
      <Route path="/admin/carrusel" element={<GestionSlides />} />
      <Route path="/admin/articulos" element={<GestionArticulos />} />
    </Routes>
  );
}

export default App;
