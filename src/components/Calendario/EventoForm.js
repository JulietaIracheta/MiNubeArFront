import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
} from "@material-ui/core";
import useForm from "../Registro/useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/evento";
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
  title: "",
  start: "",
  url: "#",
};

const EventoForm = ({ handleClose, classes, ...props }) => {

  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("title" in fieldValues)
    if ("start" in fieldValues)
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(0);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const reload = () => {
    window.location.reload(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
      };
    props.createEvento(values, onSuccess);
    handleClose();
    await swal("Evento Registrado Correctamente!",'' , "success");
    reload();  
  }

    

  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.eventoList.find((x) => x.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <div>
      <h6 className="mt-5 ml-5">Crear un evento </h6>
      <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container-fluid>
          <Grid item xs={12}>
         
            <TextField
              name="title"
              label="Nombre Evento"
              value={values.title}
              onChange={handleInputChange}
              {...(errors.title && { error: true, helperText: errors.title })}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="start"
              type="datetime-local"
              label=""
              value={values.start}
              onChange={handleInputChange}
              {...(errors.start && { error: true, helperText: errors.start })}
            /><Grid item xs={12}>
            <TextField
              name="url"
              label="Url Clase en Vivo (Opcional)"
              value={values.url}
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
        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  eventoList: state.evento.list,
});

const mapActionToProps = {
  createEvento: actions.create,
  updateEvento: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EventoForm));
