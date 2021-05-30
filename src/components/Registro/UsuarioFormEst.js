import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/usuario";
import * as actions2 from "../../actions/institucion";
import { useToasts } from "react-toast-notifications";
import "../../assets/css/css.css";
import getInstituciones from "../../services/estudiantes/getInstituciones";

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
  edad: "",
  password: "",
};

const UsuarioFormEst = ({ handleClose, classes, ...props }) => {
  //toast msg.
  const { addToast } = useToasts();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Registrado correctamente", { appearance: "success" });
      };
      props.createUsuario(values, onSuccess);
    }
    handleClose();
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.usuarioList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const [instituciones, setInstituciones] = useState([])
  useEffect(() => {
    fetch('http://localhost:60671/api/institucion').then(response => response.json())
      .then(data => setInstituciones(data));
    console.log(instituciones);
  },[]);

  return (
    <div>
      <h6 className="mt-5 ml-5">Complete el formulario para registrar un estudiante </h6>
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

            <select name="institucion" className="form-control">
              {instituciones.map((el) => {
                <option key={el.id} value={el.id}>{el.nombre}</option>
              })}
            </select>
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
              name="edad"
              variant="outlined"
              label="Edad"
              value={values.edad}
              onChange={handleInputChange}
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
                onClick={getInstituciones()}
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
  fetchAllInstituciones: actions2.fetchAll
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(UsuarioFormEst));
