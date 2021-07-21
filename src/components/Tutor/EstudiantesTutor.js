import React, { useState, useEffect } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import "../../assets/css/css-tutor.css";
import GetEstudiantesTutor from "../../services/tutor/getEstudiantesTutor";
import Sidebar from "../Sidebar";
import {SidebarDataTutor} from '../sideBar/SidebarDataTutor';
import { Cookies } from 'react-cookie';

export default function EstudiantesTutor() {
  const [estudiantes, SetEstudiantes] = useState([]);
  const cookie = new Cookies();
    const jwt = cookie.get('jwt');

  useEffect(
    function () {
      GetEstudiantesTutor(jwt).then((estudiante) => SetEstudiantes(estudiante));
      console.log(estudiantes);
    },[]);

  return (
    <div>
      <div className="d-flex">
        <Sidebar data={SidebarDataTutor}/>
        <div className="main w-100 pr-2 pt-4">
          <h2 className="tituloadmin tituloTutor mb-4">Mis Estudiantes</h2>
          {/* <hr className="hr-colorTut" /> */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 row-cols-xl-3 m-0">
            {estudiantes.map((est) => (
              <div className="col mb-4">
                <div className="w-100">
                  <div className="card-tutor">
                    <div className="card-body row">
                       <div className="col-md-4 col-sm-12">
                          <PersonCircle className="w-100 h-100" ></PersonCircle>
                      </div>
                      <div className="col-md-8 col-sm-12 d-flex flex-column justify-content-around">
                        <span className="font-weight-bold mt-2 mb-2" style={{fontSize:"1em"}}>
                          {est.nombre}{", "}
                          {est.apellido}
                        </span>

                        <div className="btn-group float-right">
                          <Link to={`/materiasTutorEstudiante/${est.idUsuario}`}  className="text-decoration-none btn btn-outline-success btn-sm x">Ver Actividad</Link>
                        </div>
                        <div className="btn-group float-right mt-2">
                          <Link to={`/tutor/trayectoria/${est.idUsuario}`}  className="text-decoration-none btn btn-outline-success btn-sm x">Ver Trayectoria</Link>
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
