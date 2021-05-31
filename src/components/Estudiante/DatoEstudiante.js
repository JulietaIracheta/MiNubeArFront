import { Link } from 'react-router-dom';
import React from 'react'
import { PersonCircle } from 'react-bootstrap-icons';
//<img src={avatar} title={nombre} className="rounded-circle w-100 h-100 borde-avatar-alumno"></img>

export default function DatoEstudiante({ avatar, nombre, apellido, id}) {
    return (
        <div className="col-md-3 p-3">
            <div className="card min-w card-docente">
                <div className="card-body row">
                    <div className="col-md-6 col-sm-12">
                        <PersonCircle className="rounded-circle w-100 h-100"/>
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-around">
                        <p className="font-weight-bold">{nombre}, <br/>{apellido}</p>
                        <Link to={`/estudiante/${id}`} className="text-decoration-none btn btn-outline-dark btn-sm x">Ver Perfil</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}