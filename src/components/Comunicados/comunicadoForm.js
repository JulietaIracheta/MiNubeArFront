import React, { useEffect, useState } from "react";
import {
  Grid,
  withStyles
} from "@material-ui/core";
import useForm from "../Registro/useForm";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import "../../assets/css/css.css";
import * as actions from "../../actions/comunicado";
import getEstudiantesPorCurso from '../../services/docente/getEstudiantesPorCurso';
import { Textarea } from "react-bootstrap-icons";
import Select from 'react-select'

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 630,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 630,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  idComunicado: 0,
  descripcion: "",
  idUsuario: 0
};

const ComunicadoForm = ({ handleClose, classes,idCurso, ...props}) => {
  //toast msg.
  const { addToast } = useToasts();
  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("descripcion" in fieldValues)
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
  const [estudiantes, setEstudiantes] = useState([]);
  const [idUsuarioSelect, setIdUsuarioSelect] = useState([]);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(function () {
    getEstudiantesPorCurso(1).then((estudiantes) => setEstudiantes(estudiantes));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Registrado correctamente", { appearance: "success" });
        props.fetchAllComunicado()
      };
      values.idUsuario=idUsuarioSelect;
      values.idCurso=idCurso;
      props.createComunicado(values, onSuccess)
    }
    handleClose();
  };
  const cambiaSelect=(e)=>{
    let ids = Array.from(e, option => option.value);
    setIdUsuarioSelect(ids);
  }
  const options = [];
  estudiantes.map(e => {
    options.push({ value: e.idUsuario, label: e.nombre })
  });
  return (
    <div style={{ minHeight: "15rem" }} className="d-flex w-100 align-items-center">
      <form
        autoComplete="off"
        noValidate
        className="w-100"
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={12}>
            <div class="form-group p-3">
              <h5 className="color-docente font-weight-bold">Nuevo Comunicado</h5>
              <label for="idUsuario">Si desea envíar a todos los estudiantes deje este campo vacío.</label>
              <Select options={options} isMulti placeholder="Estudiantes" onChange={cambiaSelect}/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div class="form-group p-3">
              <label for="descripcion">Redacte su comunicado</label>
              <textarea class="form-control" value={values.descripcion}
                id="descripcion" name="descripcion" rows="6" onChange={handleInputChange}
                {...(errors.descripcion && { error: true, helperText: errors.descripcion })}></textarea>
            </div>
          </Grid>

          <div className="w-100 d-flex justify-content-end">
            <button
              variant="contained"
              className="btn p-3"
              onClick={handleClose}
            >
              Cancelar
                </button>
            <button
              variant="contained"
              color="primary"
              type="submit"
              className="btn p-3 font-size-24"
            >
              Enviar
                </button>

          </div>
        </Grid>
      </form>
    </div >
  );
};

const mapStateToProps = (state) => ({
  //contenidoList: state.contenido.list,
});

const mapActionToProps = {
  createComunicado: actions.create,
  updateComunicado: actions.update,
  fetchAllComunicado:actions.fetchAll,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ComunicadoForm));
