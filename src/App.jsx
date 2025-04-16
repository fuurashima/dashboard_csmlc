import React, { useState } from 'react';
import Sidebar from './components/ui/Sidebar';
import Stats from './components/Stats';
import AlumnoTable from './components/AlumnoTable';
import Login from './components/Login';

export default function App() {
  const [view, setView] = useState('stats');
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="flex">
      <Sidebar onSelect={setView} />
      <main className="flex-1 p-6">
        {view === 'stats' && <Stats token={token} />}
        {view === 'pendientes' && <AlumnoTable token={token} estado="pendiente" />}
        {view === 'matriculados' && <AlumnoTable token={token} estado="matriculado" />}
        {view === 'add' && <AlumnoTable token={token} estado="form" />}
      </main>
    </div>
  );
}
