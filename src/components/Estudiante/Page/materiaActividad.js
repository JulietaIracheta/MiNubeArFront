import React from 'react';
import Encabezado from "../Encabezado";
import Sidebar from '../Sidebar';
import NavEstudiante from "../NavEstudiante";

export const materiaActividad = ({ match }) => {
    const idMateria = match.params.id;
    const unidad = match.params.unidad;

    return (
        <div>
            <NavEstudiante />
            <div className="flex">
                <Sidebar />
                <div className="content">
                    <Encabezado texto={"Materia - Actividades unidad " + unidad} />
                </div>
               
            </div>
        </div>
    )
}
