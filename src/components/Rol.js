import React, { useState, useEffect} from 'react';
import Docente from './Docente/Page';
import Estudiante from './Estudiante/Page';
import Tutor from './Tutor/Page';


export default function Rol(){
  const [rol, setRol] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:60671/api/usuario/user", {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setRol(content.rol);
})();
  },[]);
  
return (
    <div>
        {rol === 'Estudiante' && <Estudiante />}
        {rol === 'Docente' && <Docente />}
        {rol === 'Tutor' && <Tutor />}
    </div>
    );


}
