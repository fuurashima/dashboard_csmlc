import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` };

export default function Dashboard() {
  const [view, setView] = useState('principal');
  const [stats, setStats] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [query, setQuery] = useState('');
  const [nuevoAlumno, setNuevoAlumno] = useState({});

  const fetchEstadisticas = async () => {
    const res = await axios.get('/api/estadisticas', { headers });
    setStats(res.data);
  };

  const fetchAlumnos = async (estado) => {
    const res = await axios.get(`/api/alumnos/${estado}`, { headers });
    setAlumnos(res.data);
  };

  const buscar = async () => {
    const res = await axios.get(`/api/buscar?query=${query}`, { headers });
    setAlumnos(res.data);
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    await axios.put(`/api/alumnos/${id}/estado`, { estado_matricula: nuevoEstado }, { headers });
    fetchAlumnos('pendiente');
  };

  const registrarAlumno = async () => {
    await axios.post('/api/alumnos', nuevoAlumno, { headers });
    alert('Alumno registrado.');
    setNuevoAlumno({});
  };

  useEffect(() => {
    if (view === 'principal') fetchEstadisticas();
    if (view === 'pendientes') fetchAlumnos('pendiente');
    if (view === 'matriculados') fetchAlumnos('matriculado');
  }, [view]);

  return (
    <div className="flex">
      <aside className="w-64 p-4 border-r h-screen">
        <h2 className="font-bold text-xl mb-4">Dashboard CSMLC</h2>
        <ul className="space-y-2">
          <li><button onClick={() => setView('principal')}>Principal</button></li>
          <li><button onClick={() => setView('añadir')}>Añadir alumno</button></li>
          <li><button onClick={() => setView('pendientes')}>Alumnos Pendientes</button></li>
          <li><button onClick={() => setView('matriculados')}>Alumnos Matriculados</button></li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        {view === 'principal' && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((s, i) => (
                <Card key={i}><CardContent>
                  <strong>{s.curso}</strong><br/>
                  {s.estado_matricula}: {s.total}
                </CardContent></Card>
              ))}
            </div>
          </>
        )}

        {view === 'añadir' && (
          <div className="space-y-3 max-w-xl">
            <Input placeholder="Nombre" onChange={e => setNuevoAlumno({ ...nuevoAlumno, nombre_alumno: e.target.value })}/>
            <Input placeholder="Curso" onChange={e => setNuevoAlumno({ ...nuevoAlumno, curso: e.target.value })}/>
            <Input placeholder="Apoderado" onChange={e => setNuevoAlumno({ ...nuevoAlumno, nombre_apoderado: e.target.value })}/>
            <Input placeholder="Teléfono" onChange={e => setNuevoAlumno({ ...nuevoAlumno, telefono_apoderado: e.target.value })}/>
            <Input placeholder="Email" onChange={e => setNuevoAlumno({ ...nuevoAlumno, email_apoderado: e.target.value })}/>
            <Input placeholder="Conocimiento" onChange={e => setNuevoAlumno({ ...nuevoAlumno, medio_conocimiento: e.target.value })}/>
            <Input placeholder="RUT" onChange={e => setNuevoAlumno({ ...nuevoAlumno, rut: e.target.value })}/>
            <Button onClick={registrarAlumno}>Registrar</Button>
          </div>
        )}

        {(view === 'pendientes' || view === 'matriculados') && (
          <>
            <div className="mb-4">
              <Input placeholder="Buscar por nombre o RUT" onChange={e => setQuery(e.target.value)} />
              <Button onClick={buscar}>Buscar</Button>
            </div>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th>Nombre</th><th>Curso</th><th>Apoderado</th><th>Estado</th><th>Acción</th>
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
                      {view === 'pendientes' && (
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
        )}
      </main>
    </div>
  );
}
