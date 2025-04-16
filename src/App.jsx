import React, { useState } from 'react';
import Login from './components/Login';
import AlumnoTable from './components/AlumnoTable';
import Stats from './components/Stats';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard CSMLC</h1>
      <Stats token={token} />
      <AlumnoTable token={token} />
    </div>
  );
}

export default App;