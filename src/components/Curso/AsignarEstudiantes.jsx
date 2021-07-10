import  { useState, useEffect } from "react";
import NavAdmin from './../Registro/NavAdmin';
import Sidebar from "../Sidebar";
import { SidebarData } from "../SidebarData";
import Select from 'react-select'
import {FormGroup} from 'reactstrap';
import getInstituciones from './../../services/estudiantes/getInstituciones'
import {getEstudiantesDeUnaInstitucion} from './../../services/estudiantes/getEstudiante'
import {getCursosDeUnaInstitucion} from './../../services/estudiantes/getCursos'
import {AsignaEstudiandesAcurso} from './../../services/estudiantes/PostCursoEstudiante'
import React from 'react';


export default function AsignarEstudiantes() {

  const[instituciones, setInstituciones] = useState([]);
  const[cursos, setCursos] = useState([]);
  const[estudiantes, setEstudiantes] = useState([]);

  const[datos, setDatos] = useState({
    // datos que se utilizan en el backend
    IdInstitucion: '',
    IdCurso: '',
    IdEstudiantes: [],
    // datos utilizados para mostrar en los select los valores elegidos
    InstitucionElegida: '',
    CursoElegido: '',
    EstudiantesElegidos: [],
    // datos utilizados para activar o desactivar los select
    cursoActivate: 0,
    estudiantesActivate: 0
  })


  useEffect(()=>{
    getInstituciones().then(respuesta => {
      setInstituciones(respuesta.map( item => {
        return {value: item.idInstitucion, label: item.nombre}
      }))
    })
  },[])

  const handleChangeSelectInstitucion = (event) => {
      getCursosDeUnaInstitucion(Object.values(event)[0]).then(respuesta => {

        setCursos(respuesta.map( item => {
             return {value: item.idCurso, label: item.nombre}
           }))

        setDatos({
          ...datos,
          IdInstitucion: Object.values(event)[0],
          InstitucionElegida: event,
          CursoElegido: null,
          EstudiantesElegidos: [],
          cursoActivate: 1,
          estudiantesActivate: 0
        })
      })

  };

  const handleChangeSelectCurso = (event) => {
      getEstudiantesDeUnaInstitucion(Object.values(event)[0]).then(respuesta => {

        setEstudiantes(respuesta.map( item => {
          return{value: item.idUsuario, label: item.usuarioNombre}
        }))

        setDatos({
          ...datos,
          IdCurso: Object.values(event)[0],
          CursoElegido: event,
          estudiantesActivate: 1
        })
      })

  };

  const handleChangeSelectEstudiantes = (event) => {
      setDatos({
        ...datos,
        IdEstudiantes: Object.values(event).map( x => x.value),
        EstudiantesElegidos: event
      })
  };

  
  const resetForm = () => {
    window.location.reload();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    AsignaEstudiandesAcurso(datos)
    // resetForm();
    setDatos({
      IdInstitucion: '',
      IdCurso: '',
      IdEstudiantes: [],
      InstitucionElegida: '',
      CursoElegido: '',
      EstudiantesElegidos: [],
      cursoActivate: 0,
      estudiantesActivate: 0
    })
    console.log('enviando')
  };

  return (
        <div>
          <NavAdmin />
            <div className="d-flex mt-1">
               <Sidebar data={SidebarData} />
                  <div className="container cardContainer ">
                      <div>
                        <h4>Asignar Estudiantes a un Curso</h4>
                        <hr className="hr-colorAdm" />
                        <h6 className="mt-5 mb-5">
                          Complete el formulario para asignar los estudiantes al curso
                        </h6>
                      </div>
                      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                          <FormGroup>
                                <label>Institución:</label>
                                <Select
                                    value = {datos.InstitucionElegida} 
                                    options= {instituciones}
                                    placeholder="Elija la Institución" 
                                    onChange={handleChangeSelectInstitucion}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Curso</label>
                                <Select
                                    value = {datos.CursoElegido} 
                                    options= {cursos}
                                    isDisabled = {datos.cursoActivate? false : true }
                                    placeholder="Elija el Curso" 
                                    onChange={handleChangeSelectCurso}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Estudiantes</label>
                                <Select
                                    value = {datos.EstudiantesElegidos} 
                                    options= {estudiantes}
                                    isMulti 
                                    isDisabled = {datos.estudiantesActivate? false : true }
                                    placeholder="Elija los Estudiantes" 
                                    onChange={handleChangeSelectEstudiantes}
                                />
                            </FormGroup>
                        </div>
                        <button type="submit" className="btn btn-outline-primary float-right ml-1 mt-2">Guardar</button>
                      </form>
                </div>
           </div>
        </div>
  );
}
