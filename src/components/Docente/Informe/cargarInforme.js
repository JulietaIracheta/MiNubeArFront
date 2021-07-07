import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import useForm from "../../Registro/useForm";
import { connect } from "react-redux";
import "../../../assets/css/css.css";
import * as actions from "../../../actions/informe";
import axios from 'axios';
import Sidebar from "../../Sidebar";
import { SidebarDataDocente } from "../../sideBar/SidebarDataDocente";
import NavDocente from "../NavDocente";


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
  idUsuario: 0 
};

const CargarInforme = ({ handleClose, classes, ...props }) => {
  //toast msg.
 
    const [estudiantes, setEstudiantes] = useState([])
    const [idUsuario, setIdUsuario] = useState(0)

    const handleInputChangeEstudiante = (event) => {
        const value = event.target.value;
        setIdUsuario(value);
      };
  //validate()
  //validate({fullName:'jenny'})
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
  const [archivo, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [año, setAño] = useState();

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
      form.append("año", año);
      form.append("formFile", archivo);
      form.append("Informe", fileName)
      console.log("boke:",form);
      try{
      const response = await axios.post("http://localhost:60671/api/informe/cargarInforme",
        form);
          console.log(response);
        }catch(err) {
          console.log(err);
        }
        resetForm();
      }
    
//    handleClose();
  };
  

  return (
    <React.Fragment>
    <div>
 <NavDocente />

 <div className="d-flex mt-1">
   <Sidebar data={SidebarDataDocente} />
   <div className="container-fluid mt-1">
     <div>
       <h4>Cargar Informe</h4>
       <hr className="hr-colorDoc" />
     </div>
    <div className=" w-100 align-items-center">
      <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={6}>
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
                      value={idUsuario}
                      onChange={handleInputChangeEstudiante}
                      label="Estudiante"
                      
                    >
                      {estudiantes.map((c) => (
                        <MenuItem value={c.idPersona}>{c.apellido}{" "}{c.nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="mt-4 mb-4">   
                  Año :
                    <TextField name="año" className="ml-2" value={año} onChange={onValueChangeAño} /> 
                    </div>
          </Grid>
          <Grid item xs={12}>
            <div class="form-group">
            <label for="file">Elija el informe...</label>
                <input
                  name="file"
                  type="file"
                  class="form-control-input"
                  value={values.file}
                  onChange={subirArchivos}
                  {...(errors.file && { error: true, helperText: errors.file })}
                />
            </div>
          </Grid>
          <div className="w-100 d-flex justify-content-center p-3 btn-accion-crear-salir-responsive">
            <button
              variant="contained"
              color="primary"
              type="submit"
              className="btn btn-lg btn-outline-dark mr-3"
            >
              Guardar
                </button>
            <button
              variant="contained"
              className="btn btn-lg btn-outline-danger"
              onClick={resetForm}
            >
              Reset
                </button>
          </div>
        </Grid>
      </form>
    </div>
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
