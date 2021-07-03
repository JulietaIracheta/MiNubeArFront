import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Encabezado from "./Encabezado";
import { ChartEstudainte } from "./ChartEstudiante";
import { CardUnidad } from "./CardUnidad";

export default function MateriaUnidad({ id }) {

    return (
        <>
            <Encabezado texto={id} />
            <div className="chart-est-container">
                <div className="chart-item">
                    <h5>Clases vistas</h5>
                    <ChartEstudainte porcentaje={100} />
                    <div>Al día</div>
                </div>
                <div  className="chart-item">
                    <h5>Actividades resueltas</h5>
                    <ChartEstudainte porcentaje={70} />
                    <div>A mejorar</div>
                </div>
            </div>
            <div className="unidad-container">
                <CardUnidad materia={id} unidad={5} tema="Division Avanzada" />
                <CardUnidad materia={id} unidad={4} tema="Division Simple" />
                <CardUnidad materia={id} unidad={3} tema="Multiplicación Avanzada" />
                <CardUnidad materia={id} unidad={2} tema="Multiplicación Simple" />                
            </div>

        </>
    )

}
