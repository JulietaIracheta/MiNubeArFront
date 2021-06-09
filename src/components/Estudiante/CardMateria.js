import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
// Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";
import "../../assets/css/fontawesome-all.css"
import { Link } from "@material-ui/core";
import ButtonBase from '@material-ui/core/ButtonBase';

export default function CardMateria(props, key) {
  return (
    <Grid item xs={12} md={6} lg={4} spacing={4}>
      <Card component={Router} to='#' key={key}>
        <CardActionArea className=
        {props.class ? "card-materia-docente" : "card-materia-estudiante"}>
          <CardContent>
            <h4>{props.nombre}</h4>
            <a href={props.class ? "/docente/1/1/contenido" : "#"} class="text-dark">
              <i className={"icon-mat fas fa-3x fa-" + props.icon}></i>
            </a>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
