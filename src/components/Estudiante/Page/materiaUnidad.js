import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Sidebar from "../Sidebar";
import NavEstudiante from "../NavEstudiante";
import EstudianteMaterias from "../EstudianteMaterias";
import MateriasUnidades from "../MateriasUnidades";
import "../../../assets/css/css-estudiante.css"

export const materiaUnidad = ({ match }) => {
    const id = match.params.id;

  return (
    <div>
      <NavEstudiante />
      <div className="flex">
        <Sidebar />
        <div className="content">
           <MateriasUnidades id={id} />
        </div>
      </div>
    </div>
  );
}
