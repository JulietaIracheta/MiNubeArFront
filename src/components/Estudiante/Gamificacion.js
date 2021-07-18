import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { SidebarDataEstudiante } from "../sideBar/SidebarDataEstudiante";
import NavEstudiante from './NavEstudiante'
import j2048 from '../../assets/2048.png' 
import Ahorcado from '../../assets/ahorcado.jpg' 
import Tateti from '../../assets/tateti.jpg' 
import Sudoku from '../../assets/sudoku.jpg' 


const Gamificacion = () => {

    return (
    <div>
        <NavEstudiante />
      <div className="d-flex mt-1 borde-tutor">
        <Sidebar data={SidebarDataEstudiante}/>
        <div className="container mt-2">
            <div className=""> 
            <Link to='2048'><img src={j2048}/></Link>
            
            <Link to='ahorcado'><img src={Ahorcado}/></Link>
            </div>
            <div className="">
            <Link to='tateti'><img src={Tateti}/></Link>
            <Link to='sudoku'><img src={Sudoku}/></Link>
          </div>
          </div>
        </div>
      </div>
  );
  }

export default Gamificacion;