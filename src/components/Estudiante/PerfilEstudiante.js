import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import GetEstudiante from '../../services/estudiantes/getEstudiante';
import NavEstudiante from "../Docente/NavDocente"
import { Link } from 'react-router-dom';
import { PencilSquare, Trash } from "react-bootstrap-icons";

export default function PerfilEstudiante({ match }) {
    const id = match.params.id
    const [estudiante, SetEstudiante] = useState([])
    useEffect(function () {
        GetEstudiante(id).then(estudiante => SetEstudiante(estudiante))
    }, [id]);
    return (
        <div>
            <NavEstudiante></NavEstudiante>
            <div className="container py-4">
                <h4 className="titulo-docente">
                    <Link to='/docente/estudiantesAsignados' 
                        className="text-decoration-none titulo-docente">
                        Estudiantes 
                    </Link> {'>'} {estudiante?.first_name}, {estudiante?.last_name}
                </h4>
                <hr className="hr-docente"/>
                <div className="row mt-4">
                    <div className="col-md-2 ">
                        <img src={estudiante.avatar} className="rounded-circle borde-avatar-alumno" alt={estudiante.first_name}>
                        </img>
                    </div>
                    <div className="col-md-10">
                        <div className="card min-w card-docente">
                            <div className="card-body row p-3">
                                <div className="col-md-4">
                                    <p className="titulo-docente">Resumen</p>
                                    <div className=" d-flex flex-row justify-content-between">

                                        <div className="d-flex flex-column">
                                            <p>Clases vistas</p>
                                            <p>Actividades resueltas</p>
                                        </div>
                                        <div className="d-flex flex-column">
                                         <span className="circle f"></span>
                                            <span className="circle"></span><p>Al dia</p>
                                            <p>A mejorar</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-8">
                                    <p className="titulo-docente">Boletín</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 d-flex w-100 evenly">
                    <div className="col-md-7 card-docente">
                        <div className="d-flex mt-2 px-2 pt-2 w-100 justify-content-between align-items-center">
                            <p className="titulo-docente m-0">Informes</p>
                            <button className="btn btn-outline-dark btn-sm">Nuevo +</button>
                        </div>
                        <hr/>
                        <div className="w-100 p-2 informes-docentes-container">
                            <div className="p-2 d-flex w-100">
                                <div>
                                    <p className="font-weight-bold">2020 - 2C - Segundo informe anual - Areas especiales</p>
                                    <p> Queridas familias: Les hacemos llegar un único documento las trayectorias
                                    educativas correspondiente a los/las profesores/as de áreas especiales
                            </p>
                                </div>
                                <div className="d-flex flex-column justify-content-around">
                                    <Trash className="text-danger"></Trash>
                                    <PencilSquare className="color-docente"></PencilSquare>
                                </div>
                            </div>
                            <hr />

                            <div className="p-2 d-flex w-100">
                                <div>
                                    <p className="font-weight-bold">2020 - 2C - Segundo informe anual - Areas especiales</p>
                                    <p> Queridas familias: Les hacemos llegar un único documento las trayectorias
                                    educativas correspondiente a los/las profesores/as de áreas especiales
                            </p>
                                </div>
                                <div className="d-flex flex-column justify-content-around">
                                    <Trash className="text-danger"></Trash>
                                    <PencilSquare></PencilSquare>
                                </div>
                                <hr></hr>

                            </div>
                            <hr />

                            <div className="p-2 d-flex w-100">
                                <div>
                                    <p className="font-weight-bold">2020 - 2C - Segundo informe anual - Areas especiales</p>
                                    <p> Queridas familias: Les hacemos llegar un único documento las trayectorias
                                    educativas correspondiente a los/las profesores/as de áreas especiales
                            </p>
                                </div>
                                <div className="d-flex flex-column justify-content-around">
                                    <Trash className="text-danger"></Trash>
                                    <PencilSquare></PencilSquare>
                                </div>
                                <hr></hr>

                            </div>
                            <div className="p-2 d-flex w-100">
                                <div>
                                    <p className="font-weight-bold">2020 - 2C - Segundo informe anual - Areas especiales</p>
                                    <p> Queridas familias: Les hacemos llegar un único documento las trayectorias
                                    educativas correspondiente a los/las profesores/as de áreas especiales
                            </p>
                                </div>
                                <div className="d-flex flex-column justify-content-around">
                                    <Trash className="text-danger"></Trash>
                                    <PencilSquare></PencilSquare>
                                </div>
                                <hr></hr>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 card-docente p-4 text-center">
                        <p className="titulo-docente">Comunicados directos</p>
                    </div> 

                </div>
            </div>
        </div>
    );
}