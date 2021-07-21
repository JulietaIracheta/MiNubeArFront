import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'
import Chart from '../../Chart/chart';
import NavTutor from '../../Tutor/NavTutor';
import '../../../assets/css/css-actividad-estudiante.css'
import BotonVolver from "../../BotonVolver/botonVolver";
import Sidebar from "../../Sidebar";
import { SidebarDataTutor } from '../../sideBar/SidebarDataTutor';
import { Cookies } from 'react-cookie';
import url from "../../../url"
import { ChartTutor } from "../ChartTutor";

export default function ApexChart(props) {
    const [serie, setSerie] = useState(0);
    const chartAct = Chart({ series: parseInt(serie) });
    const chartCont = Chart({ series: 68 });
    const [video, setVideo] = useState([]);
    const urlBase = `${url.url}/api/contenido/?id=3`
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [archivo, setFile] = useState();
    var urlVideo = `${url.url}/Videos/`;
    const id = props.match.params.id
    const idEstudiante = props.match.params.idEstudiante;
    const [calificacion, setCalificacion] = useState('');
    const cookie = new Cookies();
    const jwt = cookie.get('jwt');

    const [promedioVisto, setPromedioVisto] = useState(0);
    const [promedioActividadResuelta, setPromedioActividadResuelta] = useState(0);
    const [contenidoResumen, setContenidoResumen] = useState('');
    const [actividadResumen, setActividadResumen] = useState('');

    useEffect(() => {
        (async () => {

            const contenidoPromedio = await fetch(`${url.url}/api/Contenido/ContenidoPromedioTutor/` + id + "/" + idEstudiante, {
                headers: { "Content-type": "application/json" },
                credentials: "include",
            });
            contenidoPromedio.json().then(e => {
                setPromedioVisto(e.contenidoVisto);
                setPromedioActividadResuelta(e.actividadResuelta);
                setContenidoResumen(e.contenidoResumen);
                setActividadResumen(e.actividadResumen);
                console.log(e);
            });
        })();
    }, []);

    return (
        <div>
            <NavTutor></NavTutor>
            <div className="d-flex">
                <Sidebar data={SidebarDataTutor} />
                <div className="main w-100 pr-2 pt-4">
                    <div className="d-flex align-items-center mt-1">
                        <BotonVolver ruta="/rol"></BotonVolver>
                        <h3 className="m-0 p-0 tituloadmin tituloTutor"
                            // style={{
                            //     borderBottom: "2px solid #67A147", width: "100%", fontWeight: "bold", color: "#67A147"
                            // }}
                        >{props.match.params.nombre}
                        </h3>
                    </div>
                    <div className="row m-0 mt-5">
                        <div className="chart-est-container w-100 d-flex justify-content-around bg-white">
                            <div className="chart-item mt-4">
                                <h5>Contenido visto</h5>
                                <ChartTutor porcentaje={promedioVisto} />
                                <div>{contenidoResumen}</div>
                            </div>
                            <div className="chart-item mt-4">
                                <h5>Actividades correctas</h5>
                                <ChartTutor porcentaje={promedioActividadResuelta} />
                                <div>{actividadResumen}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}