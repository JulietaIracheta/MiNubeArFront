import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
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

const AsignarCursosAInstituciones = () => {
    const [instituciones, setInstituciones] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [institucion, setInstitucion] = useState();
    const [curso, setCurso] = useState([]);

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
      };

      useEffect(async () => {
        const result = await fetch('http://localhost:60671/api/institucion', {
          method: 'GET',
          headers: { "Content-type": "application/json" },
          credentials: "include",
        }).then(function (response) {
          return response.json();
        })
          .then(response => {
            setInstituciones(response);
            
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
        const response = await fetch("http://localhost:60671/api/institucioncurso/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
              IdCurso: curso,
              IdInstitucion: institucion,
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
                <h4 className="tituloadmin text-center text-sm-left">Asignar Cursos a Institución</h4>
                <h6 className="mt-4 mb-4 text-secondary">
                  Complete el formulario para asignar los cursos a cada Institución
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
                    <MenuItem value={i.idInstitucion}>
                      {i.nombre}
                    </MenuItem>
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
                      multiple
                  >
                    {cursos.map((c) => (
                      <MenuItem value={c.idCurso}>
                        {c.nombre}
                      </MenuItem>
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
}

export default AsignarCursosAInstituciones;