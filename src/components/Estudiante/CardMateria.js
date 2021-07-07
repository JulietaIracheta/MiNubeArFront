import React, { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
// Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";
import "../../assets/css/fontawesome-all.css"
import ButtonBase from '@material-ui/core/ButtonBase';
import ContenidoPorMateria from "../Docente/ContenidoPorMateria";
import { Link } from "react-router-dom";

export default function CardMateria(props, key) {

  const [us, setUs] = useState(false);


  return (
    <>
      <Grid item xs={12} md={6} lg={4} spacing={4}>
        <Card key={key}>
          <CardActionArea className=
            {props.class ? "card-materia-docente" : "card-materia-estudiante"}>
            <CardContent>
              <h4>{props.nombre}</h4>
              {props.idCurso ?
                <Link to={"/docente/" + props.idCurso + "/" + props.idMateria + "/contenido"} class="text-dark" onClick={() => { setUs(true) }}>
                  <i className={"icon-mat fas fa-3x fa-" + props.icon}></i>
                </Link>
                : <i className={"icon-mat fas fa-3x fa-" + props.icon}></i>}

            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}
