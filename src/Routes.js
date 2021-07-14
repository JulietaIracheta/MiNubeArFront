import './App.css';
import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PerfilEstudiante from './components/Estudiante/PerfilEstudiante';
import CursosAsignadosDocente from './components/Docente/CursosAsignadosDocente';
import Rol from './components/Rol';
import ActividadEstudiante from './components/Tutor/ActividadEstudiante/ActividadEstudiante';
import Usuario from './components/Registro/Usuario';
import Institucion from './components/Registro/Institucion';
import { Provider } from 'react-redux'
import {store} from './actions/store'
import VideoConference from './components/Registro/VideoConference';
import EstudiantesTutor from './components/Tutor/EstudiantesTutor';
import contenidoPorMateria from './components/Docente/ContenidoPorMateria';
import Calendario from './components/Calendario/Calendario'
import CalendarioEst from './components/Calendario/CalendarioEst'
import Curso from './components/Registro/Curso';
import Materia from './components/Registro/Materia';

import CursoInstitucion from './components/Registro/CursoInstitucion';
import Actividades from './components/Actividades/Actividades'
import Whiteboard from './components/Pizarra/index';
import recPassword from './components/recPassword';
import ComunicadosEstudiante from './components/Estudiante/ComunicadosEstudiante';
import chatNotificacion from './components/Notificaciones/chatnotificacion';
import chatnotificacionDocente from './components/Notificaciones/chatnotificacionDocente';
import MateriaUnidad from './components/Estudiante/Page/materiaUnidad';
import Estudiante from './components/Estudiante/Page';
import MateriaActividad from './components/Estudiante/Page/materiaActividad';
import MateriasTutorEstudiante from './components/Tutor/materiasTutorEstudiante';
import ContenidoMateria from './components/Tutor/contenidoMateria';
import CalendarioTut from './components/Calendario/CalendarioTut';
import Unidad1CienciasSociales from './components/Tutor/Contenido/unidad1-CienciasSociales';
import CrearActividad from './components/Actividades/crearActividad';
import Calificaciones from './components/Estudiante/Calificaciones';
import UnidadPorMateria from './components/Docente/UnidadPorMateria';
import CargarCalificaciones from './components/Docente/CargarCalificaciones';
import CalificacionesTutor from './components/Tutor/CalificacionesTutor';
import AsignarMateriasACurso from './components/Registro/AsignarMateriasACurso';
import AsignarCursosAInstituciones from './components/Registro/AsignarCursoAInstitucion';
import ComunicadosTutor from './components/Tutor/Comunicados';
import NotFound from '../src/NotFound';
import CuentaEstudiante from './components/Estudiante/Cuenta';
import CuentaDocente from './components/Docente/Cuenta';
import InformeEstudiante from './components/Estudiante/Informe';
import { Cookies, useCookies } from "react-cookie";
import TrayectoriaEscolar from './components/Estudiante/TrayectoriaEscolar';
import CargarInforme2  from './components/Docente/Informe/cargarInforme';
import AsignarEstudiantesACursos from './components/Registro/AsignarEstudiantesACurso';
import CrearInforme from './components/Docente/Informe/CargarInforme2';
import TrayectoriaAcademica from './components/Estudiante/trayectoriaAcademica';
import AsignarEstudiantes from './components/Curso/AsignarEstudiantes'
import ContenidosHistoricos from './components/Estudiante/ContenidosHistoricos';
import Trayectoria from './components/Estudiante/Trayectoria';

const MyRoute = (props)=>(
    isAuthenticated()
      ?<Route {...props} />
      :<Redirect to="/login" />
  )
  const isAuthenticated = ()=>{
    const cookieJwt = new Cookies();
    const jwt = cookieJwt.get('jwt');
  
    if(jwt)
      return true;
    else
      return false;
  };

const cookieRol = new Cookies();
const RolId = cookieRol.get('rolId')
const cookieJwt = new Cookies();
const jwt = cookieJwt.get('jwt');
const Routes = () =>{
  const [rol, setRol] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:60671/api/rol/getRolByUsuario?jwt="+jwt, {
        headers: { "Content-type": "application/json" },
        credentials: "include"
      });

      const content = await response.json();  
      
      console.log( RolId );

      setRol(content);

})();
  },[]);


