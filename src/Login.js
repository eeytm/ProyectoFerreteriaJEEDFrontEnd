import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Esta línea debe estar dentro del componente Login

  const handleLogin = () => {
    // Aquí puedes realizar la validación del nombre de usuario y contraseña
    if (username === 'Eleazar' && password === 'Yoc') {
      // Usuario válido, redirige a la página principal
      navigate('/home'); // Redirige a la página de inicio (ajusta la ruta según sea necesario)
    } else {
      // Mostrar un mensaje de error al usuario
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Iniciar sesión</button>
      </div>
    </div>
  );
}

export default Login;
