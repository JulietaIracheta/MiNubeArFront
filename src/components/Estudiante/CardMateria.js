import React from "react";
import { BrowserRouter as Router} from 'react-router-dom';
// Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";
import SvgIcon from '@material-ui/core/SvgIcon';
import { Display } from "react-bootstrap-icons";
import "../../assets/css/fontawesome-all.css"

export default function CardMateria(props,key) {
  return (
    <Grid item xs={12} md={6} lg={4} spacing={4} >
        <Card component={Router} to='#' key={key}>
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
