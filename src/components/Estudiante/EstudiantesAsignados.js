import React, { useState, useEffect } from "react";
import ListaDeEStudiantes from "../../helpers/listaDeEstudiantes"
import getEstudiantesCurso from "../../services/estudiantes/getEstudiantesCurso";

export default function EstudiantesAsignados({ institucion = 'unlam', idCurso, idInstitucion }) {
    const [estudiantes, setEstudiantes] = useState([])
   
    useEffect(function () {
        getEstudiantesCurso(idInstitucion,idCurso).then(estudiantes => setEstudiantes(estudiantes))   
    }, [])

    return (
        <div>
            <div className="container-fluid p-0">
                <div className="d-flex flex-row flex-wrap flex-sm-nowrap">
                    <ListaDeEStudiantes estudiantes={estudiantes}>
                    </ListaDeEStudiantes>
                </div>
            </div>
        </div>
    );
}