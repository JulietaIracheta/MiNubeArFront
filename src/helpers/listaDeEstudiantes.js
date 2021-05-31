import React from 'react'
import DatoEstudiante from "../components/Estudiante/DatoEstudiante"

export default function ListaDeEstudiantes({estudiantes}){
    return estudiantes.map(estudiante => {
        return <DatoEstudiante
            key={estudiante.idPersona}
            avatar={estudiante.avatar}
            nombre={estudiante.nombre}
            apellido={estudiante.apellido}
            id={estudiante.idPersona}
        />
    })
}