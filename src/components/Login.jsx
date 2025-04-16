import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { user, pass });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch {
      alert('Login incorrecto');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <input className="border w-full p-2 mb-2" placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} />
      <input className="border w-full p-2 mb-2" type="password" placeholder="Contraseña" value={pass} onChange={e => setPass(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 w-full" onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;