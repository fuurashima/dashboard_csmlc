// src/components/AddAlumno.jsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function AddAlumno() {
  const [alumno, setAlumno] = useState({});
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const registrar = async () => {
    await axios.post('/api/alumnos', alumno, { headers });
    alert('Alumno registrado');
    setAlumno({});
  };

  return (
    <div className="space-y-3 max-w-xl">
      <Input placeholder="Nombre" onChange={e => setAlumno({ ...alumno, nombre_alumno: e.target.value })} />
      <Input placeholder="Curso" onChange={e => setAlumno({ ...alumno, curso: e.target.value })} />
      <Input placeholder="Apoderado" onChange={e => setAlumno({ ...alumno, nombre_apoderado: e.target.value })} />
      <Input placeholder="Teléfono" onChange={e => setAlumno({ ...alumno, telefono_apoderado: e.target.value })} />
      <Input placeholder="Email" onChange={e => setAlumno({ ...alumno, email_apoderado: e.target.value })} />
      <Input placeholder="Medio conocimiento" onChange={e => setAlumno({ ...alumno, medio_conocimiento: e.target.value })} />
      <Input placeholder="RUT" onChange={e => setAlumno({ ...alumno, rut: e.target.value })} />
      <Button onClick={registrar}>Registrar</Button>
    </div>
  );
}
