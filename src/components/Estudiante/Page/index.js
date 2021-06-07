import React from "react";
import { useState, useEffect} from 'react';
import Materias from "../Materias";
import NavEstudiante from "../NavEstudiante";

function Estudiante() {
  const [nombre, setNombre] = useState("");
  
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:60671/api/persona/getPersonaByUsuario", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include"
      });

      const content = await response.json();
      setNombre(content.nombre);
})();
  });

  return (
    <div>
      <NavEstudiante />
      <Materias name={nombre}/>
    </div>
  );
  }
export default Estudiante;
