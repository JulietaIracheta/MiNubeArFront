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
import Select from 'react-select'
import { Cookies } from 'react-cookie';
import url from "../../url"


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
  idUsuario: 0,
  idDocente: 0
};

const ComunicadoForm = ({ handleClose, classes, idCurso, idInstitucion, comunicados,setComunicados, ...props }) => {
  const { addToast } = useToasts();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("descripcion" in fieldValues)
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
  const [estudiantes, setEstudiantes] = useState([]);
  const [idDocente, setIdDocente] = useState(0);
  const [idUsuarioSelect, setIdUsuarioSelect] = useState([]);
  const cookie = new Cookies();
  const jwt = cookie.get('jwt');

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  useEffect(() => {
    fetch(`${url.url}/api/docente/getId?jwt=`+jwt, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        var userid = JSON.parse(data);
        setIdDocente(userid);
      })
  })
  useEffect(function () {
    getEstudiantesPorCurso(idInstitucion,idCurso).then((estudiantes) => setEstudiantes(estudiantes));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Registrado correctamente", { appearance: "success" });
      };
      values.idDocente = idDocente;
      values.idUsuario = idUsuarioSelect;
      values.idCurso = idCurso;
      setComunicados(...[comunicados],values)
      props.createComunicado(values, onSuccess)
    }
    handleClose();
  };
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.comunicadoList.find((x) => x.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const cambiaSelect = (e) => {
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
              <label htmlFor="idUsuario">Si desea envíar a todos los estudiantes deje este campo vacío.</label>
              <Select options={options} 
              isMulti placeholder="Estudiantes"
               onChange={cambiaSelect} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div class="form-group p-3">
              <label htmlFor="descripcion">Redacte su comunicado</label>
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
              className="btn p-3 "
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
  comunicadoList: state.comunicados.list,
});

const mapActionToProps = {
  createComunicado: actions.create,
  updateComunicado: actions.update,
  fetchAllComunicado: actions.fetchAll,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ComunicadoForm));
