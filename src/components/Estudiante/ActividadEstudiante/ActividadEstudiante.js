import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'
import Chart from '../../Chart/chart';
import NavTutor from '../../Tutor/NavTutor';
import '../../../assets/css/css-actividad-estudiante.css'
import BotonVolver from "../../BotonVolver/botonVolver";
import Sidebar from "../../Sidebar";
import ReactPlayer from 'react-player'
import axios from 'axios';
import {SidebarDataTutor} from '../../sideBar/SidebarDataTutor';

export default function ApexChart() {
    const chart = Chart({ series: 56 });
    const [video, setVideo] = useState([]);
    const urlBase = 'http://localhost:60671/api/contenido/?id=3'
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [archivo, setFile] = useState();
    var urlVideo = 'http://localhost:60671/videos/';

    useEffect(function () {
        fetch(urlBase, {
            method: 'GET'
        }).then(res => {
            if (!res.ok) alert('video no encontrado')
            return res.json()
        }).then(res => {
            setVideoFilePath(urlVideo + video.video);
            setVideo(res);
        });
    }, []);
    const subirArchivos = e => {
        console.log(e[0]);
        setFile(e);
    }
    const insertarArchivos = async () => {
        const f = new FormData();
        f.append("file", archivo[0]);
        console.log(archivo[0]);
        console.log(f);

        await axios.post("http://localhost:60671/api/contenido/cargarVideo", f)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
    }
    //<ReactPlayer url={urlVideo} controls width="500px" height="300px" />
    /* <input type="file" name="file"  onChange={(e)=>subirArchivos(e.target.files)} />
                    <button onClick={()=>{insertarArchivos()}}>Insertar Archivos</button> */
    urlVideo = urlVideo + video.video;
    console.log(urlVideo);
    return (
        <div>
            <NavTutor></NavTutor>
            <div className="d-flex mt-1 borde-tutor">
                <Sidebar data={SidebarDataTutor} />
                <div className="container-fluid mt-2 ">
                    <div className="d-flex align-items-center mt-1">
                        <BotonVolver ruta="/tutor/estudiantesAsignados"></BotonVolver>
                        <h3 className="m-0 p-0"
                            style={{
                                borderBottom: "2px solid #67A147", width: "100%", fontWeight: "bold", color: "#67A147"
                            }}
                        >Matemáticas
                        </h3>
                    </div>
                    <div className="row mt-2">

                        <div className="col-md-6 d-flex align-items-center flex-column">
                            <p className="font-weight-bold">Clases vistas</p>
                            <div id="chart">
                                <ReactApexChart
                                    options={chart.options}
                                    series={chart.series}
                                    type="radialBar" />
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante">
                                    <p>Unidad 5</p>
                                    <p className="font-weight-bold text-danger">En vivo</p>
                                    <p className="m-0"><b>Clase 5: </b>Elementos quimicos</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante">
                                    <p><b>Unidad 2:</b> Sin realizar</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante card-actividad-estudiante-chart">
                                    <p><b>Unidad 6:</b> Satisfactorio</p>
                                    <div className="chart-container">
                                        <ReactApexChart
                                            options={chart.options}
                                            series={chart.series}
                                            type="radialBar" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center flex-column">
                            <p className="text-center font-weight-bold">Actividades resueltas</p>
                            <div id="chart">
                                <ReactApexChart
                                    options={chart.options}
                                    series={chart.series}
                                    type="radialBar" />
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante card-actividad-estudiante-chart">
                                    <p><b>Unidad 6:</b> Satisfactorio</p>
                                    <div className="chart-container">
                                        <ReactApexChart
                                            options={chart.options}
                                            series={chart.series}
                                            type="radialBar" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante card-actividad-estudiante-chart">
                                    <p><b>Unidad 6:</b> Satisfactorio</p>
                                    <div className="chart-container">
                                        <ReactApexChart
                                            options={chart.options}
                                            series={chart.series}
                                            type="radialBar" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante card-actividad-estudiante-chart">
                                    <p><b>Unidad 6:</b> Satisfactorio</p>
                                    <div className="chart-container">
                                        <ReactApexChart
                                            options={chart.options}
                                            series={chart.series}
                                            type="radialBar" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}