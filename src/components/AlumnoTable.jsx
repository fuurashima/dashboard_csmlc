import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AlumnoTable({ token }) {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/alumnos`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAlumnos(res.data));
  }, [token]);

  return (
    <div className="mt-6">
      <h2 className="text-xl mb-2">Listado de alumnos</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Nombre</th>
            <th className="border px-2">Curso</th>
            <th className="border px-2">Apoderado</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a, i) => (
            <tr key={i}>
              <td className="border px-2">{a.nombre_alumno}</td>
              <td className="border px-2">{a.curso}</td>
              <td className="border px-2">{a.nombre_apoderado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlumnoTable;