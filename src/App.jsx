// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [alumnos, setAlumnos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${API_URL}/api/alumnos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setAlumnos(res.data))
    .catch(err => console.error('Error al cargar alumnos:', err));

    axios.get(`${API_URL}/api/estadisticas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setEstadisticas(res.data))
    .catch(err => console.error('Error al cargar estadísticas:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard CSMLC</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {estadisticas.map((stat, i) => (
          <div key={i} className="border p-4 rounded shadow-sm">
            <p className="font-bold">{stat.curso}</p>
            <p>{stat.estado_matricula}: {stat.total}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Listado de alumnos</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Curso</th>
            <th className="px-4 py-2">Apoderado</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.length > 0 ? (
            alumnos.map((al, i) => (
              <tr key={i} className="text-center border-t">
                <td className="px-4 py-2">{al.nombre_alumno}</td>
                <td className="px-4 py-2">{al.curso}</td>
                <td className="px-4 py-2">{al.nombre_apoderado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No hay alumnos registrados aún.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
