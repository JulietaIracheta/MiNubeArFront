import React from "react";
import { BrowserRouter as Router, Link} from 'react-router-dom';
// Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";

import "../../assets/css/fontawesome-all.css"

export default function CardMateria(props) {
  return (
    <Grid item xs={12} md={6} lg={4} spacing={4} >
        <Card component={Link} to={'estudiante/materias/'+props.idMateria} key={props.idMateria}>
            <CardActionArea>
              <CardContent >
                <h4>{props.nombre}</h4>
                <i className={"icon-mat fas fa-3x fa-"+ props.icon}></i>
              </CardContent>               
        </CardActionArea>
        </Card>
    </Grid>
  );
}
