import React from "react";
import { useState, useEffect } from "react";
import Encabezado from "./Encabezado";
import { ChartEstudainte } from "./ChartEstudiante";
import { CardUnidad } from "./CardUnidad";
import { Cookies } from 'react-cookie';
import url from "../../url"
import { Link } from 'react-router-dom'

export default function MateriaUnidad({ id }) {

    const baseUrl = `${url.url}/api/`;
    const cookie = new Cookies();
    const jwt = cookie.get('jwt');
    const urlB = baseUrl + `Actividades/getActidades/${id}?jwt=` + jwt;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [promedioVisto, setPromedioVisto] = useState(0);
    const [promedioActividadResuelta, setPromedioActividadResuelta] = useState(0);
    const [contenidoResumen, setContenidoResumen] = useState('');
    const [actividadResumen, setActividadResumen] = useState('');

    useEffect(() => {
        (async () => {
            const response = await fetch(urlB, {
                headers: { "Content-type": "application/json" },
                credentials: "include",
            });

            const content = await response.json();

            const contenidoPromedio = await fetch(baseUrl + "Contenido/ContenidoPromedio/" + id + "?jwt=" + jwt, {
                headers: { "Content-type": "application/json" },
                credentials: "include",
            });
            contenidoPromedio.json().then(e => {
                setPromedioVisto(e.contenidoVisto);
                setPromedioActividadResuelta(e.actividadResuelta);
                setContenidoResumen(e.contenidoResumen);
                setActividadResumen(e.actividadResumen);
            });
            //setData(content);
            setLoading(true);
        })();
    }, []);
    useEffect(function () {
        const urlGetContenido = `${url.url}/api/contenido/getContenidoDeEstudiante/` + id + "?jwt=" + jwt;
        return fetch(urlGetContenido, {
            method: 'GET'
        }).then(res => {
            if (!res.ok) throw new Error('Response is NOT ok')
            return res.json()
        }).then(res => {
            setData(res);
            console.log(data)
        });
    }, []);
    const listaUnidades = data.map((data, key) => (
        <CardUnidad key={key} contenido={data.idContenido} materia={id} unidad={data.unidad} tema={data.titulo} />
    ));

    return (
        <>
            <Encabezado texto={"Contenidos y actividades"} />
            <div className="chart-est-containerTODO d-flex flex-column justify-content-around flex-md-row">
                <div className="chart-item">
                    <h5>Contenido visto</h5>
                    <ChartEstudainte porcentaje={promedioVisto} />
                    <div className="font-weight-bold">{contenidoResumen}</div>
                </div>
                <div className="chart-item">
                    <h5>Actividades correctas</h5>
                    <ChartEstudainte porcentaje={promedioActividadResuelta} />
                    <div className="font-weight-bold">{actividadResumen}</div>
                </div>
            </div>
                <div className="row d-flex justify-content-around">

                    {loading ? (listaUnidades) : "LOADING ..."}     
                </div>

        </>
    )

}
