import React from 'react'
import DatoEstudiante from "../components/Estudiante/DatoEstudiante"

export default function ListaDeEstudiantes({estudiantes}){
    return estudiantes.map(estudiante => {
        return <DatoEstudiante
            key={estudiante.id}
            avatar={estudiante.avatar}
            nombre={estudiante.first_name}
            apellido={estudiante.last_name}
            id={estudiante.id}
        />
    })
}