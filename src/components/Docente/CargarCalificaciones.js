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

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: 25
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
    }).then((response) => response.json());
    resetForm();
  };

  return (
    <div>
      <NavDocente />

      <div className="d-flex mt-1">
        <Sidebar data={SidebarDataDocente} />
        <div className="container cardContainer ">
          <div>
            <h4>Carga de Calificaciones</h4>
            <hr className="hr-colorDoc" />
            <h6 className="mt-5 mb-5">
              Complete el formulario para cargar las caliicaciones de los alumnos
            </h6>
          </div>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div
              style={{
                display: "inline-block",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} className="mb-4 d-flex w-100 justify-content-between">
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
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
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
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
            <Grid item xs={12} className="mb-4">               
                <TextField
                  name="año"
                  variant="outlined"
                  label="Año"
                  value={año}
                  onChange={onValueChangeAño}
                  className="ml-4"
                />
                <TextField
                  name="T1"
                  variant="outlined"
                  label="Nota 1T"
                  value={T1}
                  onChange={onValueChangeT1}
                  className="ml-4"
                />
                </Grid>
                <Grid item xs={12} className="mb-4">
                <TextField
                  name="T2"
                  variant="outlined"
                  label="Nota 2T"
                  value={T2}
                  onChange={onValueChangeT2}
                  className="ml-4"
                />
                <TextField
                  name="T3"
                  variant="outlined"
                  label="Nota 3T"
                  value={T3}
                  onChange={onValueChangeT3}
                  className="ml-4"
                />
              </Grid>
                <Button
                  size="small"
                  type="submit"
                  variant="outlined"
                  className="ml-5"
                >
                  Enviar
                </Button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CargarCalificaciones;
