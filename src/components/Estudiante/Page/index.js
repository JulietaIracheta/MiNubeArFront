import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Sidebar from "../Sidebar";
import NavEstudiante from "../NavEstudiante";
import EstudianteMaterias from "../EstudianteMaterias";
import MateriasUnidades from "../MateriasUnidades";

export default function Estudiante() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
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
      //console.log(content);
      setNombre(content.nombre);
    })();
  }, []);

  return (
    <div>
      <NavEstudiante />
      <div className="flex">
        <Sidebar />
        <div className="content">
          <EstudianteMaterias />
        </div>
      </div>
    </div>
  );
}
