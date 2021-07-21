import React, {useState, useEffect} from 'react'
import NavTutor from './NavTutor'
import Sidebar from '../Sidebar'
import {SidebarDataTutor} from '../sideBar/SidebarDataTutor'
import {
    TableContainer,
    Table,
    TableHead,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TableRow,
    TableCell,
    TableBody,
  withStyles
} from "@material-ui/core";
import GetEstudiantesTutor from "../../services/tutor/getEstudiantesTutor";
import url from "../../url"

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
  const [estudiante, SetEstudiante] = useState(8);
  
  useEffect(
    function () {
      GetEstudiantesTutor().then((estudiante) => SetEstudiantes(estudiante));
      
    },[]);

    const handleInputChange = (e) => {
      SetEstudiante(e.target.value)
    }
  

  useEffect(async () => {
    const result = await fetch(`${url.url}/api/boletin/estudiante/` + estudiante, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setBoletin(response)
       });
  }, [estudiante]);


  return (
      <div>
      <NavTutor />
        <div className="d-flex">
          <Sidebar data={SidebarDataTutor}/>
          <main className="main w-100 pr-2 pt-4">
            <h3 className="tituloadmin tituloTutor">Calificaciones de los estudiantes</h3>
            <div className='demo-app'>
              <div className='demo-app-main'>
              <FormControl variant="outlined" className="mb-3 mt-3">
                  <InputLabel id="demo-simple-select-outlined-label">Estudiante</InputLabel>
                  <Select
                    name="idEstudiante"
                    id="demo-simple-select-outlined"
                    className="bg-white"
                    value={estudiante}
                    onChange={handleInputChange}
                    label="Estudiante"
                    style={{minWidth:"150px"}}
                  >
                    {estudiantes.map((est) => (
                      <MenuItem value={est.idUsuario}>
                        {est.nombre}{" "}{est.apellido}
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
                
                    <Table responsive className="mt-3 d-block d-sm-table bg-white table-responsive" style={{border:"1px solid #edf2f9"}}>
                      <TableHead style={{backgroundColor:"#12263f"}}>
                        <TableRow>
                          <TableCell className="font-weight-bold text-white">Materia</TableCell>
                          <TableCell className="font-weight-bold text-white text-center">Año</TableCell>
                          <TableCell className="font-weight-bold text-white text-center">Nota T1</TableCell>
                          <TableCell className="font-weight-bold text-white text-center">Nota T2</TableCell>
                          <TableCell className="font-weight-bold text-white text-center">Nota T3</TableCell>
                          <TableCell className="font-weight-bold text-white text-center">Promedio</TableCell>
                        </TableRow>
                      </TableHead>
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
                        <TableCell className="text-dark">{notas.materia}</TableCell>
                        <TableCell className="text-dark text-center">{notas.año}</TableCell>
                        <TableCell className="text-dark text-center">{notas.t1}</TableCell>
                        <TableCell className="text-dark text-center">{notas.t2}</TableCell>
                        <TableCell className="text-dark text-center">{notas.t3}</TableCell>
                        <TableCell className="text-dark text-center">{parseInt((parseInt(notas.t1) + parseInt(notas.t2) + parseInt(notas.t3)) /total)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          </main>
        </div>
      </div>
    )
  }
export default (withStyles(styles)(CalificacionesTutor));