import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/institucion";
import swal from 'sweetalert';
import "../../assets/css/css.css";

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
  nombre: "",
  email: "",
};

const InstitucionForm = ({ handleClose, classes, ...props }) => {


  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("nombre" in fieldValues)
    if ("direccion" in fieldValues)
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email no es valido.";
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

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {

      const onSuccess = (usuario) => {
        if(usuario.email === "error"){
          swal("Hubo un problema al querer dar de alta a la Institución, intente más tarde",'' , "error");
        }else if(usuario.email !== ""){
          swal("Institución Registrada Correctamente!",'' , "success");
        }else{
          swal("El Email Ingresado Ya Existe!",'' , "error");
        }
        resetForm();
        handleClose();
      };
      
    props.createInstitucion(values, onSuccess);
    }
    handleClose();
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.institucionList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <div>
      <h6 className="mt-5 ml-5">Complete el formulario para registrar una institucion </h6>
      <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={12}>
         
            <TextField
              name="nombre"
              variant="outlined"
              label="Nombre"
              value={values.nombre}
              onChange={handleInputChange}
              {...(errors.nombre && { error: true, helperText: errors.nombre })}
            />
          </Grid>
          <Grid item xs={12}>
         
            <TextField
              name="direccion"
              variant="outlined"
              label="Dirección"
              value={values.direccion}
              onChange={handleInputChange}
              {...(errors.direccion && { error: true, helperText: errors.direccion })}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              value={values.email}
              onChange={handleInputChange}
              {...(errors.email && { error: true, helperText: errors.email })}
            />
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
        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  institucionList: state.institucion.list,
});

const mapActionToProps = {
  createInstitucion: actions.create,
  updateInstitucion: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(InstitucionForm));
