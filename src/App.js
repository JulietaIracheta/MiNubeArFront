import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EstudiantesAsignados from './components/Estudiante/EstudiantesAsignados';
import PerfilEstudiante from './components/Estudiante/PerfilEstudiante';
import CursosAsignadosDocente from './components/Docente/CursosAsignadosDocente';
import Rol from './components/Rol';
import ActividadEstudiante from './components/Estudiante/ActividadEstudiante/ActividadEstudiante';
import Usuario from './components/Registro/Usuario';
import Institucion from './components/Registro/Institucion';
import { Provider } from 'react-redux'
import {store} from './actions/store'
import VideoConference from './components/Registro/VideoConference';
import MateriaUnidades, { materiaUnidad } from './components/Estudiante/Page/materiaUnidad';
import Estudiante from './components/Estudiante/Estudiante';
import { materiaActividad } from './components/Estudiante/Page/materiaActividad';

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
        <Route path='/docente/estudiantesAsignados' exact component={EstudiantesAsignados} />        
        <Route path='/docente/estudiante/:id' exact component={PerfilEstudiante}/>
        <Route path='/curso/:id' exact component={CursosAsignadosDocente}/>
        <Route path='/docente/ActividadEstudiante' exact component={ActividadEstudiante}/>
        <Route path='/tutor/ActividadEstudiante' exact component={ActividadEstudiante}/>
        <Route path='/Estuduante' exact component={Estudiante}/>
        <Route path='/estudiante/materias/:id' exact component={materiaUnidad}/>
        <Route path='/estudiante/materias/:id/:unidad' exact component={materiaActividad}/>
        <Route path='*'>
          <h1>404 Not found</h1>
        </Route>
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
