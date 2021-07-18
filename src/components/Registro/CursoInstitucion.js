import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/institucionCurso";
import {
    withStyles,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
  } from "@material-ui/core";
import { store } from "../../actions/store";
import { Provider } from "react-redux";
import NavAdmin from "./NavAdmin";
import Sidebar from "../Sidebar";
import { SidebarData } from "../SidebarData";
import getInstituciones from "../../services/estudiantes/getInstituciones";
import useForm from "./useForm";
import swal from 'sweetalert';
import getCursos from "../../services/estudiantes/getCursos";

const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top: "unset !important",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: 0,
    paddingTop: 0,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const initialFieldValues = {
    idInstitucion: "0",
    idCurso: "0",
    IdInstCursos : []
  };

const CursoInstitucion = ({ classes, ...props }) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("idCurso" in fieldValues)
          temp.idCurso = fieldValues.idCurso ? "" : "Este campo es requerido.";
        if ("idInstitucion" in fieldValues)
          temp.idInstitucion = fieldValues.idInstitucion ? "" : "Este campo es requerido.";
        setErrors({
          ...temp,
        });
    
        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
      };
    
    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  useEffect(() => {
    props.fetchAllCursos()
    console.log(props.fetchAllCursos())
  }, []);
  const [instituciones, setInstituciones] = useState([]);
  const [cursos, setCurso] = useState([]);
  useEffect(function () {
    getInstituciones().then((instituciones) => setInstituciones(instituciones));
    getCursos().then((cursos) => setCurso(cursos))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
      };
    props.createInstitucionCurso(values, onSuccess);
    onSuccess();    
}
    swal("Materia Registrada Correctamente!",'' , "success");
    
  };

  const [IdInstCurso, setCorso] = useState([])
  const handleChange = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    
    setCorso(value);
    console.log(value)
  };

  return (
    <Provider store={store}>
      <NavAdmin />
      <div className={classes.root}>
        <Sidebar data={SidebarData} />
        <main className={classes.content}>
          <div className={classes.toolbar}  />
          <div>
            <div className="adminContent">
              <span className="tituloadmin">Asignar Cursos a Institución</span>
              <div className="agregarcurso">
              </div>
            </div>
            
          </div>
          <div className="asignar">
          <form
        autoComplete="off"
        noValidate
        className={classes.root}
        onSubmit={handleSubmit}
      >
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="label">
                      Institución
                    </InputLabel>
                    <Select
                      name="idInstitucion"  
                      id="asignarForm"
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
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="label">
                      Curso
                    </InputLabel>
                    <Select
                      multiple
                      native
                      name="idCurso"  
                      id="asignarForm"
                      value={IdInstCurso}
                      onChange={handleChange}
                      label="Curso"
                    >
                      
                      {cursos.map((curso) => (
                        <option key={curso.idCurso} value={curso.idCurso}>
                          {curso.nombre}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                
                type="submit"
                
              >
                Enviar
              </Button>
            
                </form>
                </div>
        </main>
      </div>
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  cursosList: state.institucionCurso.list,
});

const mapActionToProps = {
  fetchAllCursos: actions.fetchAll,
  createInstitucionCurso: actions.create
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CursoInstitucion));
