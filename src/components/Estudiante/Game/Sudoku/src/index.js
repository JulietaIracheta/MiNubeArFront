import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './App';
import NavEstudiante from "../../../NavEstudiante";
import Sidebar from "../../../../Sidebar";
import { SidebarDataEstudiante } from "../../../../sideBar/SidebarDataEstudiante";

const finalCreateStore = compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(rootReducer);

const Index = () =>{

return(
	 <div>
      <NavEstudiante />
      <div className="flex">
          <Sidebar data={SidebarDataEstudiante} />
          <div className="rootSudoku">
	<App store={store} />
	</div>
	</div>
</div>
	);
}

export default Index;