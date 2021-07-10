import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Encabezado from "./Encabezado";
import { ChartEstudainte } from "./ChartEstudiante";
import { CardUnidad } from "./CardUnidad";

export default function MateriaUnidad({ id }) {

    const baseUrl = 'http://localhost:60671/api/';
    const url = baseUrl + `Actividades/getActidades/${id}`;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
          const response = await fetch(url, {
            headers: { "Content-type": "application/json" },
            credentials: "include",
          });
      
          const content = await response.json();  
          
          console.log( content );
      
          setData(content);
          setLoading(true);
      })();
      },[]);

    const listaUnidades = data.map((data) => (
        <CardUnidad materia={id} unidad={data.unidad} tema={data.titulo} />
    ));

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
               
                { loading ? (listaUnidades) : "LOADING ..."}
                                            
            </div>

        </>
    )

}
