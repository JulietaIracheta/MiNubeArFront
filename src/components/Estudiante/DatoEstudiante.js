import { Link } from 'react-router-dom';
import React from 'react'
import { PersonCircle } from 'react-bootstrap-icons';
import '../../assets/css/css-estudiante.css';
import { Avatar } from "@material-ui/core";
import url from "../../url"

export default function DatoEstudiante({ avatar, nombre, apellido,id}) {
    return (
        <div className="col-md-4 p-3">
            <div className="card min-w card-docente">
                <div className="card-body row" style={{minHeight:"10rem"}}>
                    <div className="col-md-6 col-sm-12 estudiante-asignado-icono">
                        {avatar ? 
                              <Avatar className="icon-perfil text-white w-100 h-100" style={{ background: "#B0211D" }}>
                              <img className="w-100 h-100"
                                src={`${url.url}/Avatares/` + avatar}
                                style={{ objectFit: "cover" }} />
                            </Avatar>
                        : <PersonCircle className="rounded-circle h-100 icono-estudiante"/>}
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-around estudiante-asignado-detalle">
                        <p className="font-weight-bold">{nombre}, <br/>{apellido}</p>
                        {/*<Link to={`/perfilEstudiante/${id}`} className="text-decoration-none btn btn-outline-dark btn-sm x btn-perfil-estudiante">Ver Perfil</Link>*/}
                    </div>
                </div>
            </div>

        </div>
    )
}