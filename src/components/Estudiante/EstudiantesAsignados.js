import React, { useState, useEffect } from "react";
import ListaDeEStudiantes from "../../helpers/listaDeEstudiantes"
import getEstudiantesCurso from "../../services/estudiantes/getEstudiantesCurso";

export default function EstudiantesAsignados({ institucion = 'unlam', idCurso }) {
    const [estudiantes, setEstudiantes] = useState([])
   
    useEffect(function () {
        getEstudiantesCurso(idCurso).then(estudiantes => setEstudiantes(estudiantes))   
    }, [])

    return (
        <div>
            <div className="container">
                <div className="row">
                    <ListaDeEStudiantes estudiantes={estudiantes}>
                    </ListaDeEStudiantes>
                </div>
            </div>
        </div>
    );
}