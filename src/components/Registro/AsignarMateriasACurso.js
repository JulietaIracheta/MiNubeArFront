import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import NavAdmin from './NavAdmin';
import Sidebar from "../Sidebar";
import { SidebarData } from "../SidebarData";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: 25
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AsignarMateriasACurso = () => {
  const classes = useStyles();
  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [materiasCurso, setMateriasCurso] = useState([]);
  const [curso, setCurso] = useState();

  const resetForm = () => {
    window.location.reload();
  };

  const handleInputChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };

  const handleInputChangeMateria = (event) => {
    const value = event.target.value;
    setMateriasCurso(value);
  };

  useEffect(async () => {
    const result = await fetch('http://localhost:60671/api/materias', {
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
    const result = await fetch('http://localhost:60671/api/cursos', {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setCursos(response);

      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:60671/api/materiacurso/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        IdCurso: curso,
        IdMateria: materiasCurso,
      }),
    });
    resetForm();
  };

  return (
    <div>
      <NavAdmin />

      <div className="d-flex mt-1">
        <Sidebar data={SidebarData} />
        <div className="container cardContainer ">
          <div>
            <h4>Asignar Materias a Curso</h4>
            <hr className="hr-colorAdm" />
            <h6 className="mt-5 mb-5">
              Complete el formulario para asignar las materias al curso
            </h6>
          </div>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                width:"100%",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={3}>
                <Grid item md={6} xl={6} lg={6}>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Curso</InputLabel>

                <Select
                  name="idCurso"
                  id="demo-simple-select-outlined"
                  value={curso}
                  onChange={handleInputChangeCurso}
                  label="Curso"
                >
                  {cursos.map((c) => (
                    <MenuItem value={c.idCurso}>
                      {c.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>                
                <Grid item lg={6} md={6}>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Materia</InputLabel>

                <Select
                  name="idMateria"
                  id="demo-simple-select-outlined"
                  value={materiasCurso}
                  onChange={handleInputChangeMateria}
                  label="Materia"
                  multiple
                >
                  {materias.map((m) => (
                    <MenuItem value={m.idMateria}>
                      {m.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
                </Grid>
              </Grid>
            
              <Button
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
}

export default AsignarMateriasACurso;