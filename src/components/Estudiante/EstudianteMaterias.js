import React, { useState, useEffect } from "react";
import { Fragment } from "react";
//import {store} from '../../actions/store'

import MateriasMocks from "./MateriasMocks";
import Encabezado from "./Encabezado.js";
import CardMateria from "./CardMateria";
import { Grid } from "@material-ui/core";

//import getMaterias from "../../services/estudiantes/getMaterias"

const baseUrl = "http://localhost:60671/api/"

const EstudianteMaterias = () => {
  
  let listMaterias = [];

  const url = baseUrl + 'estudiante/materias';

  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);        

useEffect(() => {
  (async () => {
    const response = await fetch(url, {
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    const content = await response.json();  
    
    console.log( content );

    setMaterias(content);
    setLoading(true);
})();
},[]);

  if (loading) {
    try {
      listMaterias = materias.map((materia) => (
        <CardMateria 
                nombre={materia.nombre} 
                icon={materia.icon}
                idMateria={materia.idMateria}      
                key={materia.idMateria}
        />
      ));
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Fragment>
      <Encabezado texto="Bienvenido" />      
      <Grid container spacing={3}>
        { loading ? (listMaterias) : "LOADING ..."}
      </Grid>      
    </Fragment>
  );
};

export default EstudianteMaterias;
