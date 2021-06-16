import React, { useState, useEffect } from "react";
import getEstudiantesCurso from '../../services/estudiantes/getEstudiantesCurso';
import { Link } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';

export default function EstudiantesCurso () {
    const [estudiantes, setEstudiantes] = useState([])
    const id = 1;
    useEffect(function () {
        getEstudiantesCurso(id).then(estudiantes => setEstudiantes(estudiantes))
    }, [id])

    return (
        
               <div className="row">
                        {estudiantes.map((est) => 
                        <div className="col-md-3 p-3">
                        <div className="card min-w card-docente">
                            <div className="card-body row">
                                <div className="col-md-6 ">
                                    <PersonCircle className="rounded-circle w-100 h-100"/>
                                </div>
                                <div className="col-md-6 d-flex flex-column justify-content-around">
                                    <p className="font-weight-bold">{est.idUsuarioNavigation.idPersonaNavigation.nombre}, <br/>{est.idUsuarioNavigation.idPersonaNavigation.apellido}</p>
                                    <Link to={`/estudiante/${id}`} className="text-decoration-none btn btn-outline-dark btn-sm x">Ver Perfil</Link>
                                </div>
                            </div>
                        </div>
            
                    </div>
                        )}
                    </div> 
        
    )

}