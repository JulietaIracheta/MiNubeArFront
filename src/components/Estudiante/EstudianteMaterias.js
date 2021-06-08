import React, { useState, useEffect } from "react";
import { Fragment } from "react";
//import {store} from '../../actions/store'
import { Cookies } from 'react-cookie';
import axios from "axios";

import MateriasMocks from "./MateriasMocks";
import Encabezado from "./Encabezado.js";
import CardMateria from "./CardMateria";
import { Grid } from "@material-ui/core";

//import getMaterias from "../../services/estudiantes/getMaterias"

const baseUrl = "http://localhost:60671/api/"

const EstudianteMaterias = (params) => {
  const cookie = new Cookies();
  const cookiesEmail = cookie.get('email');
  const cookiesNombre = cookie.get('nombreEstudiante');

  let listMaterias = [];

  const url = baseUrl + 'usuario/materias?email=' + cookiesEmail;

  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
     const result = axios.get(url)
            .then(response => {
                // handle success
                console.log("getMaterias: ");
                console.log(response);                                              
                
                setMaterias(response.data);
                setLoading(true);

            }).catch(error => {
                console.log("getMateriasError: ");
                console.log(error);
            });          
  }, [])

  if (loading) {
    try {
      listMaterias = materias.map((materia, key) => (
        <CardMateria nombre={materia.nombre} icon={materia.icon} key={key}/>
      ));
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Fragment>
      <Encabezado nombre={cookiesNombre} />      
      <Grid container spacing={3}>
        { loading ? (listMaterias) : "LOADING ..."}
      </Grid>      
    </Fragment>
  );
};

export default EstudianteMaterias;
