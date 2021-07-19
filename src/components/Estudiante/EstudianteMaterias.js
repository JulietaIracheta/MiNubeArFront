import React, { useState, useEffect } from "react";
import { Fragment } from "react";
//import {store} from '../../actions/store'

import MateriasMocks from "./MateriasMocks";
import Encabezado from "./Encabezado.js";
import CardMateria from "./CardMateria";
import { Grid } from "@material-ui/core";
import { Cookies, useCookies } from 'react-cookie';
import url from "../../url"
//import getMaterias from "../../services/estudiantes/getMaterias"

const baseUrl =  `${url.url}/api/`

const EstudianteMaterias = (props) => {
  
  let listMaterias = [];
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  const url = baseUrl + 'estudiante/materias?jwt='+jwt;

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
                class="card-materia-estudiante"
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
      <Encabezado texto={"Bienvenido "+props.nombre} />      
      <Grid container spacing={3}>
        { loading ? (listMaterias) : "LOADING ..."}
      </Grid>      
    </Fragment>
  );
};

export default EstudianteMaterias;
