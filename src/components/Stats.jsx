import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stats({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/estadisticas`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((item, i) => (
        <div key={i} className="p-4 border bg-white shadow">
          <h3 className="font-semibold">{item.curso}</h3>
          <p>{item.estado_matricula}: {item.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Stats;