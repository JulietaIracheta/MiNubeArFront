import React, { useEffect } from "react";
import {
  TextField,
  Button,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/curso";
import "../../assets/css/css.css";
import swal from 'sweetalert';

const initialFieldValues = {
  nombreCurso: "",
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
    swal("Curso Registrado Correctamente!",'' , "success");
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
        onSubmit={handleSubmit}
      >
          <TextField
              name="nombre"
              label="Ingrese el Curso"
              className="pr-2"
              value={values.nombreCurso}
              onChange={handleInputChange}
              {...(errors.nombre && { error: true, helperText: errors.nombre })}
            />
        
            <Button
                type="submit"
                className="mt-2 bg-primary text-white mr-auto ml-auto"
              >
                Add
              </Button>
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
)(CursoForm);
