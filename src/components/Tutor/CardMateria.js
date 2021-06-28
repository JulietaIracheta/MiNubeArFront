import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Material UI
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Grid, Link} from "@material-ui/core";
import "../../assets/css/fontawesome-all.css";

export default function CardMateria(props, key) {
const id = props.id;
const nombre = props.nombre
  return (
    <Grid item xs={12} md={6} lg={4} className="ml-4">
      <Card component={Router} to="#" key={key}>
        <CardActionArea className="card-materia-tutor">
          <CardContent>
            <h4>{props.nombre}</h4>
            
            <a href={`/tutor/ActividadEstudiante/${nombre}/${id}`} class="text-dark">
            <i className={"icon-mat fas fa-3x fa-" + props.icon}></i>
            </a>
          </CardContent>
         
        </CardActionArea>
      </Card>
    </Grid>
  );
}
