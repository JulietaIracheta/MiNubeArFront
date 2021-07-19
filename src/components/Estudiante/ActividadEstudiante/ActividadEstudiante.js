import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'
import Chart from '../../Chart/chart';
import NavTutor from '../../Tutor/NavTutor';
import '../../../assets/css/css-actividad-estudiante.css'
import BotonVolver from "../../BotonVolver/botonVolver";
import Sidebar from "../../Sidebar";
import {SidebarDataTutor} from '../../sideBar/SidebarDataTutor';
import url from "../../../url"

export default function ApexChart() {
    const [serie, setSerie] = useState(0);
    const chartAct = Chart({ series : parseInt(serie) });
    const chartCont = Chart({ series : 68 });
    
    useEffect(function () {
        fetch(`${url.url}/api/actividades/calcularAvance`, {
            method: 'GET'
        }).then(res => {
            if (!res.ok) alert('error')
            return res.json()
        }).then(res => {
            setSerie(res);
            console.log(serie)
        });
    }, []);


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
                                    options={chartCont.options}
                                    series={chartCont.series}
                                    type="radialBar" />
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante">
                                    <p>Unidad 5</p>
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
                                            options={chartAct.options}
                                            series={chartAct.series}
                                            type="radialBar" />
                                    </div>
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
                                    <p><b>Unidad 6:</b> Satisfactorio</p>
                                    <div className="chart-container">
                                        <ReactApexChart
                                            options={chartAct.options}
                                            series={chartAct.series}
                                            type="radialBar" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante card-actividad-estudiante-chart">
                                    <p><b>Unidad 6:</b> Satisfactorio</p>
                                    <div className="chart-container">
                                        <ReactApexChart
                                            options={chartAct.options}
                                            series={chartAct.series}
                                            type="radialBar" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-actividad-estudiante card-actividad-estudiante-chart">
                                    <p><b>Unidad 6:</b> Satisfactorio</p>
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