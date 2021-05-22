import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Estudiante from './components/Estudiante/Page/index';
import Docente from './components/Docente/Page/index.js';
import EstudiantesAsignados from './components/Estudiante/EstudiantesAsignados';
import PerfilEstudiante from './components/Estudiante/PerfilEstudiante';
import CursosAsignadosDocente from './components/Docente/CursosAsignadosDocente'
import DocenteComunicado from './components/Docente/DocenteComunicado';
import Instituciones from './components/Instituciones/Instituciones';
import InstitucionesEditar from './components/Instituciones/InstitucionesEditar';
import Cursos from './components/Admin/Cursos';
import CursosEditar from './components/Admin/CursosEditar'

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/estudiante' exact component={Estudiante} />
        <Route path='/docente' exact component={Docente} /> 
        <Route path='/docente/estudiantesAsignados' exact component={EstudiantesAsignados} />        
        <Route path='/estudiante/:id' exact component={PerfilEstudiante}/>
        <Route path='/curso/:id' exact component={CursosAsignadosDocente}/>
        <Route path='/docente/comunicados' exact component={DocenteComunicado}/>
        <Route path='/instituciones/admin' exact component={Instituciones}/>
        <Route path='/instituciones/admin_editar' exact component={InstitucionesEditar}/>
        <Route path='/admin/cursos' exact component={Cursos}/>
        <Route path='/admin/cursos_editar' exact component={CursosEditar}/>
      </Switch>
    </Router>

  );
}

export default App;
