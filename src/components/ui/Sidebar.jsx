import React from 'react';

export default function Sidebar({ onSelect }) {
  const items = [
    { label: 'Principal', key: 'stats' },
    { label: 'Añadir alumno', key: 'add' },
    { label: 'Alumnos pendientes', key: 'pendientes' },
    { label: 'Alumnos matriculados', key: 'matriculados' },
  ];

  return (
    <div className="w-60 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold">📊 Dashboard CSMLC</h2>
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          className="text-left hover:bg-gray-700 p-2 rounded"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
