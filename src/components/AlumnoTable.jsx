import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Button } from './ui/button';

const API_URL = import.meta.env.VITE_API_URL;

export default function AlumnoTable({ estado }) {
  const [alumnos, setAlumnos] = useState([]);
  const [query, setQuery] = useState('');
  const [nuevo, setNuevo] = useState({});

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (estado === 'form') return;
    axios
      .get(`${API_URL}/api/alumnos/${estado}`, { headers })
      .then(res => setAlumnos(res.data))
      .catch(err => console.error('❌ Error cargando alumnos:', err));
  }, [estado]);

  const buscar = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/buscar?query=${query}`, { headers });
      setAlumnos(res.data);
    } catch (err) {
      console.error('❌ Error en búsqueda:', err);
    }
  };

  const cambiarEstado = async (id, estado_matricula) => {
    try {
      await axios.put(`${API_URL}/api/alumnos/${id}/estado`, { estado_matricula }, { headers });
      const res = await axios.get(`${API_URL}/api/alumnos/pendiente`, { headers });
      setAlumnos(res.data);
    } catch (err) {
      console.error('❌ Error al cambiar estado:', err);
    }
  };

  const registrar = async () => {
    try {
      await axios.post(`${API_URL}/api/alumnos`, nuevo, { headers });
      alert('Alumno registrado.');
      setNuevo({});
    } catch (err) {
      console.error('❌ Error al registrar alumno:', err);
    }
  };

  if (estado === 'form') {
    return (
      <div className="space-y-3 max-w-xl">
        <Input placeholder="Nombre" onChange={e => setNuevo({ ...nuevo, nombre_alumno: e.target.value })} />
        <Input placeholder="Curso" onChange={e => setNuevo({ ...nuevo, curso: e.target.value })} />
        <Input placeholder="Apoderado" onChange={e => setNuevo({ ...nuevo, nombre_apoderado: e.target.value })} />
        <Input placeholder="Teléfono" onChange={e => setNuevo({ ...nuevo, telefono_apoderado: e.target.value })} />
        <Input placeholder="Email" onChange={e => setNuevo({ ...nuevo, email_apoderado: e.target.value })} />
        <Input placeholder="Conocimiento" onChange={e => setNuevo({ ...nuevo, medio_conocimiento: e.target.value })} />
        <Input placeholder="RUT" onChange={e => setNuevo({ ...nuevo, rut: e.target.value })} />
        <Button onClick={registrar}>Registrar</Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <Input placeholder="Buscar por nombre o RUT" onChange={e => setQuery(e.target.value)} />
        <Button onClick={buscar}>Buscar</Button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Nombre</th>
            <th>Curso</th>
            <th>Apoderado</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a) => (
            <tr key={a.id}>
              <td>{a.nombre_alumno}</td>
              <td>{a.curso}</td>
              <td>{a.nombre_apoderado}</td>
              <td>{a.estado_matricula}</td>
              <td>
                {estado === 'pendiente' && (
                  <>
                    <Button size="sm" onClick={() => cambiarEstado(a.id, 'matriculado')}>✔️</Button>
                    <Button size="sm" variant="destructive" onClick={() => cambiarEstado(a.id, 'cancelado')}>❌</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
