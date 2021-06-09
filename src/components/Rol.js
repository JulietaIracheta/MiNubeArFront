import React, { useState, useEffect} from 'react';
import Docente from './Docente/Page';
import Estudiante from './Estudiante/Page';
import Tutor from './Tutor/Page';
import Registro from './Registro/Registro'; 
import Cookies from 'universal-cookie';

export default function Rol(){
  const [rol, setRol] = useState("");
  const cookie = new Cookies();
  
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:60671/api/rol/getRolByUsuario", {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setRol(content);
})();
  },[]);
return (
    <div>
        {rol === 1 && <Estudiante />}
        {rol === 2 && <Docente />}
        {rol === 3 && <Tutor />}
        {rol === 4 && <Registro />}

    </div>
    );


}
