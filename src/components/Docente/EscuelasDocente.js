import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Gear } from "react-bootstrap-icons";
import "../../assets/css/css-docente.css";
import Sidebar from "../Sidebar";
import { SidebarDataDocente } from '../sideBar/SidebarDataDocente';
import CursosAsignadosDocente from "./CursosAsignadosDocente";
import { Cookies } from 'react-cookie';
import url from "../../url"

const EscuelasDocente = () => {
  const [institucion, SetInstitucion] = useState([]);
  const [curso, SetCurso] = useState([]);
  const [click, setearClick] = useState(false);
  const cookie = new Cookies();
  const [seleccion, setearSeleccion] = useState({cursoId:'', cursoNombre:'',institucionID:'', institucionNombre:''});
  const jwt = cookie.get('jwt');

  useEffect(async () => {
    const result = await fetch(`${url.url}/api/docente/getInstitucion?jwt=`+jwt, {
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
    const result = await fetch(`${url.url}/api/docente/getCursos?jwt=`+jwt, {
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
      <div className="container cardContainer ">
        {click ? 
          <CursosAsignadosDocente
           cursoId={seleccion.curso} 
           cursoNombre={seleccion.cursoNombre}
           institucionId={seleccion.institucion}
           institucionNombre={seleccion.institucionNombre}
           setearClick={setearClick}></CursosAsignadosDocente>
        :
        <div>
          <div>
            <h2 className="font-weight-bold colorDoc">Mis Escuelas</h2>
            <hr className="hr-colorDoc" />
          </div>
        {institucion.map((inst) => 
            <div className="row">
              {curso.map((c) => 
                <div className="col-md-6">
                  <div className="bordes mb-3">
                    <div className="card-body colorDoc font-weight-bold">
                      <h5 className="card-title font-weight-bold colorDoc">
                        Curso : <>{c.nombre}</>
                        <hr />
                        Institución : {inst.nombre}
                        <hr />
                      </h5>
                      <div className="text-left">
                        <div class="d-flex flex-row-reverse">
                          {/*<Link to={`/curso/${inst.nombre}/${c.nombre}/${c.idCurso}`} 
                        className="link-escuela-docente-responsive">*/
                          <Gear className="icono-escuela-docente-responsive" 
                          onClick={() =>seleccionar(c,inst)}/>
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}</div>
          )}</div>
        }
      </div>
    </div>
  );
}
export default EscuelasDocente;