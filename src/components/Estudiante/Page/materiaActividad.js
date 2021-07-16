import React, { useState, useEffect } from "react";
import Encabezado from "../Encabezado";
//import Sidebar from '../Sidebar';
import NavEstudiante from "../NavEstudiante";
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ActividadContenido from "../ActividadContenido";
import VideoContenido from "../VideoContenido";
import '../../Actividades/actividades.css';
import Sidebar from "../../Sidebar";
import { SidebarDataEstudiante } from "../../sideBar/SidebarDataEstudiante";
import { Cookies } from 'react-cookie';
import BotonVolver from '../../BotonVolver/botonVolver';

const baseUrl = "http://localhost:60671/api/"

const MateriaActividad = ({ match }) => {

  const idMateria = match.params.id;
  const unidad = match.params.unidad;
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  const urlActividades = baseUrl + `Actividades/getActidades/${idMateria}/${unidad}` + "?jwt=" + jwt;
  const urlMaterias = baseUrl + `Materias/${idMateria}`;

  const [actividades, setActividades] = useState([]);
  const [materia, setMateria] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stateAct, setStateAct] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch(urlActividades, {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      setActividades(content);
      console.log(content);

    })();
  }, []);
  const [ac, setAct] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch(urlMaterias, {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const { nombre } = await response.json();

      setMateria(nombre);
      setLoading(true);
    })();
  }, []);

  return (
    <div>

      <NavEstudiante />
      <div className="flex">
        <Sidebar data={SidebarDataEstudiante} />
        <div className="content">
          <div className="w-100 d-flex align-items-center">
            <BotonVolver ruta={"/estudiante/materias/" + idMateria} />
            <Encabezado className="w-100" texto={materia + " - Contenido de la unidad " + unidad} />
          </div>
          <Router>
            <div className="text-right">
              <Link className="btn btn-outline-dark mr-2"
                to={`/estudiante/materias/${idMateria}/${unidad}/video`}>Clase grabada</Link>
              {ac ?
                <Link className="btn btn-outline-dark mr-2"
                  to={`/estudiante/materias/${idMateria}/${unidad}/actividad`}>Actividad</Link>
                :
                ""
              }
            </div>
            <Switch>
              <Route path={`/estudiante/materias/${idMateria}/${unidad}/video`}>
                <VideoContenido idMateria={idMateria} contenido={unidad} setAct={setAct} />
              </Route>

              <Route path={`/estudiante/materias/${idMateria}/${unidad}/actividad`}>
                <ActividadContenido titulo={actividades[0]?.titulo} unidad={unidad}
                  idActividad={actividades[0]?.idActividad} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  )
}

export default MateriaActividad;
