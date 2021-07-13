import React, { useState } from "react";
import { BrowserRouter as Router, Link} from 'react-router-dom';
// Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";
import "../../assets/css/fontawesome-all.css"
function CardMateria(props, key) {
console.log(props);
  const enlace = props.class!=="docente" ? 'estudiante/materias/'+props.idMateria :"/docente/" + props.idCurso + "/" + props.idMateria + "/contenido";

  return (

    <Grid item xs={12} md={6} lg={4} spacing={4} >
        <Card component={Link} to={ enlace } key={key}>
            <CardActionArea className=
              {props.class ? "card-materia-docente" : "card-materia-estudiante"}>
              <CardContent >
                <h4>{props.nombre}</h4>
                <i className={"icon-mat fas fa-3x fa-"+ props.icon}></i>
              </CardContent>               
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default CardMateria;
