import React, { useState, useEffect } from "react";
import { Gear, PersonCircle } from "react-bootstrap-icons";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import "../../assets/css/css-tutor.css";
import GetEstudiante from "../../services/estudiantes/getEstudiante";
import Notificaciones from "../Docente/Notificaciones";
import Sidebar from "../Sidebar";
import NavTutor from './NavTutor';

export default function EstudiantesTutor() {
  const [estudiante, SetEstudiante] = useState([]);
  const [estudiante2, SetEstudiante2] = useState([]);
  const id = 1;
  const id2 = 2;
  useEffect(
    function () {
      GetEstudiante(id).then((estudiante) => SetEstudiante(estudiante));
      GetEstudiante(id2).then((estudiante2) => SetEstudiante2(estudiante2));
      console.log(estudiante);
    },
    [id]
  );


  return (
    <div>
      <NavTutor></NavTutor>
      <div className="d-flex mt-1 borde-tutor">
        <Sidebar />

        <div className="container mt-2">
          <h2 className="font-weight-bold colorTut">Mis Estudiantes</h2>
          <hr className="hr-colorTut" />
          <div className="row">
            <div className="container">

              <div className="col-md-4 alumno mt-2">
                <div className="row w-100">
                  <div className="card min-w card-tutor" style={{ minHeight: "10rem" }}>
                    <div className="card-body row">
                      <div className="col-md-4 col-sm-12">
                        {estudiante.avatar ?
                          <img
                            src={estudiante.avatar}
                            title={estudiante.nombre}
                            className="rounded-circle h-55 borde-avatar-alumno"
                          ></img>
                          :
                          <PersonCircle className="w-100 h-100" ></PersonCircle>}
                      </div>
                      <div className="col-md-8 col-sm-12 d-flex flex-column justify-content-around">
                        <span className="font-weight-bold" style={{fontSize:"1.4rem"}}>
                          {estudiante.nombre}{", "}
                          {estudiante.apellido}
                        </span>

                        <div className="btn-group float-right">
                          <Link to={`/tutor/actividadEstudiante`} className="text-decoration-none btn btn-outline-dark btn-sm x">Actividad</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
          </div>
        </div>
      </div>

    </div>
  );
}
