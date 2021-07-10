import React, { useState, useEffect } from "react";
import Encabezado from "../Encabezado";
import Sidebar from '../Sidebar';
import NavEstudiante from "../NavEstudiante";
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import ActividadContenido from "../ActividadContenido";
import VideoContenido from "../VideoContenido";
import '../../Actividades/actividades.css';

const baseUrl = "http://localhost:60671/api/"

const MateriaActividad = ({ match }) => {  

    const idMateria = match.params.id;
    const unidad = match.params.unidad;

    const urlActividades = baseUrl + `Actividades/getActidades/${idMateria}/${unidad}`;
    const urlMaterias= baseUrl + `Materias/${idMateria}`;

   const [actividades, setActividades] = useState([]);
   const [materia, setMateria] = useState([]);
   const [loading, setLoading] = useState(false);

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
  },[]);

  useEffect(() => {
    (async () => {
      const response = await fetch(urlMaterias, {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
  
      const {nombre} = await response.json();    
  
      setMateria(nombre);
      setLoading(true);
    })();
  },[]);

    return (
        <div>
            <NavEstudiante />
            <div className="flex">
                <Sidebar />               
                <Router>
                    <div className="content">                      
                        <Encabezado texto={ materia + " - Contenido de la unidad " + unidad }/>
                        <div className="text-right">
                            <Link className="btn btn-outline-dark mr-2" 
                                to={`/estudiante/materias/${idMateria}/${unidad}/video`}>Clase grabada</Link>
                            <Link className="btn btn-outline-dark mr-2" 
                                to={`/estudiante/materias/${idMateria}/${unidad}/actividad`}>Actividad</Link>
                        </div>
                        <Switch>                        
                        <Route path={`/estudiante/materias/${idMateria}/${unidad}/video`}>
                            <VideoContenido />
                        </Route>
                        <Route path={`/estudiante/materias/${idMateria}/${unidad}/actividad`}>
                            <ActividadContenido titulo={actividades[0]?.titulo} 
                                idActividad={actividades[0]?.idActividad}/>
                        </Route>
                    </Switch>
                    </div>               
                </Router>
            </div>
        </div>
    )
}

export default MateriaActividad;
