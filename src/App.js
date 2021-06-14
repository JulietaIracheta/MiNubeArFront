import './App.css';
import {useState} from 'react'
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PerfilEstudiante from './components/Estudiante/PerfilEstudiante';
import CursosAsignadosDocente from './components/Docente/CursosAsignadosDocente';
import Rol from './components/Rol';
import ActividadEstudiante from './components/Estudiante/ActividadEstudiante/ActividadEstudiante';
import Usuario from './components/Registro/Usuario';
import Institucion from './components/Registro/Institucion';
import { Provider } from 'react-redux'
import {store} from './actions/store'
import VideoConference from './components/Registro/VideoConference';
import EstudiantesTutor from './components/Tutor/EstudiantesTutor';
import contenidoPorMateria from './components/Docente/ContenidoPorMateria';
import Calendario from './components/Calendario/Calendario'
import CalendarioEst from './components/CalendarioEst/Calendario/CalendarioEst'
import Curso from './components/Registro/Curso';
import Materia from './components/Registro/Materia';
import CursoInstitucion from './components/Registro/CursoInstitucion';
import Actividades from './components/Actividades/Actividades'
import Whiteboard from './components/Pizarra/index';
import ChatMiNube from './components/Chat/ChatMiNube'
import recPassword from './components/recPassword';


function App() {

    const user = window.localStorage.getItem('logged')
  return (

    <Provider store={store}>
    <Router>
      <Switch>
      <Route path='/' exact component={Login} />
      {user === 'true' ? <Redirect from='/login' to='/rol'></Redirect>:    
        <Route path='/login' exact component={Login} />}
        <Route path='/usuarios' exact component={Usuario} />
        <Route path='/instituciones' exact component={Institucion} />     
        <Route path='/video' exact component={VideoConference} />   
        {user === 'false' ? <Redirect from='/rol' to='/login'></Redirect>:    
        <Route path='/rol' exact component={Rol} />  }
        <Route path='/chatHub' exact component={ChatMiNube} />
        <Route path='/recuperarPassword' exact component={recPassword} />     
        <Route path='/estudiante/:id' exact component={PerfilEstudiante}/>
        <Route path='/actividades' exact component={Actividades}/>
        <Route path='/pizarra' exact component={Whiteboard} />
        <Route path='/calendario' exact component={Calendario} />  
        <Route path='/calendarioestudiante' exact component={CalendarioEst} />     
        <Route path='/cursos/' exact component={Curso}/>
        <Route path='/cursosInstitucion/' exact component={CursoInstitucion}/>
        <Route path='/materias/' exact component={Materia}/>
        <Route path='/curso/:inst/:curso/:idCurso' exact component={CursosAsignadosDocente}/>
        <Route path='/tutor/ActividadEstudiante' exact component={ActividadEstudiante}/>
        <Route path='/tutor/EstudiantesAsignados' exact component={EstudiantesTutor}/>
        <Route path='/docente/:cursoId/:materiaId/contenido' exact component={contenidoPorMateria} />        
      </Switch>
    </Router>
    </Provider>

  );
}

export default App;
