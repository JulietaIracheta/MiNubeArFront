import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/usuario";
import "../../assets/css/css.css";
import getInstituciones from "../../services/estudiantes/getInstituciones";
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
  rolId: "1",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  password: "",
  rol: "Estudiante",
  usuarioNombre: "",
  idInstitucion: "0"
};

const UsuarioFormEst = ({ handleClose, classes, ...props }) => {

  const [usuarioNombre, setUsuarioNombre] = useState("");
  //validate()
  //validate({fullName:'jenny'})
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

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(0);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = e => {
    e.preventDefault()
    
    if (validate()) {
        const onSuccess = () => {
            resetForm()
        }
        if (props.currentId == 0){
          console.log(e)
            props.createUsuario(values, onSuccess)
         
            handleClose();
            swal("Usuario Registrado Correctamente!",'' , "success");
            onSuccess();}
            
            
    }
  }


  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.usuarioList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const [instituciones, setInstituciones] = useState([]);

  useEffect(function () {
    getInstituciones().then((instituciones) => setInstituciones(instituciones));
  }, []);

  return (
    <div>
      <h6 className="mt-5 ml-5">
        Complete el formulario para registrar un estudiante{" "}
      </h6>
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
            <TextField
              name="telefono"
              variant="outlined"
              label="Telefono"
              value={values.telefono}
              onChange={handleInputChange}
            />
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Institución</InputLabel>
            <Select
              name="idInstitucion"
              id="demo-simple-select-outlined"
              value={values.idInstitucion}
              onChange={handleInputChange}
              label="Institucion"
            >
              {instituciones.map((institucion) => (
                <MenuItem value={institucion.idInstitucion}>
                  {institucion.nombre}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
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
  usuarioList: state.usuario.list,
});

const mapActionToProps = {
  createUsuario: actions.create,
  updateUsuario: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(UsuarioFormEst));
