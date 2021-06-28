import React from 'react'

export const CardUnidad = ({unidad, tema}) => {
    return (
        <>
            <div className="unidad-item">
                <h5>Unidad {unidad}</h5>
                <h6>Tema: <small>{ tema }</small></h6>
            </div>
        </>
    )
}
