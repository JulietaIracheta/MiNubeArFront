import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Estudiante from './components/Estudiante/Page/index';
import Docente from './components/Docente/Page/index.js';
import EstudiantesAsignados from './components/Estudiante/EstudiantesAsignados';
import PerfilEstudiante from './components/Estudiante/PerfilEstudiante';
import CursosAsignadosDocente from './components/Docente/CursosAsignadosDocente';
import Registro from './components/Registro/Registro';
import Rol from './components/Rol';
import Tutor from './components/Tutor/Page/index.js';
import ActividadEstudiante from './components/Estudiante/ActividadEstudiante/ActividadEstudiante';

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/registro' exact component={Registro} />
        <Route path='/rol' exact component={Rol} />     
        <Route path='/estudiante' exact component={Estudiante} />
        <Route path='/docente' exact component={Docente} /> 
        <Route path='/tutor' exact component={Tutor} /> 
        <Route path='/docente/estudiantesAsignados' exact component={EstudiantesAsignados} />        
        <Route path='/estudiante/:id' exact component={PerfilEstudiante}/>
        <Route path='/curso/:id' exact component={CursosAsignadosDocente}/>
        <Route path='/docente/ActividadEstudiante' exact component={ActividadEstudiante}/>
        <Route path='/tutor/ActividadEstudiante' exact component={ActividadEstudiante}/>

      </Switch>
    </Router>

  );
}

export default App;
