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
        <h3 className="tituloadmin tituloEstudiante mb-4">Juegos</h3>
            <div className="juegos"> 
            <Link to='/estudiante/juegos/2048'><img src={j2048} className="mr-4"/></Link>
            
            <Link to='/estudiante/juegos/ahorcado'><img src={Ahorcado} className="mr-4"/></Link>
            </div>
            <div className="juegos">
            <Link to='/estudiante/juegos/tateti'><img src={Tateti} className="mr-4"/></Link>
            <Link to='/estudiante/juegos/sudoku'><img src={Sudoku} className="mr-4"/></Link>
          </div>
          </div>
        </div>
      </div>
  );
  }

export default Gamificacion;