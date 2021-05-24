import React from 'react';
import ReactApexChart from 'react-apexcharts'
import Chart from '../../Chart/chart';
import NavTutor from '../../Tutor/NavTutor';
import '../../../assets/css/css-actividad-estudiante.css'
import BotonVolver from "../../BotonVolver/botonVolver";
import Sidebar from "../../Sidebar";

export default function ApexChart() {
    const chart = Chart({ series: 56 });
    console.log(chart)
    return (
        <div>
            <NavTutor></NavTutor>
            <div className="d-flex mt-1 borde-tutor">
                <Sidebar />
                <div className="container">
                    <div className="d-flex align-items-center mt-1">
                        <BotonVolver></BotonVolver>
                        <h3 className="m-0 p-0"
                            style={{
                                borderBottom: "2px solid #67A147", width: "100%", fontWeight: "bold", color: "#67A147"
                            }}
                        >Matemáticas
                        </h3>
                    </div>
                    <div className="row mt-1">
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

        </div >
    );
}