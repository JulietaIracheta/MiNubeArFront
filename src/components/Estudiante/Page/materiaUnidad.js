import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { SidebarDataEstudiante } from "../../sideBar/SidebarDataEstudiante";
import Sidebar from '../../Sidebar';
import NavEstudiante from "../NavEstudiante";
import EstudianteMaterias from "../EstudianteMaterias";
import MateriasUnidades from "../MateriasUnidades";
import "../../../assets/css/css-estudiante.css"


const MateriaUnidad = ({ match }) => {
    const id = match.params.id;

  return (
    <div>
      <NavEstudiante />
      <div className="flex">
      <Sidebar data={SidebarDataEstudiante}/>
        <div className="main w-100 pt-2">
           <MateriasUnidades id={id} />
        </div>
      </div>
    </div>
  );
}

export default MateriaUnidad;