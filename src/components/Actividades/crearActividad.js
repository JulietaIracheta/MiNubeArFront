import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
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

const CrearActividad = () => {
  const classes = useStyles();
  const [question, setQuestion] = useState("");
  const [answer, setAnswers] = useState([{ content: "", correct: false }]);
  const [answers1, setAnswers1] = useState("");
  const [answers2, setAnswers2] = useState("");
  const [answers3, setAnswers3] = useState("");
  const [correct1, setCorrect1] = useState(false);
  const [correct2, setCorrect2] = useState(false);
  const [correct3, setCorrect3] = useState(false);
  const [unidad, setUnidad] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idMateria, setMateria] = useState(0);
  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [idCurso, setCurso] = useState();

  const onValueChangePregunta = (event) => {
    const value = event.target.value;
    setQuestion(value);
  };

  const resetForm = () => {
    window.location.reload();
  };
  const checked1 = () => {
    setCorrect1(true);
  };
  const checked2 = () => {
    setCorrect2(true);
  };
  const checked3 = () => {
    setCorrect3(true);
  };
  const onValueChangeRespuesta = (event) => {
    const value = event.target.value;
    setAnswers1(value);
  };
  const onValueChangeRespuesta1 = (event) => {
    const value = event.target.value;
    setAnswers2(value);
  };
  const onValueChangeRespuesta2 = (event) => {
    const value = event.target.value;
    setAnswers3(value);
    setAnswers([answers1, answers2, answers3]);
  };
  const onValueChangeUnidad = (event) => {
    const value = event.target.value;
    setUnidad(value);
  };

  const onValueChangeTitulo = (event) => {
    const value = event.target.value;
    setTitulo(value);
  };

  const onValueChangeDescripcion = (event) => {
    const value = event.target.value;
    setDescripcion(value);
  };

  const onValueChangeMateria = (event) => {
    const value = event.target.value;
    setMateria(value);
  };

  const onValueChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };
  useEffect(async () => {
    const result = await fetch(`${url.url}/api/cursos`, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setCursos(response);
        
      });
  }, [])
  
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
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url.url}/api/question/`, {
      method: "POST",
      headers: {
        'Accept':'application/json',
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        pregunta:{
        content: question,
        answers: [
          { content: answers1, correct: correct1 },
          { content: answers2, correct: correct2 },
          { content: answers3, correct: correct3 },
        ],
        actividadesquiz: {
          unidad: unidad,
          titulo: titulo,
          descripcion: descripcion,
          idMateria: idMateria,
        },
        Id:1111  
      }
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
            <h4>Crear Actividad</h4>
            <hr className="hr-colorDoc" />
            <h6 className="mt-5 mb-5">
              Complete el formulario para crear actividad (tilde la respuesta
              correcta){" "}
            </h6>
          </div>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div
              style={{
                display: "inline-block",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} className="mb-4">
              <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label" >Curso</InputLabel>
            <Select
              name="idCurso"
              id="demo-simple-select-outlined"
              
              value={idCurso}
              onChange={onValueChangeCurso}
              label="Curso"
            >
              {cursos.map((record) => (
                <MenuItem value={record.idCurso}>
                  {record.nombre}
                </MenuItem>
              ))}
            </Select>
            </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label" >Materia</InputLabel>
            <Select
              name="idMateria"
              id="demo-simple-select-outlined"
              
              value={idMateria}
              onChange={onValueChangeMateria}
              label="Materia"
            >
              {materias.map((record) => (
                <MenuItem value={record.idMateria}>
                  {record.nombre}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
             
                <TextField
                  name="unidad"
                  variant="outlined"
                  label="Unidad"
                  value={unidad}
                  onChange={onValueChangeUnidad}
                  className="ml-4"
                />
            <Grid item xs={12} className="mb-4 mt-4"> 
                <TextField
                  name="titulo"
                  variant="outlined"
                  label="Titulo"
                  value={titulo}
                  onChange={onValueChangeTitulo}
                  className="ml-4"
                />
                
                
                <TextField
                  name="descripcion"
                  variant="outlined"
                  label="Descripcion"
                  value={descripcion}
                  onChange={onValueChangeDescripcion}
                  className="ml-4"
                />
                </Grid> 
                <Grid item xs={12} className="mb-4"></Grid>
                <TextField
                  name="question"
                  variant="outlined"
                  label="Pregunta"
                  value={question}
                  onChange={onValueChangePregunta}
                  className="ml-4"
                />
              </Grid>
              <Grid item xs={12} className="mb-4">
                <TextField
                  name="respuesta"
                  variant="outlined"
                  label="Respuesta"
                  value={answers1.content}
                  onChange={onValueChangeRespuesta}
                  className="ml-4"
                />
                <FormControlLabel
                  control={<Checkbox name="checked1" onChange={checked1} />}
                  label="Correcto/Incorrecto"
                  className="ml-3"
                />
              </Grid>
              <TextField
                name="respuesta"
                variant="outlined"
                label="Respuesta"
                value={answers2.content}
                onChange={onValueChangeRespuesta1}
                className="ml-4"
              />
              <FormControlLabel
                control={<Checkbox name="checked2" onChange={checked2} />}
                label="Correcto/Incorrecto"
                className="ml-3"
              />
              <Grid item xs={12} className="mt-4">
                <TextField
                  name="respuesta"
                  variant="outlined"
                  label="Respuesta"
                  value={answers3.content}
                  onChange={onValueChangeRespuesta2}
                  className="ml-4"
                />
                <FormControlLabel
                  control={<Checkbox name="checked3" onChange={checked3} />}
                  label="Correcto/Incorrecto"
                  className="ml-3"
                />
                <Button
                  size="small"
                  type="submit"
                  variant="outlined"
                  className="ml-5"
                >
                  Enviar
                </Button>
              </Grid>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearActividad;
