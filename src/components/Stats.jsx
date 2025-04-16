import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from './ui/card';

export default function Stats({ token }) {
  const [stats, setStats] = useState([]);
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('/api/estadisticas', { headers }).then(res => setStats(res.data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <Card key={i}>
          <CardContent>
            <strong>{s.curso}</strong><br />
            {s.estado_matricula}: {s.total}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
