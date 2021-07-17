import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  FormControl,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import Select from 'react-select';
import * as actions from "../../actions/usuario";
import "../../assets/css/css.css";
import {getEstudiantes} from "../../services/estudiantes/getEstudiante";
import swal from 'sweetalert';

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
  rolId: "3",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  password: "",
  rol: "Tutor",
  usuarioNombre : "",
  emailsEstudiantes: [] 
};


const UsuarioFormTut = ({ handleClose, classes, ...props }) => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("rol" in fieldValues)
      temp.rol = fieldValues.rol ? "" : "Este campo es requerido.";
    if ("nombre" in fieldValues)
      temp.nombre = fieldValues.nombre ? "" : "Este campo es requerido.";
    if ("apellido" in fieldValues)
      temp.apellido = fieldValues.apellido ? "" : "Este campo es requerido.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Este campo es requerido.";

    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email no es valido.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFieldValues, validate, props.setCurrentId);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesSelect, setEstudiantesSelect] = useState([]);

  //material-ui select
  const inputLabel = React.useRef(0);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    getEstudiantes().then((estudiante) => {
      let emailsEstudiantes = [];
      estudiante.map( item => {
         emailsEstudiantes.push({value: item.idUsuario, label:  item.usuarioNombre })
      })
      setEstudiantes(emailsEstudiantes);
    });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = (usuario) => {
        if(usuario.email === "error"){
          swal("Hubo un problema al querer dar de alta al Tutor, intente más tarde",'' , "error");
        }else if(usuario.email !== ""){
          swal("Tutor Registrado Correctamente!",'' , "success");
        }else{
          swal("El Email Ingresado Ya Existe!",'' , "error");
        }
        resetForm();
        handleClose();
      };
      values.idEstudiantes = estudiantesSelect;
      props.createUsuario(values, onSuccess);
    }
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.usuarioList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const cambiaSelect=(e)=>{
    let emails = Array.from(e, option => option.value);
    setEstudiantesSelect(emails)
  }

  return (
    <div>
      <h6 className="pt-4 text-center">Complete el formulario para registrar un tutor </h6>
      <div className="container pb-3">
      <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center">
          <Grid item xs={12}>
         
            <TextField
              name="nombre"
              variant="outlined"
              label="Nombre"
              value={values.nombre}
              onChange={handleInputChange}
              {...(errors.nombre && { error: true, helperText: errors.nombre })}
            />
            <TextField
              name="apellido"
              variant="outlined"
              label="Apellido"
              value={values.apellido}
              onChange={handleInputChange}
              {...(errors.apellido && {
                error: true,
                helperText: errors.apellido,
              })}
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
            <TextField
              name="password"
              type="password"
              variant="outlined"
              label="Password"
              value={values.password}
              onChange={handleInputChange}
              {...(errors.password && {
                error: true,
                helperText: errors.password,
              })}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              name="telefono"
              variant="outlined"
              label="Telefono"
              value={values.telefono}
              onChange={handleInputChange}
            />
            <FormControl variant="outline" className={classes.formControl}>
              <Select options= {estudiantes}
                      isMulti 
                      placeholder="Email del Estudiante" 
                      onChange={cambiaSelect}
              />
            </FormControl>
            <div className="w-100 d-flex justify-content-center">
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  usuarioList: state.usuario.list,
});

const mapActionToProps = {
  createUsuario: actions.create,
  updateUsuario: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(UsuarioFormTut));
