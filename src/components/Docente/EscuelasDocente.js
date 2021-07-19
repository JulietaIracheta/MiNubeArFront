import React, { useEffect, useState } from "react";
import { GearFill } from "react-bootstrap-icons";
import "../../assets/css/css-docente.css";
import Sidebar from "../Sidebar";
import { SidebarDataDocente } from '../sideBar/SidebarDataDocente';
import CursosAsignadosDocente from "./CursosAsignadosDocente";
import { Cookies } from 'react-cookie';

const EscuelasDocente = () => {
  const [institucion, SetInstitucion] = useState([]);
  const [curso, SetCurso] = useState([]);
  const [click, setearClick] = useState(false);
  const cookie = new Cookies();
  const [seleccion, setearSeleccion] = useState({cursoId:'', cursoNombre:'',institucionID:'', institucionNombre:''});
  const jwt = cookie.get('jwt');

  useEffect(async () => {
    const result = await fetch('http://localhost:60671/api/docente/getInstitucion?jwt='+jwt, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        SetInstitucion(response);
      });
  }, [])

  useEffect(async () => {
    const result = await fetch('http://localhost:60671/api/docente/getCursos?jwt='+jwt, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        SetCurso(response);
      });
  }, [])

  const seleccionar= (curso, institucion) =>{
    setearClick(true);
    setearSeleccion(
      {curso:curso.idCurso,
      cursoNombre:curso.nombre, 
      institucion:institucion.idInstitucion,
      institucionNombre:institucion.nombre});
  }

  return (
    <div className="d-flex mt-1">
      <Sidebar data={SidebarDataDocente} />
      <div className="main w-100 pr-2 pt-4">
        {click ? 
          <CursosAsignadosDocente
           cursoId={seleccion.curso} 
           cursoNombre={seleccion.cursoNombre}
           institucionId={seleccion.institucion}
           institucionNombre={seleccion.institucionNombre}
           setearClick={setearClick}></CursosAsignadosDocente>
        :
        <div>
           <div className="mb-4 pl-3 pl-sm-2">
              <span className="tituloadmin tituloDocente">Mis Escuelas</span>
              <p className="text-secondary">
                Es esta sección puede ver los cursos que tiene asignado<br/>
                ordenados por institución.
              </p>

           </div>
        {institucion.map((inst) => 
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 m-0">
              {curso.map((c) => 
                <div className="col mb-4">
                  <div className="card container bordes">
                      <h5 className="card-title pt-3 pl-2 pb-2 card-title-docente">
                        Curso : <>{c.nombre}</>
                        <hr />
                        Institución : {inst.nombre}
                        <hr />
                      </h5>
                      <div className="card-body">
                        <div class="d-flex flex-row-reverse">
                            <GearFill 
                              onClick={() =>seleccionar(c,inst)}
                              size= {26}
                              color= {"#2d2f85"}
                              cursor={"pointer"}
                            />
                        </div>
                      </div>
                  </div>
                </div>
              )}</div>
          )}
          </div>
        }
      </div>
    </div>
  );
}
export default EscuelasDocente;