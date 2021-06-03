import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Gear } from "react-bootstrap-icons";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/css-docente.css";
import getInstitucionDocente from "../../services/estudiantes/getInstitucionDocente";
import getCursoDocente from "../../services/estudiantes/getCursoDocente";
import Notificaciones from "./Notificaciones";

export default function EscuelasDocente() {
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
    <div className="container cardContainer ">
      <div>
        <h2 className="font-weight-bold colorDoc">Mis Escuelas</h2>
        <hr className="hr-colorDoc" />
      </div>

      <div className="row">
        <div className="col-md-6 border-derecho-docente">
          {institucion.map((inst) => (
            <Link to="/curso/1" className="text-decoration-none">
            {curso.map((c) =>            
              <div className="bordes mb-3">
                <div className="card-body colorDoc font-weight-bold">
                  <h5 className="card-title size espacio font-weight-bold colorDoc">
                    {inst}
                    {"--"}
                     <>{c}</>
                  </h5>
                  <div className="text-left">
                    <div class="d-flex flex-row-reverse">
                      <Gear />
                    </div>
                  </div>
                </div>
              </div>
              )}
            </Link>
          ))}
        </div>
        <div className="col">
          <Notificaciones />
          <h2 className="font-weight-bold colorTut">Calendario</h2>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
