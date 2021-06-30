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
import ChatMiNube from './components/Chat/ChatMiNube'
import recPassword from './components/recPassword';
import MateriasTutorEstudiante from './components/Tutor/materiasTutorEstudiante';
import ContenidoMateria from './components/Tutor/contenidoMateria';
import CalendarioTut from './components/Calendario/CalendarioTut';
import Unidad1CienciasSociales from './components/Tutor/Contenido/unidad1-CienciasSociales';
import CrearActividad from './components/Actividades/crearActividad';
import Calificaciones from './components/Estudiante/Calificaciones';
import UnidadPorMateria from './components/Docente/UnidadPorMateria';
import Chat from './components/Chat2/Chat'
import CargarCalificaciones from './components/Docente/CargarCalificaciones';
import CalificacionesTutor from './components/Tutor/CalificacionesTutor';
import AsignarMateriasACurso from './components/Registro/AsignarMateriasACurso';
import AsignarCursosAInstituciones from './components/Registro/AsignarCursoAInstitucion';
import NotFound from '../src/NotFound';

function App() {

  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/usuarios' exact component={Usuario} />
        <Route path='/instituciones' exact component={Institucion} />     
        <Route path='/video' exact component={VideoConference} />   
        <Route path='/rol' exact component={Rol} /> 
        <Route path='/chat' exact component={Chat} />
        <Route path='/chatHub' exact component={ChatMiNube} />
        <Route path='/calificaciones' exact component={Calificaciones} />
        <Route path='/calificacionesTutor' exact component={CalificacionesTutor} />
        <Route path='/recuperarPassword' exact component={recPassword} />     
        <Route path='/estudiante/:id' exact component={PerfilEstudiante}/>
        <Route path='/actividades/:idActividad' exact component={Actividades}/>
        <Route path='/crearactividades' exact component={CrearActividad}/>
        <Route path='/pizarra' exact component={Whiteboard} />
        <Route path='/calendario' exact component={Calendario} />  
        <Route path='/materiasTutorEstudiante/:idUsuario' exact component={MateriasTutorEstudiante} />
        <Route path='/tutor/contenidoMateria' exact component={ContenidoMateria} />
        <Route path='/tutor/contenidoMateria/1' exact component={Unidad1CienciasSociales} />
        <Route path='/calendarioestudiante' exact component={CalendarioEst} />  
        <Route path='/calendariotutor' exact component={CalendarioTut} />     
        <Route path='/cursos/' exact component={Curso}/>
        <Route path='/cursosInstitucion/' exact component={CursoInstitucion}/>
        <Route path='/materias/' exact component={Materia}/>
        <Route path='/asignarMaterias/' exact component={AsignarMateriasACurso}/>
        <Route path='/asignarCursos/' exact component={AsignarCursosAInstituciones}/>
        <Route path='/curso/:inst/:curso/:idCurso' exact component={CursosAsignadosDocente}/>
        <Route path='/tutor/ActividadEstudiante/:nombre/:id' exact component={ActividadEstudiante}/>
        <Route path='/tutor/estudiantesasignados' exact component={EstudiantesTutor}/>
        <Route path='/docente/:cursoId/:materiaId/contenido' exact component={contenidoPorMateria} /> 
        <Route path='/docente/cargarCalificaciones' exact component={CargarCalificaciones} />
        <Route path="/unidad/:cursoId/:materiaId" exact component={UnidadPorMateria} /> 
        <Route path="*" render={NotFound} />     
      </Switch>
    </Router>
    </Provider>


  );
}

export default App;
