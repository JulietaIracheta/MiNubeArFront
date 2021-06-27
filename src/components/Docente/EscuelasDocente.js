import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Gear } from "react-bootstrap-icons";
import "../../assets/css/css-docente.css";
import getInstitucionDocente from "../../services/estudiantes/getInstitucionDocente";
import getCursoDocente from "../../services/estudiantes/getCursoDocente";
import Sidebar from "../Sidebar";
import { SidebarDataDocente } from '../sideBar/SidebarDataDocente';
import getId from '../../services/docente/getId'

const EscuelasDocente = () => {
  const [id, setId] = useState(0);
  const [institucion, SetInstitucion] = useState([]);
  const [curso, SetCurso] = useState([]);

  useEffect(async () => {
    const result = await fetch('http://localhost:60671/api/docente/1', {
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
    const result = await fetch('http://localhost:60671/api/docente/getCursos/1', {
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
  /*useEffect(
    function () {
      console.log(id)
      getInstitucionDocente(id).then((institucion) =>
        SetInstitucion(institucion)
      );
    },
    [id]
  );
  useEffect(
    function () {
      getCursoDocente(id).then((curso) =>
        SetCurso(curso)
      );
    },
    [id]
  );*/
  return (
    <div className="d-flex mt-1">
      <Sidebar data={SidebarDataDocente} />
      <div className="container cardContainer ">
        <div>
          <h2 className="font-weight-bold colorDoc">Mis Escuelas</h2>
          <hr className="hr-colorDoc" />
        </div>
        {institucion.map((inst) => (
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
                        <Link to={`/curso/${inst.nombre}/${c.nombre}/${c.idCurso}`} 
                        className="link-escuela-docente-responsive">
                          <Gear className="icono-escuela-docente-responsive"/>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default EscuelasDocente;