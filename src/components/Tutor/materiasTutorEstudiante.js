import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import axios from "axios";
import CardMateria from "./CardMateria";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import NavTutor from './NavTutor'
import Sidebar from "../Sidebar";
import {SidebarDataTutor} from '../sideBar/SidebarDataTutor';
import url from "../../url"


const baseUrl =  `${url.url}/api/`

const MateriasTutorEstudiante = (props) => {
  let listMaterias = [];
    const {idUsuario} =  props.match.params;
  const url = baseUrl + 'tutor/materias?id=' + idUsuario;

  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
      
     const result = axios.get(url)
            .then(response => {
                // handle success
                
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
        <CardMateria key={key} nombre={materia.nombre} icon={materia.icon} key={key} id={materia.idMateria} idUsuario={idUsuario}/>
      ));
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
      <div>
      <NavTutor />
      
        <div className="d-flex mt-1 borde-tutor">
      <Sidebar data={SidebarDataTutor}/>
      <div className="container mt-2">
        <h2 className="font-weight-bold colorTut">Mis Estudiantes</h2>
        <hr className="hr-colorTut" />
        <div className="row w-100">
    <Fragment>      
      <Grid container spacing={3}>
        { loading ? (listMaterias) : "LOADING ..."}
      </Grid>      
    </Fragment>
            
    </div>

<div>
</div>
</div>
</div>

</div>
  );
};

export default MateriasTutorEstudiante;
