import React, { useState, useEffect } from "react";
import getEstudiantes from '../../services/estudiantes/getEstudiantes';
import NavDocente from "../Docente/NavDocente"

import ListaDeEStudiantes from "../../helpers/listaDeEstudiantes"
import Sidebar from "../Sidebar";

export default function EstudiantesAsignados({ institucion = 'unlam' }) {
    const [estudiantes, setEstudiantes] = useState([])

    useEffect(function () {
        getEstudiantes().then(estudiantes => setEstudiantes(estudiantes))       //setUsuarios(img)
    }, [])

    return (
        <div>
            <NavDocente></NavDocente>
            <div className="d-flex mt-1">
                <Sidebar />
                <div className="container">
                    <h2>Estudiantes asignados de {institucion}</h2>
                    <div className="row">
                        <ListaDeEStudiantes estudiantes={estudiantes}>
                        </ListaDeEStudiantes>
                    </div>
                </div>
            </div>
        </div>
    );
}