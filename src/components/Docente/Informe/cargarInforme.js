import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { CloudArrowUpFill } from "react-bootstrap-icons";
import useForm from "../../Registro/useForm";
import { connect } from "react-redux";
import "../../../assets/css/css.css";
import * as actions from "../../../actions/informe";
import axios from 'axios';
import Sidebar from "../../Sidebar";
import { SidebarDataDocente } from "../../sideBar/SidebarDataDocente";
import NavDocente from "../NavDocente";
import { Cookies } from 'react-cookie';


const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  file: undefined,
  idUsuario: 0, 
};

const CargarInforme = ({ handleClose, classes, ...props }) => {
 
    const [estudiantes, setEstudiantes] = useState([])
    const [idUsuario, setIdUsuario] = useState(0)
    const [archivo, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [año, setAño] = useState();
    const [idCurso, setCurso] = useState(0);
    const [idInstitucion, setInstitucion] = useState(0);
    const [cursos, setCursos] = useState([]);
    const [instituciones, setInstituciones] = useState([])

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
   
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(0);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const handleInputChangeEstudiante = (event) => {
    const value = event.target.value;
    setIdUsuario(value);
  };
  const handleInputChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  }; 
  const handleInputChangeInstitucion = (event) => {
    const value = event.target.value;
    setInstitucion(value);
  };  

  const onValueChangeAño = (event) => {
    const value = event.target.value;
    setAño(value);
  };

  const subirArchivos = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


  const cookie = new Cookies();
  const jwt = cookie.get('jwt');
  useEffect(async () => {
    const result = await fetch(
      "http://localhost:60671/api/docente/getInstitucion/?jwt="+jwt,
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
    const result = await fetch('http://localhost:60671/api/docente/getCursos/?jwt='+jwt, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setCursos(response);
        console.log(cursos)
      });
  }, [])

  useEffect(async () => {
    const result = await fetch(
      "http://localhost:60671/api/docente/getEstudiantesPorCurso/" + idInstitucion +"/" + idCurso,
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
        console.log(estudiantes)
      });
  }, [idInstitucion, idCurso]);
 
  
  const resetForm = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlCargaInforme = "http://localhost:60671/api/informe/cargarInforme";
    
    if (validate()) {
      const onSuccess = () => {
        resetForm();
      };
    
      const form = new FormData();
      form.append("idUsuario", idUsuario);
      form.append("idCurso", idCurso);
      form.append("año", año);
      form.append("formFile", archivo);
      form.append("Informe", fileName)
      try{
      const response = await axios.post("http://localhost:60671/api/informe/cargarInforme",
        form);
          console.log(response);
        }catch(err) {
          console.log(err);
        }
        resetForm();
      }
  };
  

  return (
    <React.Fragment>
    <div>
 <NavDocente />

 <div className="d-flex">
   <Sidebar data={SidebarDataDocente} />
   <div className="main w-100 pr-2 pt-4">
     <div className="mb-4 pl-3 pl-sm-2">
       <span className="tituloadmin tituloDocente">Cargar Informe</span>
       <p className="text-secondary mt-1">
        Complete el formulario para cargar las calificaciones <br/>
        correspondientes a cada trimestre de los alumnos.
      </p>
     </div>
      <form
        autoComplete="off"
        noValidate
        className="d-flex mt-4 formulario-asignacion flex-column p-4 p-md-5 bg-white" 
        style={{border:"1px solid #edf2f9"}}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "inline-block",
            justifyContent: "center",
          }}
        >
        <Grid item xs={12} className="mb-4 mb-md-2 d-flex w-100 justify-content-between">
          <FormControl
            fullWidth
            variant="outlined"
            className="w-100 mb-4"
          >
            <InputLabel id="demo-simple-select-outlined-label" style={{zIndex:"0"}}>
              Institución
            </InputLabel>

            <Select
              name="idInstitucion"
              id="demo-simple-select-outlined"
              value={idInstitucion}
              onChange={handleInputChangeInstitucion}
              label="Institución"
            >
              {instituciones.map((c) => (
                <MenuItem value={c.idInstitucion}>{c.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            className="ml-md-4 mb-4 w-100"
          >
            <InputLabel id="demo-simple-select-outlined-label" style={{zIndex:"0"}}>
              Curso
            </InputLabel>

            <Select
              name="idCurso"
              id="demo-simple-select-outlined"
              value={idCurso}
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
                className="ml-md-4">
                <InputLabel id="demo-simple-select-outlined-label" style={{zIndex:"0"}}>
                  Estudiante
                </InputLabel>

                <Select
                  name="idEstudiante"
                  id="demo-simple-select-outlined"
                  value={idUsuario}
                  onChange={handleInputChangeEstudiante}
                  label="Estudiante"
                  
                >
                  {estudiantes.map((c) => (
                    <MenuItem value={c.idUsuario}>{c.apellido}{" "}{c.nombre}</MenuItem>
                  ))}
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} className="mb-4 mb-md-2 d-flex w-100 justify-content-between">
             <FormControl
                fullWidth
                variant="outlined"
                className="">
              <TextField 
                name="año" 
                label="Año" 
                variant="outlined" 
                className="mb-4" 
                value={año} 
                onChange={onValueChangeAño}
                style={{zIndex:"0"}}
              />
              </FormControl>
              <FormControl
                fullWidth
                variant="outlined"
                // className={classes.formControl}
                className="ml-md-4">
              <div class="input-group mb-3 pl-0 mt-3">
                <div class="input-group-prepend">
                  <CloudArrowUpFill className="input-group-text p-1" size={39} color="#5D7392" id="inputGroupFileAddon01" />
                </div>
                <div class="custom-file">
                  <input 
                      name="file"
                      type="file"
                      class="custom-file-input" 
                      id="inputGroupFile01" 
                      aria-describedby="inputGroupFileAddon01" 
                      value={values.file}
                      onChange={subirArchivos}
                      {...(errors.file && { error: true, helperText: errors.file })}
                   />
                  <label class="custom-file-label" for="inputGroupFile01" style={{zIndex:"0"}}>Elija Informe</label>
                </div>
              </div>
            </FormControl>
        </Grid>
          <div className="w-100 d-flex justify-content-end">
            <button
              variant="contained"
              type="submit"
              className="btn btn-md text-white btn-outline-dark mr-3 border-0"
              style= {{backgroundColor:"#2d2f85"}}
            >
              Guardar
                </button>
            <button
              variant="contained"
              className="btn btn-md bg-secondary text-white"
              onClick={resetForm}
            >
              Reset
                </button>
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  
});

const mapActionToProps = {
  createInforme: actions.create,
  updateInforme: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CargarInforme));