return(
    
<Router>
<Switch>
                                        
{RolId === '4' &&<MyRoute path='/usuarios' exact component={Usuario}></MyRoute>}
  <Route path='/' exact component={Login} />
  <Route path='/login' exact component={Login} />
  <Route path='/recuperarPassword' exact component={recPassword} />     
  {RolId === '4' &&<MyRoute path='/instituciones' exact component={Institucion} />}     
  {RolId === '2' &&<MyRoute path='/video' exact component={VideoConference} />   }
  <MyRoute path='/rol' exact component={Rol} /> 
  {RolId === '2' && <MyRoute path='/perfilEstudiante/:id' exact component={PerfilEstudiante}/>}
  {RolId === '1' && <MyRoute path='/actividades/:Unidad' exact component={Actividades}/>}
  {RolId === '1' && <MyRoute path='/calificaciones' exact component={Calificaciones} />}
  {RolId === '3' &&  <MyRoute path='/calificacionesTutor' exact component={CalificacionesTutor} />}
  {RolId === '1' && <MyRoute path='/actividades/:idActividad' exact component={Actividades}/>}
  {RolId === '2' && <MyRoute path='/crearactividades/:idContenido' exact component={CrearActividad}/>}
  {RolId === '2' && <MyRoute path='/pizarra' exact component={Whiteboard} />}
  {RolId === '2' &&  <MyRoute path='/calendario' exact component={Calendario} />  }
  {RolId === '3' && <MyRoute path='/materiasTutorEstudiante/:idUsuario' exact component={MateriasTutorEstudiante} />}
  {RolId === '3' && <MyRoute path='/tutor/contenidoMateria' exact component={ContenidoMateria} />}
  {RolId === '3' && <MyRoute path='/tutor/contenidoMateria/1' exact component={Unidad1CienciasSociales} />}
  {RolId === '1' && <MyRoute path='/estudiante/calendario' exact component={CalendarioEst} />}  
  {RolId === '3' && <MyRoute path='/calendariotutor' exact component={CalendarioTut} />}     
  {RolId === '4' && <MyRoute path='/cursos/' exact component={Curso}/>}
  {RolId === '4' && <MyRoute path='/cursosInstitucion/' exact component={CursoInstitucion}/>}
  {RolId === '4' && <MyRoute path='/materias/' exact component={Materia}/>}
  {RolId === '4' && <MyRoute path='/asignarMaterias/' exact component={AsignarMateriasACurso}/>}
  {RolId === '4' && <MyRoute path='/asignarCursos/' exact component={AsignarCursosAInstituciones}/>}
  {RolId === '4' && <MyRoute path='/asignarEstudiantes/' exact component={AsignarEstudiantesACursos}/>}
  {RolId === '2' &&<MyRoute path='/curso/:inst/:curso/:idCurso' exact component={CursosAsignadosDocente}/>}
  {RolId === '3' && <MyRoute path='/tutor/ActividadEstudiante/:nombre/:id' exact component={ActividadEstudiante}/>}
  {RolId === '3' && <MyRoute path='/tutor/estudiantesasignados' exact component={EstudiantesTutor}/>}
  {RolId === '2' &&   <MyRoute path='/docente/:cursoId/:materiaId/contenido' exact component={contenidoPorMateria} /> }
  {RolId === '2' &&  <MyRoute path='/docente/cargarCalificaciones' exact component={CargarCalificaciones} />}
  {RolId === '1' && <MyRoute path="/unidad/:cursoId/:materiaId" exact component={UnidadPorMateria} /> }
  {RolId === '1' && <MyRoute path='/estudiante/comunicado' exact component={ComunicadosEstudiante} />}       
  {RolId === '1' && <MyRoute path='/estudiante/chat' exact component={chatNotificacion} />      } 
  {RolId === '2' &&  <MyRoute path='/docente/chat' exact component={chatnotificacionDocente} />}  
  {RolId === '3' && <MyRoute path='/tutor/comunicados' exact component={ComunicadosTutor} />}
  {RolId === '1' && <MyRoute path='/estudiante/cuenta' exact component={CuentaEstudiante} />}   
  {RolId === '2' &&  <MyRoute path='/docente/cuenta' exact component={CuentaDocente} />   }
  {RolId === '1' && <MyRoute path='/estudiante/trayectoria' exact component={Trayectoria} />}
  {RolId === '1' && <MyRoute path='/estudiante/informe' exact component={InformeEstudiante} />}
  {RolId === '2' &&  <MyRoute path='/docente/cargarInforme' exact component={CargarInforme2} />}
  {RolId === '2' &&  <MyRoute path='/docente/crearInforme' exact component={CrearInforme} />}
  {RolId === '4' && <MyRoute path='/trayectoriaAcademica' exact component={TrayectoriaAcademica} />}
  {RolId === '4' && <MyRoute path='/cursos/asignar_estudiante' exact component={AsignarEstudiantes} />   }
  {RolId === '1' && <Route path='/Estuduante' exact component={Estudiante}/>}
  {RolId === '1' && <Route path='/estudiante/materias/:id' exact component={MateriaUnidad}/>}
  {RolId === '1' && <Route path='/estudiante/materias/:id/:unidad/video' exact component={MateriaActividad}/>}
  {RolId === '1' && <Route path='/estudiante/contenidosHistoricos' exact component={ContenidosHistoricos}/>}
  <Route path="*" render={NotFound} />     
</Switch>
</Router>
)
}

export default Routes;