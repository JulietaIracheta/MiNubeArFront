import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Estudiante from './components/Estudiante';
import Docente from './components/Docente';


function App() {
  return (
    <Router>
      <Switch>
      <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/estudiante' exact component={Estudiante} />
        <Route path='/docente' exact component={Docente} />        
      </Switch>
    </Router>

  );
}

export default App;
