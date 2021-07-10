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

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: 25,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CargarInforme2 = () => {
  const classes = useStyles();
  const [año, setAño] = useState();
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState(0);
  const [cursoNombre, setCursoNombre] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [instituciones, setInstituciones] = useState([]);
  const [matematica, setMatematica] = useState("");
  const [lengua, setLengua] = useState("");
  const [sociales, setSociales] = useState("");
  const [naturales, setNaturales] = useState("");
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
    pdf.text(`Matemática: ${matematica}`, 20, 100);
    pdf.text(`Literatura: ${lengua}`, 20, 110);
    pdf.text(`Ciencias Sociales: ${sociales}`, 20, 120);
    pdf.text(`Ciencias Naturales: ${naturales}`, 20, 130);
    pdf.text("", 20, 140);
    pdf.setFont("times", "bolditalic");
    pdf.text("Observaciones", 105, 150, null, null, "center");
    pdf.setFont("times", "normal");
    pdf.text("", 20, 140);
    pdf.text(`${observaciones}`, 20, 160);
    pdf.save(`${nombre}_${apellido}.pdf`);

    const response = fetch(
      "http://localhost:60671/api/informe/crearInformeTrayectoria",
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
          matematica : matematica,
          lengua : lengua,
          sociales : sociales,
          naturales : naturales
        }),
      }
    ).then((response) => response.json());
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

  const onValueChangeMatematica = (event) => {
    const value = event.target.value;
    setMatematica(value);
  };
  const onValueChangeLengua = (event) => {
    const value = event.target.value;
    setLengua(value);
  };
  const onValueChangeSociales = (event) => {
    const value = event.target.value;
    setSociales(value);
  };
  const onValueChangeNaturales = (event) => {
    const value = event.target.value;
    setNaturales(value);
  };
  const onValueChangeObservaciones = (event) => {
    const value = event.target.value;
    setObservaciones(value);
  };

  useEffect(async () => {
    const result = await fetch(
      "http://localhost:60671/api/docente/1",
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
      "http://localhost:60671/api/docente/getCursos/1",
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
      "http://localhost:60671/api/docente/getEstudiantesPorCurso/" +curso ,
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
  }, [curso]);

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
          <form autoComplete="off" noValidate>
            <div>
              <div className="mt-4 ">
                <Grid item xs={12} className="mb-4 ml-5  w-100 ">
                  Año :
                  <TextField
                    name="Año"
                    className="ml-4"
                    value={año}
                    onChange={onValueChangeAño}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Institucion :{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={institucion}
                      onChange={onValueChangeInstitucion}
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
                      value={curso}
                      onChange={onValueChangeCurso}  
                    >
                      {console.log(curso)}
                      {console.log(cursoNombre)}
                     {cursos.map((record) => (
                      
                      <MenuItem value={record}>
                       {record.nombre}
                      </MenuItem>
                    ))}</Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="mb-4 ml-5  w-100 ">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Estudiante : </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={estudiante}
                      onChange={onValueChangeEstudiante}
                    >
                      {estudiantes.map((record) => (
                <MenuItem value={record}>
                  {record.apellido}, {record.nombre}
                </MenuItem>
              ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} className=" mt-5 mb-4 ml-5">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Matemática :{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={matematica}
                      onChange={onValueChangeMatematica}
                    >
                      <MenuItem value={"Sobresaliente"}>Sobresaliente</MenuItem>
                      <MenuItem value={"Bueno"}>Bueno</MenuItem>
                      <MenuItem value={"Regular"}>Regular</MenuItem>
                      <MenuItem value={"Insuficiente"}>Insuficiente</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Literatura :{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={lengua}
                      onChange={onValueChangeLengua}
                    >
                      <MenuItem value={"Sobresaliente"}>Sobresaliente</MenuItem>
                      <MenuItem value={"Bueno"}>Bueno</MenuItem>
                      <MenuItem value={"Regular"}>Regular</MenuItem>
                      <MenuItem value={"Insuficiente"}>Insuficiente</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Ciencias Sociales :{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sociales}
                      onChange={onValueChangeSociales}
                    >
                      <MenuItem value={"Sobresaliente"}>Sobresaliente</MenuItem>
                      <MenuItem value={"Bueno"}>Bueno</MenuItem>
                      <MenuItem value={"Regular"}>Regular</MenuItem>
                      <MenuItem value={"Insuficiente"}>Insuficiente</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Ciencias Naturales :{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={naturales}
                      onChange={onValueChangeNaturales}
                    >
                      <MenuItem value={"Sobresaliente"}>Sobresaliente</MenuItem>
                      <MenuItem value={"Bueno"}>Bueno</MenuItem>
                      <MenuItem value={"Regular"}>Regular</MenuItem>
                      <MenuItem value={"Insuficiente"}>Insuficiente</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="mb-4 ml-5  w-100">
                  {" "}
                  Observaciones :
                  <TextField
                    style={{ width: 600 }}
                    className="mr-5 mb-2"
                    value={observaciones}
                    onChange={onValueChangeObservaciones}
                  />
                </Grid>
              </div>
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
  );
};

export default CargarInforme2;
