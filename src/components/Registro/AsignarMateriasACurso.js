import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import NavAdmin from './NavAdmin';
import Sidebar from "../Sidebar";
import { SidebarData } from "../SidebarData";

const AsignarMateriasACurso = () => {
  // const classes = useStyles();
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
    const result = await fetch('http://134.209.120.136:4000/api/materias', {
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
    const result = await fetch('http://134.209.120.136:4000/api/cursos', {
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
    const response = await fetch("http://134.209.120.136:4000/api/materiacurso/", {
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
      <div className="d-flex">
        <Sidebar data={SidebarData} />
        <div className="main w-100 pr-2 pt-4">
          <div className="d-flex d-sm-block flex-column  flex-sm-row justify-content-between">
            <h4 className="tituloadmin text-center text-sm-left">Asignar Materias a Curso</h4>
            <h6 className="mt-4 mb-4 text-secondary">
              Esta sección sirve para que agregue las materias que le corresponden a un curso.
            </h6>
          </div>
          <form autoComplete="off" noValidate onSubmit={handleSubmit} className="d-flex mt-4 formulario-asignacion flex-column p-2 p-md-5 bg-white" style={{border:"1px solid #edf2f9"}}>
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
                      <MenuItem value={c.idCurso}>
                        {c.nombre}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
                <FormControl fullWidth variant="outlined" className="mb-3">
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
              <Button
                type="submit"
                className="btn bg-primary text-white w-50 ml-auto"
                color="primary"
              >
                Agregar
              </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AsignarMateriasACurso;