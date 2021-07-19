import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Sidebar from "../../Sidebar";
import NavEstudiante from "../NavEstudiante";
import EstudianteMaterias from "../EstudianteMaterias";
import MateriasUnidades from "../MateriasUnidades";
import { SidebarDataEstudiante } from "../../sideBar/SidebarDataEstudiante";
import { Cookies } from 'react-cookie';
import url from "../../../url"

export default function Estudiante() {
  const [nombre, setNombre] = useState("");
  const getCookie = new Cookies();
  const jwt = getCookie.get('jwt');

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${url.url}/api/persona/getPersonaByUsuario?jwt=`+jwt,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
          credentials: "include",
        }
      );

      const content = await response.json();
      setNombre(content.nombre);
    })();
  }, []);

  return (
    <>
      <NavEstudiante />
      <div className="flex">
        <Sidebar data={SidebarDataEstudiante}/>
        <div className="main w-100 pr-3 pt-4">
          <EstudianteMaterias nombre={nombre}/>
        </div>
      </div>
    </>
  );
}
