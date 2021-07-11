import './App.css';
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
const app = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <MyRoute path='/usuarios' exact component={Usuario}></MyRoute>
        <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/recuperarPassword' exact component={recPassword} />     
        <MyRoute path='/instituciones' exact component={Institucion} />     
        <MyRoute path='/video' exact component={VideoConference} />   
        <MyRoute path='/rol' exact component={Rol} /> 
        <MyRoute path='/perfilEstudiante/:id' exact component={PerfilEstudiante}/>
        <MyRoute path='/actividades/:Unidad' exact component={Actividades}/>
        <MyRoute path='/calificaciones' exact component={Calificaciones} />
        <MyRoute path='/calificacionesTutor' exact component={CalificacionesTutor} />
        <MyRoute path='/actividades/:idActividad' exact component={Actividades}/>
        <MyRoute path='/crearactividades/:idContenido' exact component={CrearActividad}/>
        <MyRoute path='/pizarra' exact component={Whiteboard} />
        <MyRoute path='/calendario' exact component={Calendario} />  
        <MyRoute path='/materiasTutorEstudiante/:idUsuario' exact component={MateriasTutorEstudiante} />
        <MyRoute path='/tutor/contenidoMateria' exact component={ContenidoMateria} />
        <MyRoute path='/tutor/contenidoMateria/1' exact component={Unidad1CienciasSociales} />
        <MyRoute path='/estudiante/calendario' exact component={CalendarioEst} />  
        <MyRoute path='/calendariotutor' exact component={CalendarioTut} />     
        <MyRoute path='/cursos/' exact component={Curso}/>
        <MyRoute path='/cursosInstitucion/' exact component={CursoInstitucion}/>
        <MyRoute path='/materias/' exact component={Materia}/>
        <MyRoute path='/asignarMaterias/' exact component={AsignarMateriasACurso}/>
        <MyRoute path='/asignarCursos/' exact component={AsignarCursosAInstituciones}/>
        <MyRoute path='/asignarEstudiantes/' exact component={AsignarEstudiantesACursos}/>
        <MyRoute path='/curso/:inst/:curso/:idCurso' exact component={CursosAsignadosDocente}/>
        <MyRoute path='/tutor/ActividadEstudiante/:nombre/:id' exact component={ActividadEstudiante}/>
        <MyRoute path='/tutor/estudiantesasignados' exact component={EstudiantesTutor}/>
        <MyRoute path='/docente/:cursoId/:materiaId/contenido' exact component={contenidoPorMateria} /> 
        <MyRoute path='/docente/cargarCalificaciones' exact component={CargarCalificaciones} />
        <MyRoute path="/unidad/:cursoId/:materiaId" exact component={UnidadPorMateria} /> 
        <MyRoute path='/estudiante/comunicado' exact component={ComunicadosEstudiante} />       
        <MyRoute path='/estudiante/chat' exact component={chatNotificacion} />       
        <MyRoute path='/docente/chat' exact component={chatnotificacionDocente} />  
        <MyRoute path='/tutor/comunicados' exact component={ComunicadosTutor} />
        <MyRoute path='/estudiante/cuenta' exact component={CuentaEstudiante} />   
        <MyRoute path='/docente/cuenta' exact component={CuentaDocente} />   
        <MyRoute path='/estudiante/trayectoria' exact component={TrayectoriaEscolar} />
        <MyRoute path='/estudiante/informe' exact component={InformeEstudiante} />
        <MyRoute path='/docente/cargarInforme' exact component={CargarInforme2} />
        <MyRoute path='/docente/crearInforme' exact component={CrearInforme} />
        <MyRoute path='/trayectoriaAcademica' exact component={TrayectoriaAcademica} />
        <MyRoute path='/cursos/asignar_estudiante' exact component={AsignarEstudiantes} />   

        <Route path="*" render={NotFound} />     
      </Switch>
    </Router>
  </Provider>
);

export default app;