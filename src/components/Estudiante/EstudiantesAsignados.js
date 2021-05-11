import React, { useState, useEffect } from "react";
import getEstudiantes from '../../services/estudiantes/getEstudiantes';
import NavDocente from "../Docente/NavDocente"
import ListaDeEStudiantes from "../../helpers/listaDeEstudiantes"

export default function EstudiantesAsignados({ institucion = 'unlam' }) {
    const [estudiantes, setEstudiantes] = useState([])

    useEffect(function () {
        getEstudiantes().then(estudiantes => setEstudiantes(estudiantes))       //setUsuarios(img)
    }, [])

    return (
        <div>
            <NavDocente></NavDocente>
            <div className="container cardContainer pb-5">
                <div>
                    <h2>Estudiantes asignados de {institucion}</h2>
                    <div className="row">
                        <ListaDeEStudiantes estudiantes={estudiantes}>
                        </ListaDeEStudiantes>
                        <ListaDeEStudiantes estudiantes={estudiantes}>
                        </ListaDeEStudiantes>
                    </div>
                </div>
            </div>
        </div>
    );
}