import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'
import Chart from '../../Chart/chart';
import NavTutor from '../../Tutor/NavTutor';
import '../../../assets/css/css-actividad-estudiante.css'
import BotonVolver from "../../BotonVolver/botonVolver";
import Sidebar from "../../Sidebar";
import axios from 'axios';
import {SidebarDataTutor} from '../../sideBar/SidebarDataTutor';

export default function ApexChart(props) {
    const [serie, setSerie] = useState(0);
    const chartAct = Chart({ series : parseInt(serie) });
    const chartCont = Chart({ series : 68 });
    const [video, setVideo] = useState([]);
    const urlBase = 'http://localhost:60671/api/contenido/?id=3'
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [archivo, setFile] = useState();
    var urlVideo = 'http://localhost:60671/videos/';
    const id = props.match.params.id
    const [calificacion, setCalificacion] = useState('');

    useEffect(function () {
        fetch('http://localhost:60671/api/actividades/calcularAvance/' + id, {
            method: 'GET'
        }).then(res => {
            if (!res.ok) alert('error')
            return res.json()
        }).then(res => {
            setSerie(res);
        });
    }, []);

    
    return (
        <div>
            <NavTutor></NavTutor>
            <div className="d-flex mt-1 borde-tutor">
                <Sidebar data={SidebarDataTutor} />
                <div className="container-fluid mt-2 ">
                    <div className="d-flex align-items-center mt-1">
                        <BotonVolver ruta="/rol"></BotonVolver>
                        <h3 className="m-0 p-0"
                            style={{
                                borderBottom: "2px solid #67A147", width: "100%", fontWeight: "bold", color: "#67A147"
                            }}
                        >{props.match.params.nombre}
                        </h3>
                    </div>
                    <div className="row mt-2">

                        <div className="col-md-6 d-flex align-items-center flex-column">
                            <p className="font-weight-bold">Clases vistas</p>
                            <div id="chart">
                                <ReactApexChart
                                    options={chartCont.options}
                                    series={chartCont.series}
                                    type="radialBar" />
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante">
                                    <p>Unidad 2</p>
                                    <p className="font-weight-bold text-danger">En vivo</p>
                                    <p className="m-0"><b>Clase 1: </b>Sumas y Restas</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante">
                                    <p><b>Unidad 2:</b> Sin realizar</p>
                                </div>
                            </div>
                           
                        </div>
                        <div className="col-md-6 d-flex align-items-center flex-column">
                            <p className="text-center font-weight-bold">Actividades resueltas</p>
                            <div id="chart">
                                <ReactApexChart
                                    options={chartAct.options}
                                    series={chartAct.series}
                                    type="radialBar" />
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante card-actividad-estudiante-chart">
                                    <p><b>Unidad 1:</b>{serie ? 'Satisfactorio' : 'Insatisfactorio'} </p>
                                    <div className="chart-container">
                                        <ReactApexChart
                                            options={chartAct.options}
                                            series={chartAct.series}
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