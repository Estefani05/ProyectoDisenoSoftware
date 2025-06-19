import './App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home'; // Asegúrate de tener este archivo creado

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  // ✅ Credenciales fijas
  const USUARIO_VALIDO = "admin";
  const CONTRASENA_VALIDA = "1234";

  const handleAceptar = () => {
    if (usuario === USUARIO_VALIDO && contrasena === CONTRASENA_VALIDA) {
      navigate('/home');
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleCancelar = () => {
    setUsuario('');
    setContrasena('');
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Ingrese su usuario</h2>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Usuario"
        />
        <h2>Ingrese su contraseña</h2>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
        />
        <div className="button-group">
          <button onClick={handleAceptar}>Aceptar</button>
          <button onClick={handleCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
