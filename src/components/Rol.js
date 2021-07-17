import React, { useState, useEffect} from 'react';
import Docente from './Docente/Page';
import Estudiante from './Estudiante/Page/index';
import Tutor from './Tutor/Page';
import Registro from './Registro/Registro'; 
import Cookies from 'universal-cookie';

export default function Rol(){
  const [rol, setRol] = useState("");
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  
  useEffect(() => {
    (async () => {
      const response = await fetch("http://134.209.120.136:4000/api/rol/getRolByUsuario?jwt="+jwt, {
        headers: { "Content-type": "application/json" },
        credentials: "include"
      });

      const content = await response.json();  
      cookie.set('rol', content);
      
      console.log( content );

      setRol(content);
})();
  },[]);
return (
    <div>
        {rol === 1 && <Estudiante/>}
        {rol === 2 && <Docente />}
        {rol === 3 && <Tutor />}
        {rol === 4 && <Registro />}

    </div>
    );


}
