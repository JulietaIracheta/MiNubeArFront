import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import NavAdmin from "./NavAdmin";
import Sidebar from "../Sidebar";
import { SidebarData } from "../SidebarData";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: 25,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AsignarEstudiantesACursos = () => {
  const classes = useStyles();
  const [instituciones, setInstituciones] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [institucion, setInstitucion] = useState(0);
  const [curso, setCurso] = useState();
  const [estudiante, setEstudiante] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  const resetForm = () => {
    window.location.reload();
  };

  const handleInputChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };

  const handleInputChangeInstitucion = (event) => {
    const value = event.target.value;
    setInstitucion(value);
    console.log(institucion);
  };

  const handleInputChangeEstudiante = (event) => {
    const value = event.target.value;
    setEstudiante(value);
  };

  useEffect(async () => {
    const result = await fetch("http://localhost:60671/api/institucion", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        setInstituciones(response);
      });
  }, []);

  useEffect(async () => {
    const result = await fetch(
      "http://localhost:60671/api/institucioncurso/cursos/" + institucion,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        setCursos(response);
      });
  }, [institucion]);

  useEffect(async () => {
    const result = await fetch(
      "http://localhost:60671/api/persona/getEstudiantesAsignados/1",
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        setEstudiantes(response);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:60671/api/estudiantecurso/",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          IdCurso: curso,
          IdUsuario: estudiante,
        }),
      }
    );
    resetForm();
  };

  return (
    <div>
      <NavAdmin />

      <div className="d-flex mt-1">
        <Sidebar data={SidebarData} />
        <div className="container cardContainer ">
          <div>
            <h4>Asignar Estudiantes a Cursos</h4>
            <hr className="hr-colorAdm" />
            <h6 className="mt-5 mb-5">
              Complete el formulario para asignar los estudiantes a los cursos
              de cada Institución
            </h6>
          </div>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item md={4} xl={4} lg={4}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Institucion
                    </InputLabel>

                    <Select
                      name="idInstitucion"
                      id="demo-simple-select-outlined"
                      value={institucion}
                      onChange={handleInputChangeInstitucion}
                      label="Institucion"
                    >
                      {instituciones.map((i) => (
                        <MenuItem value={i.idInstitucion}>{i.nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4} xl={4} lg={4}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Curso
                    </InputLabel>

                    <Select
                      name="idCurso"
                      id="demo-simple-select-outlined"
                      value={curso}
                      onChange={handleInputChangeCurso}
                      label="Curso"
                    >
                      {cursos.map((c) => (
                        <MenuItem value={c.idCurso}>{c.nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xl={6} lg={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Estudiante
                    </InputLabel>

                    <Select
                      name="idEstudiante"
                      id="demo-simple-select-outlined"
                      value={estudiante}
                      onChange={handleInputChangeEstudiante}
                      label="Estudiante"
                      multiple
                    >
                      {estudiantes.map((c) => (
                        <MenuItem value={c.idPersona}>{c.apellido}{" "}{c.nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4} xl={4} lg={4}>
                  <Button type="submit" variant="outlined" className="ml-5">
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AsignarEstudiantesACursos;
