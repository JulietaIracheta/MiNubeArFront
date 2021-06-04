import React, { useState, useEffect } from "react";
import getEstudiantesCurso from '../../services/estudiantes/getEstudiantesCurso';
import ListaDeEStudiantes from "../../helpers/listaDeEstudiantes"

export default function EstudiantesCurso ({match}) {
    const [estudiantes, setEstudiantes] = useState([])
    const id = 32;
    console.log(match)
    useEffect(function () {
        getEstudiantesCurso(id).then(estudiantes => setEstudiantes(estudiantes))
    }, [id])

    return (
        
               <div className="row">
                            
                        <ListaDeEStudiantes estudiantes={estudiantes} >
                        </ListaDeEStudiantes>
                    </div> 
        
    )

}