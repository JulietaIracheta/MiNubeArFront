import React, {useState, useEffect} from 'react'
import NavTutor from './NavTutor'
import Sidebar from '../Sidebar'
import {SidebarDataTutor} from '../sideBar/SidebarDataTutor'
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  withStyles
} from "@material-ui/core";
import GetEstudiantesTutor from "../../services/tutor/getEstudiantesTutor";

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



const CalificacionesTutor = ({ classes, ...props }) => {
  const [boletin, setBoletin] = useState([]);
  const [estudiantes, SetEstudiantes] = useState([]);
  
  useEffect(async () => {
    const result = await fetch('http://localhost:60671/api/boletin/tutor/1', {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setBoletin(response)
       });
  }, []);

  useEffect(
    function () {
      GetEstudiantesTutor().then((estudiante) => SetEstudiantes(estudiante));
      
    },[]);
  
  return (
      <div>
      <NavTutor />
    <div className="d-flex mt-1">
      <Sidebar data={SidebarDataTutor}/>
      <main className={classes.content}>
          <div className={classes.toolbar} id="coco" />
          <div id="coco">
            <div className="adminContent">
                <h3>Calificaciones de los estudiantes</h3>
        <hr className="hr-colorTut" />
      </div>
      <div className='demo-app'>
        <div className='demo-app-main'>
                    
        <TableContainer>
              <Table>
                
            
                  <TableRow className="colorTab">
                  <TableCell className="colorTab">Nombre</TableCell>
                    <TableCell className="colorTab">Materia</TableCell>
                    <TableCell className="colorTab">Nota T1</TableCell>
                    <TableCell className="colorTab">Nota T2</TableCell>
                    <TableCell className="colorTab">Nota T3</TableCell>
                    <TableCell className="colorTab">Promedio</TableCell>
                   </TableRow>
                <TableBody>
        {boletin.map((notas, index) => {
            
                  return(     
                    
       <TableRow key={index} hover>
                  <TableCell>{notas.nombre}{" "}{notas.apellido}</TableCell>
                  <TableCell>{notas.materia}</TableCell>
                  <TableCell>{notas.t1}</TableCell>
                  <TableCell>{notas.t2}</TableCell>
                  <TableCell>{notas.t3}</TableCell>
                  <TableCell>{parseInt((parseInt(notas.t1) + parseInt(notas.t2) + parseInt(notas.t3)) /3)}</TableCell>
                </TableRow>
                  )
              
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
export default (withStyles(styles)(CalificacionesTutor));