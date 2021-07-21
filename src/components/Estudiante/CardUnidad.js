import React from 'react'
import { Link } from 'react-router-dom'

export const CardUnidad = ({materia ,unidad, tema, contenido}) => {
    return (
        <>
            <Link to={`/estudiante/materias/${materia}/${contenido}/video`} style={{ textDecoration: 'none' }}>
                <div className="unidad-item">
                    <h4>Unidad { unidad }</h4>
                    <h5>Tema: <small className="font-weight-bold">{ tema }</small></h5>
                </div>
            </Link>
        </>
    )
}
