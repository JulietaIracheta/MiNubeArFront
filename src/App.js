import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Estudiante from './components/Estudiante/Page/index';
import Docente from './components/Docente/Page/index.js';
import EstudiantesAsignados from './components/Estudiante/EstudiantesAsignados';
import PerfilEstudiante from './components/Estudiante/PerfilEstudiante';
import Rol from './components/Rol';
import Registro from './components/Registro';

function App() {
   


  return (
    <Router>
      <Switch>
      <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/registro' exact component={Registro} />
        <Route path='/rol' exact component={Rol} />
       
        <Route path='/docente/estudiantesAsignados' exact component={EstudiantesAsignados} />        
        <Route path='/estudiante/:id' exact component={PerfilEstudiante}></Route>
      </Switch>
    </Router>

  );
}

export default App;
