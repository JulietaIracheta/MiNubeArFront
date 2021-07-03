import React, { useState, useEffect } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import "../../assets/css/css-tutor.css";
import GetEstudiantesTutor from "../../services/tutor/getEstudiantesTutor";
import Sidebar from "../Sidebar";
import {SidebarDataTutor} from '../sideBar/SidebarDataTutor';

export default function EstudiantesTutor() {
  const [estudiantes, SetEstudiantes] = useState([]);
  
  useEffect(
    function () {
      GetEstudiantesTutor().then((estudiante) => SetEstudiantes(estudiante));
      console.log(estudiantes);
    },[]);

  return (
    <div>
      <div className="d-flex mt-1 borde-tutor">
        <Sidebar data={SidebarDataTutor}/>
        <div className="container mt-2">
          <h2 className="font-weight-bold colorTut">Mis Estudiantes</h2>
          <hr className="hr-colorTut" />
          <div className="row w-100">
            {estudiantes.map((est) => (
              <div className="col-md-4 alumno mt-2">
                <div className="row w-100">
                  <div className="card min-w card-tutor ml-2" style={{ minHeight: "10rem" }}>
                    <div className="card-body row">
                       <div className="col-md-4 col-sm-12">
                          <PersonCircle className="w-100 h-100" ></PersonCircle>
                      </div>
                      <div className="col-md-8 col-sm-12 d-flex flex-column justify-content-around">
                        <span className="font-weight-bold" style={{fontSize:"1.4rem"}}>
                          {est.nombre}{", "}
                          {est.apellido}
                        </span>

                        <div className="btn-group float-right">
                          <Link to={`/materiasTutorEstudiante/${est.idUsuario}`}  className="text-decoration-none btn btn-outline-dark btn-sm x">Actividad</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )  )}
            
          </div>

          <div>
          </div>
        </div>
      </div>

    </div>
  );
}
