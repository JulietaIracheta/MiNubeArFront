import React, { useState, useEffect} from 'react';
import Docente from './Docente/Page';
import Estudiante from './Estudiante/Page/index';
import Tutor from './Tutor/Page';
import Registro from './Registro/Registro'; 
import { Cookies, useCookies } from "react-cookie";
import url from "../url"

export default function Rol(){
  const [rol, setRol] = useState("");
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  const [cookies, setCookie] = useCookies(["usuario"]);
  
  useEffect(() => {
    (async () => {
      const response = await fetch(`${url.url}/api/rol/getRolByUsuario?jwt=`+jwt, {
        headers: { "Content-type": "application/json" },
        credentials: "include"
      });

      const content = await response.json();  
      cookie.set('rol', content);
      
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
