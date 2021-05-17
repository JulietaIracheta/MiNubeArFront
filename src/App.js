import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EstudiantesAsignados from './components/Estudiante/EstudiantesAsignados';
import PerfilEstudiante from './components/Estudiante/PerfilEstudiante';
import CursosAsignadosDocente from './components/Docente/CursosAsignadosDocente';
import Rol from './components/Rol';
import Tutor from './components/Tutor/Page/index.js';
import ActividadEstudiante from './components/Estudiante/ActividadEstudiante/ActividadEstudiante';

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/rol' exact component={Rol} />     
        <Route path='/docente/estudiantesAsignados' exact component={EstudiantesAsignados} />        
        <Route path='/estudiante/:id' exact component={PerfilEstudiante}/>
        <Route path='/curso/:id' exact component={CursosAsignadosDocente}/>
        <Route path='/docente/ActividadEstudiante' exact component={ActividadEstudiante}/>
        <Route path='/tutor/ActividadEstudiante' exact component={ActividadEstudiante}/>CambioDiseño
      </Switch>
    </Router>

  );
}

export default App;
