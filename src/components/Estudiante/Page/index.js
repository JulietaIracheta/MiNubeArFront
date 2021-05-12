import React from "react";
import { useState, useEffect} from 'react';
import Materias from "../Materias";
import NavEstudiante from "../NavEstudiante";

function Estudiante() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:60671/api/usuario/user", {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setNombre(content.nombre);
      setRol(content.rol);
})();
  });

  return (
    <div>
      <NavEstudiante />
      <Materias name={nombre} rol={rol}/>
    </div>
  );
}

export default Estudiante;
