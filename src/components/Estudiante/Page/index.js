import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import NavEstudiante from "../NavEstudiante";
import EstudianteMaterias from "../EstudianteMaterias";
import { Route } from "react-router-dom";
import { SidebarDataEstudiante } from "../../sideBar/SidebarDataEstudiante";

function Estudiante() {
  const [nombre, setNombre] = useState("");
    
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:60671/api/persona/getPersonaByUsuario",
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
          credentials: "include",
        }
      );

      const content = await response.json();
      setNombre(content.nombre);
    })();
  });

  return (
    <div>
      <NavEstudiante />
      <div className="flex">
        <Sidebar data={SidebarDataEstudiante}/>
        <div className="content">
          <Route path="/" component={EstudianteMaterias} />
        </div>
      </div>
    </div>
  );
}
export default Estudiante;
