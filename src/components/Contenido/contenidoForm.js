import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
} from "@material-ui/core";
import useForm from "../Registro/useForm";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import "../../assets/css/css.css";
import * as actions from "../../actions/contenido";
import axios from 'axios';
import url from "../../url"
import { ProgressBar } from "react-bootstrap";


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
  titulo: "",
  unidad: 1,
  descripcion: ""
};

const ContenidoForm = ({ handleClose, classes, ...props }) => {
  //toast msg.
  const { addToast } = useToasts();
  const [progress, setProgress] = useState()

  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
   
    if ("titulo" in fieldValues)
      temp.titulo = fieldValues.titulo ? "" : "Este campo es requerido.";
    if ("descripcion" in fieldValues)
      temp.descripcion = fieldValues.descripcion ? "" : "Este campo es requerido.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(0);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [archivo, setFile] = useState();

  const subirArchivos = e => {
    setFile(e);
  }
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlCargaVideo = `${url.url}/api/contenido/crearContenido`;
    
    if (validate()) {
      const onSuccess = () => {
        resetForm();
      };
      const form = new FormData();

      form.append("titulo", values.titulo);
      form.append("descripcion", values.descripcion);
      form.append("unidad", values.unidad);
      form.append("curso", props.idCurso);
      form.append("materia", props.idMateria);
      if(archivo)
        form.append("file", archivo[0]);
      await axios.post(`${url.url}/api/contenido/crearContenido`,
        form,{
          onUploadProgress:data=>{
            console.log(data)
            setProgress(Math.round((100 * data.loaded) / data.total))
          }
        })
        .then(response => {
          window.location.reload();
        }).catch(err => {
          console.log(err);
        })
    }
    handleClose();
  };


  return (
    <div className="d-flex w-100 align-items-center flex-column">
      <h6 className="mt-5 ml-5">Crear contenido</h6>
      <form
        autoComplete="off"
        noValidate
        className="w-100"
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={12}>
            <div class="form-group p-3">
              <label for="titulo">Título</label>
              <input
                name="titulo"
                type="text"
                class="form-control"
                value={values.titulo}
                onChange={handleInputChange}
                {...(errors.titulo && { error: true, helperText: errors.titulo })}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div class="form-group p-3">
              <label for="descripcion">Descripción</label>
              <input
                name="descripcion"
                type="text"
                class="form-control"
                value={values.descripcion}
                onChange={handleInputChange}
                {...(errors.descripcion && { error: true, helperText: errors.descripcion })}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div class="form-group p-3">
              <label for="unidad">Unidad</label>
              <input
                name="unidad"
                type="number"
                class="form-control"
                min="1"
                value={values.unidad}
                onChange={handleInputChange}
                {...(errors.unidad && { error: true, helperText: errors.unidad })}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div class="form-group p-3 file-select my-2 d-flex justify-content-center m-auto m-0" style={{width:"80%"}} id="src-video" >
                <input
                  name="src-video"
                  aria-label="Video"
                  type="file"
                  className="fomr-control-input h-100"
                  value={values.file}
                  onChange={(e) => subirArchivos(e.target.files)}
                  {...(errors.file && { error: true, helperText: errors.file })}
                />
            </div>
          </Grid>
          <div className="container py-3">
            {progress && <ProgressBar className="w-100" now={progress} label={`${progress}%`} />}

          </div>

          <div className="w-100 d-flex justify-content-center p-3 btn-accion-crear-salir-responsive">
            <button
              variant="contained"
              color="primary"
              type="submit"
              className="btn btn-lg btn-outline-dark mr-3"
            >
              Crear
                </button>
            <button
              variant="contained"
              className="btn btn-lg btn-outline-danger"
              onClick={handleClose}
            >
              Salir
                </button>
          </div>
        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //contenidoList: state.contenido.list,
});

const mapActionToProps = {
  createContenido: actions.create,
  updateContenido: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ContenidoForm));
