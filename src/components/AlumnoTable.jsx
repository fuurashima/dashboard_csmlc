import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function AlumnoTable({ token, estado }) {
  const [alumnos, setAlumnos] = useState([]);
  const [query, setQuery] = useState('');
  const [nuevo, setNuevo] = useState({});
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (estado === 'form') return;
    axios.get(`/api/alumnos/${estado}`, { headers }).then(res => setAlumnos(res.data));
  }, [estado]);

  const buscar = async () => {
    const res = await axios.get(`/api/buscar?query=${query}`, { headers });
    setAlumnos(res.data);
  };

  const cambiarEstado = async (id, estado_matricula) => {
    await axios.put(`/api/alumnos/${id}/estado`, { estado_matricula }, { headers });
    const res = await axios.get(`/api/alumnos/pendiente`, { headers });
    setAlumnos(res.data);
  };

  const registrar = async () => {
    await axios.post('/api/alumnos', nuevo, { headers });
    alert('Alumno registrado.');
    setNuevo({});
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
          <tr className="bg-gray-100"><th>Nombre</th><th>Curso</th><th>Apoderado</th><th>Estado</th><th>Acción</th></tr>
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
