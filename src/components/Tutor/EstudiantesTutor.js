import React, { useState, useEffect } from "react";
import { Gear } from "react-bootstrap-icons";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../../assets/css/css-tutor.css";
import GetEstudiante from "../../services/estudiantes/getEstudiante";
import Notificaciones from "../Docente/Notificaciones";

export default function EstudiantesTutor() {
  const [estudiante, SetEstudiante] = useState([]);
  const [estudiante2, SetEstudiante2] = useState([]);
  const id = 1;
  const id2 = 2;
  useEffect(
    function () {
      GetEstudiante(id).then((estudiante) => SetEstudiante(estudiante));
      GetEstudiante(id2).then((estudiante2) => SetEstudiante2(estudiante2));
    },
    [id]
  );


  return (
    <div className="container">
      <div>
        <h2 className="font-weight-bold colorTut">Mis Estudiantes</h2>
        <hr className="hr-colorTut" />
      </div>
      <div className="row">
        <div className="col-md-6 border-derecho colorTut alumno">
          <div>
            <div className="mb-3">
              <div className="col-md-12">
                <div className="card min-w card-tutor">
                  <div className="card-body row">
                    <div className="col-md-4 col-sm-12">
                      <img
                        src={estudiante.avatar}
                        title={estudiante.first_name}
                        className="rounded-circle h-55 borde-avatar-alumno"
                      ></img>
                    </div>
                    <div className="col-md-8 col-sm-12 d-flex flex-column justify-content-around">
                      <p className="font-weight-bold">
                        {estudiante.first_name}{" "}
                        {estudiante.last_name}
                      </p>
                      
                        <div className="btn-group float-right">
                      <a
                        href="/"
                        className="text-decoration-none btn mr-3 btn-secondary rounded-pill"
                      >
                        Ver Actividad
                      </a>

                      <a
                        href="/"
                        className="text-decoration-none btn btn-outline-dark border border-secondary rounded-pill"
                      >
                        Ver Perfil
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      <Notificaciones /> 
      </div>
      <div>
      <div className="row">
        <div className="col-md-6 border-derecho colorTut alumno">
          <div>
            <div className="mb-3">
              <div className="col-md-12">
                <div className="card min-w card-tutor">
                  <div className="card-body row">
                    <div className="col-md-4 col-sm-12">
                      <img
                        src={estudiante2.avatar}
                        title={estudiante2.first_name}
                        className="rounded-circle h-55 borde-avatar-alumno"
                      ></img>
                    </div>
                    <div className="col-md-8 col-sm-12 d-flex flex-column justify-content-around">
                      <p className="font-weight-bold">
                        {estudiante2.first_name}{" "}
                        {estudiante2.last_name}
                      </p>
                      
                        <div className="btn-group float-right">
                      <a
                        href="/"
                        className="text-decoration-none btn mr-3 btn-secondary rounded-pill"
                      >
                        Ver Actividad
                      </a>

                      <a
                        href="/"
                        className="text-decoration-none btn btn-outline-dark border-secondary rounded-pill"
                      >
                        Ver Perfil
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
          <div className="col-md-6 ">
            <div>
              <div>
              <h2 className="font-weight-bold colorTut">Calendario</h2>

                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
