import React, {useState, useEffect} from 'react'
import NavEstudiante from '../Estudiante/NavEstudiante'
import Sidebar from '../Sidebar'
import {SidebarDataEstudiante} from '../sideBar/SidebarDataEstudiante'
import { Cookies } from 'react-cookie';

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  withStyles
} from "@material-ui/core";

const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top: "unset !important",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: 0,
    paddingTop: 0,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});



const Calificaciones = ({ classes, ...props }) => {
  const [boletin, setBoletin] = useState([]);
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  
  useEffect(async () => {
    const result = await fetch('http://134.209.120.136:4000/api/boletin/estudiante/?jwt='+jwt, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setBoletin(response)
      });
  }, [])
  
  return (
      <div>
      <NavEstudiante />
    <div className="d-flex mt-1">
      <Sidebar data={SidebarDataEstudiante}/>
      <main className={classes.content}>
          <div className={classes.toolbar} id="coco" />
          <div id="coco">
            <div className="adminContent">
        <hr className="hr-color" />
      </div>
      <div className='demo-app'>
        <div className='demo-app-main'>
        <TableContainer>
              <Table>
                
                  <TableRow className="colorTab">
                    <TableCell className="colorTab">Materia</TableCell>
                    <TableCell className="colorTab">Nota T1</TableCell>
                    <TableCell className="colorTab">Nota T2</TableCell>
                    <TableCell className="colorTab">Nota T3</TableCell>
                    <TableCell className="colorTab">Promedio</TableCell>
                   </TableRow>
                <TableBody>
        {boletin.map((notas, index) => {
          var total=0;
            if(notas.t1){
              total=total+1;
            }else{
              notas.t1=0;
            }
            if(notas.t2){
              total=total+1;
            }else{
              notas.t2=0;
            }
            if(notas.t3){
              total=total+1;
            }else{
              notas.t3=0;
            }
             return (
                <TableRow key={index} hover>
                  <TableCell>{notas.materia}</TableCell>
                  <TableCell>{notas.t1}</TableCell>
                  <TableCell>{notas.t2}</TableCell>
                  <TableCell>{notas.t3}</TableCell>
                  <TableCell>{parseInt((parseInt(notas.t1) + parseInt(notas.t2) + parseInt(notas.t3)) /total)}</TableCell>
                </TableRow>

              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
      </div>
      </div>
      </main>
      </div>
      </div>
    )
  }
export default (withStyles(styles)(Calificaciones));