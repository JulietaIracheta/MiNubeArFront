import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/curso";
import "../../assets/css/css.css";
import swal from 'sweetalert';
import { Add} from "@material-ui/icons";

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
};

const CursoForm = ({ classes, ...props }) => {

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("nombre" in fieldValues)
      temp.nombre = fieldValues.nombre ? "" : "Este campo es requerido.";
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
      const onSuccess = () => {
        resetForm();
      };
    props.createCursos(values, onSuccess);
    }
    swal("Usuario Registrado Correctamente!",'' , "success");
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.cursosList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <div>
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
              label="Nombre del Curso"
              value={values.nombre}
              onChange={handleInputChange}
              {...(errors.nombre && { error: true, helperText: errors.nombre })}
            />
            <div className="agregarCurso">
            <Add />
            <Button
                
                type="submit"
                
              >
                Agregar Curso
              </Button>
              </div>
           </Grid>
        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
    cursosList: state.cursos.list,
  });
  
const mapActionToProps = {
  createCursos: actions.create,
  updateCursos: actions.update,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(CursoForm));
