import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Sidebar from "../Sidebar";
import { SidebarDataDocente } from "../sideBar/SidebarDataDocente";
import NavDocente from "../Docente/NavDocente";
import { makeStyles } from '@material-ui/core/styles';
import url from "../../url"
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: 15
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CargarCalificaciones = () => {
  const classes = useStyles();
  const [año, setAño] = useState();
  const [estudiante, setEstudiante] = useState(0);
  const [materia, setMateria] = useState('');
  const [materias, setMaterias] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [T1, setT1] = useState('');
  const [T2, setT2] = useState('');
  const [T3, setT3] = useState('');
  
  const resetForm = () => {
    window.location.reload();
  };

  const onValueChangeAño = (event) => {
    const value = event.target.value;
    setAño(value);
  };

  const onValueChangeEstudiante = (event) => {
    const value = event.target.value;
    setEstudiante(value);
  };
  const onValueChangeMateria = (event) => {
    const value = event.target.value;
    setMateria(value);
  };
  const onValueChangeT1 = (event) => {
    const value = event.target.value;
    setT1(value);
  };
  const onValueChangeT2 = (event) => {
    const value = event.target.value;
    setT2(value);
  };
  const onValueChangeT3 = (event) => {
    const value = event.target.value;
    setT3(value);
  };
  
  useEffect(async () => {
    const result = await fetch(`${url.url}/api/materias`, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setMaterias(response);
        
      });
  }, []);

  useEffect(async () => {
    const result = await fetch(`${url.url}/api/usuario/estudiantes`, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setEstudiantes(response);
        
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url.url}/api/boletin/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
          año: año,
          materia: materia,
          idEstudiante : estudiante,
          t1 : T1,
          t2 : T2,
          t3 : T3

      }),
    }).then(res => {
      if (res.status === 400) {
      swal("Ese alumno ya tiene cargada nota para esa materia y ese año!",'' , "error")
      }else
      {res.json()
        resetForm();
      };
    
    })
  };

  return (
    <div>
      <NavDocente />
      <div className="d-flex">
        <Sidebar data={SidebarDataDocente} />
        <main className="main w-100 pr-2 pt-4">
          <div className="mb-4 pl-3 pl-sm-2">
            <span className="tituloadmin tituloDocente">Carga de Calificaciones</span>
            <p className="text-secondary mt-1">
              Complete el formulario para cargar las calificaciones <br/>
              correspondientes a cada trimestre de los alumnos.
            </p>
          </div>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}  className="d-flex mt-4 formulario-asignacion flex-column p-4 p-md-5 bg-white" style={{border:"1px solid #edf2f9"}}>
            <div
              style={{
                display: "inline-block",
                justifyContent: "center",
              }}
            >
            <Grid item xs={12} className="mb-4 mb-md-2 d-flex w-100 justify-content-between">
              <FormControl fullWidth variant="outlined" className="w-100 mb-4">
                <InputLabel id="demo-simple-select-outlined-label" >Estudiante</InputLabel>
                <Select
                  name="idEstudiante"
                  id="demo-simple-select-outlined"
                  value={estudiante}
                  onChange={onValueChangeEstudiante}
                  label="Estudiante"
                >
                  {estudiantes.map((record, index) => (
                    <MenuItem key={index} value={record.idUsuario}>
                      {record.apellido}, {record.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" className="ml-md-4 w-100">
                <InputLabel id="demo-simple-select-outlined-label" >Materia</InputLabel>
                <Select
                  name="Materia"
                  id="demo-simple-select-outlined"
                  value={materia}
                  onChange={onValueChangeMateria}
                  label="Materia"
                >
                  {materias.map((record) => (
                    <MenuItem value={record.nombre}>
                      {record.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className="mb-4 mb-md-2 d-flex w-100 justify-content-between">               
                <TextField
                  name="año"
                  variant="outlined"
                  label="Año"
                  value={año}
                  onChange={onValueChangeAño}
                  className="mb-4 w-100"
                />
                <TextField
                  name="T1"
                  variant="outlined"
                  label="Nota 1T"
                  value={T1}
                  onChange={onValueChangeT1}
                  className="ml-md-4 w-100"
                />
            </Grid>
            <Grid item xs={12} className="mb-4 mb-md-2 d-flex w-100 justify-content-between">
                <TextField
                  name="T2"
                  variant="outlined"
                  label="Nota 2T"
                  value={T2}
                  onChange={onValueChangeT2}
                  className="w-100 mb-4"
                />
                <TextField
                  name="T3"
                  variant="outlined"
                  label="Nota 3T"
                  value={T3}
                  onChange={onValueChangeT3}
                  className="w-100 ml-md-4"
                />
          </Grid>
                <Button
                  size="medium"
                  type="submit"
                  color= "#fff"
                  className="ml-5 text-white float-right"
                  style= {{backgroundColor:"#2d2f85"}}
                >
                  Enviar
                </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CargarCalificaciones;
