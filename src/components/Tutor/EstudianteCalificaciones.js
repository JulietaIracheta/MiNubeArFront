import React, { useState, useEffect } from "react";
import { Table } from 'reactstrap';
import { PersonCircle } from "react-bootstrap-icons";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import "../../assets/css/css-tutor.css";
import GetEstudiante from "../../services/estudiantes/getEstudiante";
import Sidebar from "../Sidebar";
import NavTutor from './NavTutor';
import {SidebarDataTutor} from '../sideBar/SidebarDataTutor';

export default function EstudianteCalificaciones() {
  // const [estudiante, SetEstudiante] = useState([]);
  // const [estudiante2, SetEstudiante2] = useState([]);
  // const id = 1;
  // const id2 = 2;
  // useEffect(
  //   function () {
  //     GetEstudiante(id).then((estudiante) => SetEstudiante(estudiante));
  //     GetEstudiante(id2).then((estudiante2) => SetEstudiante2(estudiante2));
  //     console.log(estudiante);
  //   },
  //   [id]
  // );


  return (
    <div>
      <NavTutor></NavTutor>
      <div className="d-flex mt-1 borde-tutor">
        <Sidebar data={SidebarDataTutor}/>
        <div className="container-fluid mt-2 pl-5">
          <h2 className="font-weight-bold colorTut">Calificaciones</h2>
          <hr className="hr-colorTut" />
          <div className="row mt-5">
            {/* <div className="container"> */}
                {/* <div className="row pl-3"> */}
                  <Table striped responsive className="mb-5">
                    <thead>
                      <tr>
                        <th colspan="4" className="colorTut">Lorenzo Acevedo</th>
                        <th colspan="1" className="colorTut">2020</th>
                      </tr>
                      <tr>
                        <th>Materia</th>
                        <th>1 Trimestre</th>
                        <th>2 Trimestre</th>
                        <th>3 Trimestre</th>
                        <th>Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">Matemáticas</td>
                        <td>Sobresaliente</td>
                        <td>Muy bien</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td scope="row">Literatura</td>
                        <td>Sobresaliente</td>
                        <td>Sobresaliente</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td scope="row">Ciencias Sociales</td>
                        <td>Buena</td>
                        <td>Sobresaliente</td>
                        <td>Sobresaliente</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td scope="row">Ciencias Naturales</td>
                        <td>Muy Bien</td>
                        <td>Muy Bien</td>
                        <td>Sobresaliente</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td scope="row">Música</td>
                        <td>Sobresaliente</td>
                        <td>Sobresaliente</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table striped responsive className="mb-5 mt-3">
                    <thead>
                      <tr>
                        <th colspan="4" className="colorTut">Maria Fernández</th>
                        <th colspan="1" className="colorTut">2020</th>
                      </tr>
                      <tr>
                        <th>Materia</th>
                        <th>1 Trimestre</th>
                        <th>2 Trimestre</th>
                        <th>3 Trimestre</th>
                        <th>Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">Matemáticas</td>
                        <td>Sobresaliente</td>
                        <td>Muy bien</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td scope="row">Literatura</td>
                        <td>Sobresaliente</td>
                        <td>Sobresaliente</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td scope="row">Ciencias Sociales</td>
                        <td>Buena</td>
                        <td>Sobresaliente</td>
                        <td>Sobresaliente</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td scope="row">Ciencias Naturales</td>
                        <td>Muy Bien</td>
                        <td>Muy Bien</td>
                        <td>Sobresaliente</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td scope="row">Música</td>
                        <td>Sobresaliente</td>
                        <td>Sobresaliente</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </Table>
                {/* </div> */}
            {/* </div> */}
          </div>

          <div>
          </div>
        </div>
      </div>

    </div>
  );
}
