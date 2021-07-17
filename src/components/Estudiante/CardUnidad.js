import React from 'react'
import { Link } from 'react-router-dom'

export const CardUnidad = ({materia ,unidad, tema, contenido}) => {
    return (
        <>
            <Link to={`/estudiante/materias/${materia}/${contenido}/video`}>
                <div className="unidad-item">
                    <h5>Unidad { unidad }</h5>
                    <h6>Tema: <small>{ tema }</small></h6>
                </div>
            </Link>
        </>
    )
}
