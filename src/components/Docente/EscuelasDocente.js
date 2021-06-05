import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Gear } from "react-bootstrap-icons";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/css-docente.css";
import getInstitucionDocente from "../../services/estudiantes/getInstitucionDocente";
import getCursoDocente from "../../services/estudiantes/getCursoDocente";
import Sidebar from "./Sidebar";

const EscuelasDocente = () => {
  const id = 28;
  const [institucion, SetInstitucion] = useState([]);
  const [curso, SetCurso] = useState([]);
  useEffect(
    function () {
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
  );

  return (
    <div className="d-flex mt-1">
    <Sidebar />
      <div className="container cardContainer ">
      <div>
        <h2 className="font-weight-bold colorDoc">Mis Escuelas</h2>
        <hr className="hr-colorDoc" />
      </div>

      
          {institucion.map((inst) => (
            <span>
            {curso.map((c) =>       
                  
            <div>
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
                    <a href={`/curso/${inst.nombre}/${c.nombre}`}><Gear /></a>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              )}
            </span>
          ))}
        </div>
        </div>
  );
}
export default EscuelasDocente;