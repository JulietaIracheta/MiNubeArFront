import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Encabezado from "./Encabezado";
import { ChartEstudainte } from "./ChartEstudiante";
import { CardUnidad } from "./CardUnidad";
import { Cookies } from 'react-cookie';

export default function MateriaUnidad({ id }) {

    const baseUrl = 'http://134.209.120.136:4000/api/';
    const url = baseUrl + `Actividades/getActidades/${id}`;
    const cookie = new Cookies();
    const jwt = cookie.get('jwt');
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
      
          //setData(content);
          setLoading(true);
      })();
      },[]);
      useEffect(function(){
        const url = 'http://localhost:60671/api/contenido/getContenidoDeEstudiante/'+id+"?jwt="+jwt;

        return fetch(url, {
            method: 'GET'
        }).then(res => {
            if (!res.ok) throw new Error('Response is NOT ok')
            return res.json()
        }).then(res => {
            setData(res);
        });
    }, []);
    const listaUnidades = data.map((data,key) => (
        <div className="col-md-6">
            <CardUnidad key={key} contenido={data.idContenido} materia={id} unidad={data.unidad} tema={data.titulo} />
        </div>
    ));

    return (
        <>
            <Encabezado texto={"Contenidos y actividades"} />
            <div className="chart-est-container">
                <div className="chart-item">
                    <h5>Actividades vistas</h5>
                    <ChartEstudainte porcentaje={0} />
                    <div>Al día</div>
                </div>
                <div  className="chart-item">
                    <h5>Actividades resueltas</h5>
                    <ChartEstudainte porcentaje={0} />
                    <div>A mejorar</div>
                </div>
            </div>
            <div className="unidad-container">
               <div className="row">

                { loading ? (listaUnidades) : "LOADING ..."}
                                            
            </div>
            </div>

        </>
    )

}
