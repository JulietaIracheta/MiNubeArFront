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
import { useToasts } from "react-toast-notifications";

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
  rol: "",
  nombre: "",
  apellido: "",
  email: "",
  edad: "",
  password: ""
};



const UsuarioForm = ({ classes, ...props }) => {

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
  const [estForm, setEst] = useState(false);
  const [docForm, setDoc] = useState(false);
  const [tutForm, setTut] = useState(false);

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
      if (props.currentId == 0) props.createUsuario(values, onSuccess);
      else props.updateUsuario(props.currentId, values, onSuccess);
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

    const setEstForm = () => {
        setEst(!estForm);
        setDoc(false);
        setTut(false)
    } 

    const setDocForm = () => {
        setEst(false);
        setDoc(!docForm);
        setTut(false)
    } 

    const setTutForm = () => {
        setEst(false);
        setDoc(false);
        setTut(!tutForm);
    } 

  return (
    <div>
      <div>
        <button className="btn btn-danger mr-3" onClick={() => setEstForm()}>Estudiante</button>
        <button className="btn btn-success mr-3" onClick={() => setDocForm()}>Docente</button>
        <button className="btn btn-primary mr-3" onClick={() => setTutForm()}>Tutor</button>
        </div>
      {estForm && <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              {...(errors.rol && { error: true })}
            >
              <InputLabel ref={inputLabel}></InputLabel>
              <Select
                name="rol"
                value={values.rol}
                onChange={handleInputChange}
                labelWidth={labelWidth}
              >
                <MenuItem value="Estudiante">Estudiante</MenuItem>
              </Select>
              {errors.rol && <FormHelperText>{errors.rol}</FormHelperText>}
            </FormControl>

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
          <Grid item xs={6}>
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
              {...(errors.password && { error: true, helperText: errors.password })}
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
                onClick={resetForm}
              >
                Reset
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>}
      
      {docForm &&   <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              {...(errors.rol && { error: true })}
            >
              <InputLabel ref={inputLabel}></InputLabel>
              <Select
                name="rol"
                value={values.rol}
                onChange={handleInputChange}
                labelWidth={labelWidth}
              >
                <MenuItem value="Docente" selected>Docente</MenuItem>{" "}
              </Select>
              {errors.rol && <FormHelperText>{errors.rol}</FormHelperText>}
            </FormControl>

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
          <Grid item xs={6}>
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
              {...(errors.password && { error: true, helperText: errors.password })}
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
                onClick={resetForm}
              >
                Reset
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    }
      
      {tutForm && 
      <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              {...(errors.rol && { error: true })}
            >
              <InputLabel ref={inputLabel}></InputLabel>
              <Select
                name="rol"
                value={values.rol}
                onChange={handleInputChange}
                labelWidth={labelWidth}
              >
                <MenuItem value="Tutor">Tutor</MenuItem>
              </Select>
              {errors.rol && <FormHelperText>{errors.rol}</FormHelperText>}
            </FormControl>

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
          <Grid item xs={6}>
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
              {...(errors.password && { error: true, helperText: errors.password })}
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
                onClick={resetForm}
              >
                Reset
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
}
      
      
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
)(withStyles(styles)(UsuarioForm));
