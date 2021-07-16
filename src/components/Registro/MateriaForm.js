import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/materia";
import "../../assets/css/css.css";
import swal from 'sweetalert';

const initialFieldValues = {
  nombreMateria: "",
};

const MateriaForm = ({ classes, ...props }) => {

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
    props.createMaterias(values, onSuccess);
    onSuccess();    
}
    swal("Materia Registrada Correctamente!",'' , "success");
    
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.materiasList.find((x) => x.id == props.currentId),
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
              label="Materia nueva"
              className="pr-2"
              value={values.nombreMateria}
              onChange={handleInputChange}
              {...(errors.nombre && { error: true, helperText: errors.nombre })}
            />
            <Button
                type="submit"
                className="mt-2 bg-primary text-white mr-auto ml-auto"
              >
                Registrar
              </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
    materiasList: state.materias.list,
  });
  
const mapActionToProps = {
  createMaterias: actions.create,
  updateMaterias: actions.update,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(MateriaForm);
