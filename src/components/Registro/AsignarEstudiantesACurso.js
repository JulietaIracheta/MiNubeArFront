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

const AsignarEstudiantesACursos = () => {
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
      <div className="d-flex">
        <Sidebar data={SidebarData} />
        <div className="main w-100 pr-2 pt-4">
          <div className="d-flex d-sm-block flex-column  flex-sm-row justify-content-between">
            <h4 className="tituloadmin text-center text-sm-left">Asignar Estudiantes a Cursos</h4>
            <h6 className="mt-4 mb-4 text-secondary">
              Complete el formulario para asignar los estudiantes a los cursos
              de cada Institución
            </h6>
          </div>
          <form autoComplete="off" noValidate onSubmit={handleSubmit} className="d-flex mt-4 formulario-asignacion flex-column p-2 p-md-5 bg-white" style={{border:"1px solid #edf2f9"}}>
                  <FormControl fullWidth variant="outlined" className="mb-3">
                    <InputLabel id="demo-simple-select-outlined-label">Institucion</InputLabel>
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
                  <FormControl fullWidth variant="outlined" className="mb-3">
                    <InputLabel id="demo-simple-select-outlined-label">Curso</InputLabel>
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
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className="mb-3"
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
                  <Button 
                    type="submit" 
                    className="btn bg-primary text-white w-50 ml-auto"
                    color="primary"
                  >
                    Enviar
                  </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AsignarEstudiantesACursos;
