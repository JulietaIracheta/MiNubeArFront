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
  const contenido = match.params.contenido;
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  const urlActividades = baseUrl + `Actividades/getActidades/${idMateria}/${contenido}` + "?jwt=" + jwt;
  const urlMaterias = baseUrl + `Materias/${idMateria}`;

  const [actividades, setActividades] = useState([]);
  const [materia, setMateria] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vioActividad, setVioActividad] = useState(false);
  console.log(match);
  useEffect(() => {
    (async () => {
      const response = await fetch(urlActividades, {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setActividades(content);
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
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:60671/api/contenido/"+contenido, {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const f= await response.json();
      setVioActividad(f.visto);

      if(!f.video){
        setVioActividad(true);
      }
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
            <Encabezado className="w-100" texto={materia + " - Contenido n°" + contenido} />
          </div>
          <Router>
            <div className="text-right">
              <Link className="btn btn-outline-dark mr-2"
                to={`/estudiante/materias/${idMateria}/${contenido}/video`}>Clase grabada</Link>
              {vioActividad ?
                <Link className="btn btn-outline-dark mr-2"
                  to={`/estudiante/materias/${idMateria}/${contenido}/actividad`}>Actividad</Link>
                :
                ""
              }
            </div>
            <Switch>
              <Route path={`/estudiante/materias/${idMateria}/${contenido}/video`}>
                <VideoContenido idMateria={idMateria} contenido={contenido} setAct={setVioActividad} />
              </Route>

              <Route path={`/estudiante/materias/${idMateria}/${contenido}/actividad`}>
                <ActividadContenido titulo={actividades[0]?.contenido} unidad={contenido}
                  idActividad={actividades[0]?.contenido} materia={idMateria}/>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  )
}

export default MateriaActividad;
