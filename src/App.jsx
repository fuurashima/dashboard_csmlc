import React, { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import Stats from "@/components/Stats";
import AddAlumno from "@/components/AddAlumno";
import AlumnoTable from "@/components/AlumnoTable";

export default function App() {
  const [view, setView] = useState("stats");

  const renderView = () => {
    switch (view) {
      case "stats":
        return <Stats />;
      case "add":
        return <AddAlumno />;
      case "pendientes":
        return <AlumnoTable estado="pendiente" />;
      case "matriculados":
        return <AlumnoTable estado="matriculado" />;
      default:
        return <Stats />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setView} />
      <main className="flex-1 p-4">{renderView()}</main>
    </div>
  );
}
