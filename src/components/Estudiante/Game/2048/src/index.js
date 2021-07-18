import React from 'react';
import { render } from 'react-dom';
import Game from './Game';
import './index.css';
import NavEstudiante from "../../../NavEstudiante";
import Sidebar from "../../../../Sidebar";
import { SidebarDataEstudiante } from "../../../../sideBar/SidebarDataEstudiante";

const Index = () =>{

  return(
     <div>
        <NavEstudiante />
        <div className="flex">
            <Sidebar data={SidebarDataEstudiante} />
            <div className="container-fluid">
            <Game fieldSize={4} />,
    </div>
    </div>
  </div>
    );
  }
  
  export default Index;