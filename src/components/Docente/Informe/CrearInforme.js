import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Sidebar from "../../Sidebar";
import { SidebarDataDocente } from "../../sideBar/SidebarDataDocente";
import NavDocente from "../NavDocente";
import { makeStyles } from "@material-ui/core/styles";
import jsPDF from "jspdf";
import { Cookies } from 'react-cookie';
import url from "../../../url"

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 250,
    marginLeft: 25,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CrearInforme = () => {
  const classes = useStyles();
  const [año, setAño] = useState();
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState(0);
  const [cursoNombre, setCursoNombre] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [institucion, setInstitucion] = useState('');
  const [instituciones, setInstituciones] = useState([]);
  const [materia, setMateria] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [materias, setMaterias] = useState([]);
  const [estudiante, setEstudiante] = useState();
  const [estudiantes, setEstudiantes] = useState([]);
  const [observaciones, setObservaciones] = useState("");

  const resetForm = () => {
    window.location.reload();
  };

  const printDocument = () => {
    const pdf = new jsPDF();
    pdf.setFont("times", "bolditalic");
    pdf.text("Informe", 105, 20, null, null, "center");
    pdf.text("", 20, 30);
    pdf.setFont("times", "normal");
    pdf.text(`Período: ${año}`, 20, 40);
    pdf.text(`Institucion: ${institucion}`, 20, 50);
    pdf.text(`Curso: ${cursoNombre}`, 20, 60);
    pdf.text(`Estudiante: ${nombre} ${apellido}`, 20, 70);
    pdf.text("", 20, 80);
    pdf.setFont("times", "bolditalic");
    pdf.text("Materias", 105, 90, null, null, "center");
    pdf.setFont("times", "normal");
    
    pdf.text("", 20, 140);
    pdf.setFont("times", "bolditalic");
    pdf.text("Observaciones", 105, 150, null, null, "center");
    pdf.setFont("times", "normal");
    pdf.text("", 20, 160);
    pdf.text(`${observaciones}`, 20, 170);
    pdf.save(`${nombre}_${apellido}.pdf`);

    const response = fetch(
      `${url.url}/api/informe/crearInformeTrayectoria`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          año: año,
          institucion: institucion,
          idEstudiante : estudiante,
          curso : cursoNombre,
          materiaCurso : [materia, calificacion]
            
        }),
      }
    ).then((response) => response.json());1
    resetForm();

  };

  const onValueChangeAño = (event) => {
    const value = event.target.value;
    setAño(value);
  };

  const onValueChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value.idCurso);
    setCursoNombre(value.nombre);
  };
  const onValueChangeInstitucion = (event) => {
    const value = event.target.value;
    setInstitucion(value);
  };
  const onValueChangeEstudiante = (event) => {
    const value = event.target.value;
    setEstudiante(value.idUsuario);
    setApellido(value.apellido);
    setNombre(value.nombre);
  };

  const onValueChangeObservaciones = (event) => {
    const value = event.target.value;
    setObservaciones(value);
  };
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  useEffect(async () => {
    const result = await fetch(
      `${url.url}/api/docente/getInstitucion/?jwt=`+jwt,
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
        setInstituciones(response);
      });
  }, []);



  useEffect(async () => {
    const result = await fetch(
      `${url.url}/api/docente/getCursos/?jwt=`+jwt,
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
  }, []);
  
  useEffect(async () => {
    const result = await fetch(
      `${url.url}/api/materias/getMateriasDocente/`+curso + "?jwt="+ jwt,
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
        setMaterias(response);
        console.log(materias)
      });
  }, [curso]);

  useEffect(async () => {
    const result = await fetch(
      `${url.url}/api/docente/getEstudiantesPorCurso/`+ curso, 
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

  return (
    <div>
      <NavDocente />

      <div className="d-flex mt-1">
        <Sidebar data={SidebarDataDocente} />
        <div className="container mt-1">
          <div>
            <h4>Crear Informe</h4>
            <hr className="hr-colorDoc mb-5" />
          </div>
           <div className=" w-100 align-items-center">
          <form autoComplete="off" noValidate>
          <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={2}>
             
                  <Grid item md={4} xl={4} lg={12}> 
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Institucion :{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={institucion}
                      onChange={onValueChangeInstitucion}
                      variant="outlined"
                      >  {instituciones.map((record) => (
                      <MenuItem value={record.nombre}>
                       {record.nombre}
                      </MenuItem>
                    ))}</Select>
                  </FormControl>
                    
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Curso :{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={cursoNombre}
                      onChange={onValueChangeCurso}
                      variant="outlined"  
                    >
                     {cursos.map((record) => (
                      <MenuItem value={record}>
                       {record.nombre}
                      </MenuItem>
                    ))}</Select>
                  </FormControl>
          
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Estudiante : </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={estudiante}
                      onChange={onValueChangeEstudiante}
                      fullWidth
                      variant="outlined"
>                     
                      {estudiantes.map((record) => (
                <MenuItem value={record}>
                  {record.apellido}, {record.nombre}
                </MenuItem>
              ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Año"
                    name="Año"
                    variant="outlined"
                    value={año}
                    className={classes.formControl}
                    onChange={onValueChangeAño}
                  />
                </Grid>
                <Grid item md={4} xl={4} lg={12}>    
                
                                  <div>
                                  
                   {materias.map((mat) =>(
                  
                  <FormControl className={classes.formControl}>
                 
                    <InputLabel id="demo-simple-select-label">
                      {mat.nombre} 
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mat.nombre}
                      fullWidth 
                      variant="outlined"
                    >
                      <MenuItem value={"Sobresaliente"}>Sobresaliente</MenuItem>
                      <MenuItem value={"Bueno"}>Bueno</MenuItem>
                      <MenuItem value={"Regular"}>Regular</MenuItem>
                      <MenuItem value={"Insuficiente"}>Insuficiente</MenuItem>
                    </Select>
                  </FormControl>))}
                   </div> 
                   </Grid>
                <Grid item xs={12} className="mt-4 mb-4 ml-5  w-100">
                  {" "}
                  Observaciones :
                  <TextField
                  fullWidth
                    style={{ width: 600 }}
                    className="mr-5 mb-2"
                    value={observaciones}
                    onChange={onValueChangeObservaciones}
                  />
                </Grid>
                  </Grid>
              </div>
          
            <Button
              size="small"
              type="submit"
              variant="outlined"
              className="ml-5"
              onClick={printDocument}
            >
              Grabar
            </Button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearInforme;
