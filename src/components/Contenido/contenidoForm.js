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
  file: null,
};

const ContenidoForm = ({ handleClose, classes, ...props }) => {
  //toast msg.
  const { addToast } = useToasts();

  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("file" in fieldValues)
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
    const urlCargarVideo = "http://localhost:60671/api/contenido/cargarVideo";
    const f = new FormData();
    f.append("File", archivo[0]);

    await axios.post(urlCargarVideo,f);
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Registrado correctamente", { appearance: "success" });
      };
      
      const obj = {
        unidad: 0,
        descripcion: 'prueba',
        titulo: 'a',
        video: 'video.mp4',
        file: archivo[0]
      }

      console.log("ar:", archivo[0]);
      console.log("file:", f);
      console.log("en obj:", obj);

      await axios.post("http://localhost:60671/api/contenido/crearContenido",
      JSON.stringify(obj),
      {headers: {'Content-Type':'application/json'}}  
      )
      .then(response => {
          console.log(response);
      }).catch(err => {
          console.log(err);
      })
    }
    handleClose();
  };


  return (
    <div>
      <h6 className="mt-5 ml-5">cargue video </h6>
      <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={12}>
            <input
              name="file"
              type="file"
              value={values.file}
              onChange={(e) => subirArchivos(e.target.files)}
              {...(errors.titulo && { error: true, helperText: errors.titulo })}
            />
          </Grid>
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Enviar
                </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
                </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={handleClose}
            >
              Salir
                </Button>
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
