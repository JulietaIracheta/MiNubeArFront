import React, {Component} from 'react';
import './pizarra.css'
import WhiteBoard from './components/whiteBoard';
import Tools from './components/tools';
import History from './components/history';
import Sidebar from "../Estudiante/Sidebar";
import NavEstudiante from "../Estudiante/NavEstudiante";

export default class WhiteboardIndex extends Component {
    render() {
        return (
		<div>
        <NavEstudiante />
		<div className="flex">
        <Sidebar />
		<div id="main">
          <div id="container">
			<Tools/>
			<WhiteBoard />
		  </div>
			<History/>
	      </div>
		  </div>
       	  </div>        
		 );}}