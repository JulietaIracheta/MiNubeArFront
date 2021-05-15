import React from 'react'
import NavDocente from '../NavDocente'
import { Calculator, Gear, Palette, Laptop, Globe, Flower1, Flower2, ThermometerSun, VectorPen } from 'react-bootstrap-icons';
import { Calendar } from 'react-calendar';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

export default function CursosAsignadosDocente({ match, institucion = 'UNLAM' }) {
    console.log(match.params)
    console.log(institucion)
    //get cursos by institucion
    return (
        <div>
            <NavDocente></NavDocente>
            <div className="container cardContainer ">
                <div>
                    <h2 className="font-weight-bold colorDoc">{institucion}</h2>
                    <hr className="hr-colorDoc" />

                </div>
                <div className="row">
                    <div className="col-md-6 border-derecho">
                        <Link to='/docente/estudiantesAsignados' className='text-decoration-none'>
                            <div className="bordes mb-3">
                                <div className="card-body colorDoc font-weight-bold">
                                    <h5 className="card-title size espacio font-weight-bold colorDoc">Primero C</h5>
                                    <div className="text-left">
                                        <span>29 estudiantes</span>
                                        <div class="d-flex flex-row-reverse">
                                            <Gear /></div>
                                    </div>


                                </div>
                            </div>
                        </Link>

                    </div>
                    <div className="col-md-6 ">
                        <h2 className="font-weight-bold colorDoc">Ultimas Notificaciones</h2>
                        <br />
                        <ul className="colorNotificaciones">
                            <li>[12:05] Comentario de Lolo, Matematicas clase 2</li>
                            <li>[12:05] Comentario de Lolo, Matematicas clase 2</li>

                            <li>[12:05] Comentario de Lolo, Matematicas clase 2</li>

                            <li>[12:05] Comentario de Lolo, Matematicas clase 2</li>

                            <li>[12:05] Comentario de Lolo, Matematicas clase 2</li>

                            <li>[12:05] Comentario de Lolo, Matematicas clase 2</li>

                            <li>[12:05] Comentario de Lolo, Matematicas clase 2</li>

                        </ul>
                        <br></br>

                    </div>
                    <div className="col-md-12 colorDoc font-weight-bold" >
                        <div className="row">
                            <div className="col-md-3 ">
                                <div className="bordes">
                                    <div className="card-body escuela1">
                                        <h5 className="card-title size espacio font-weight-bold">Segundo B</h5>
                                        <div class="d-flex flex-row-reverse">
                                            <Gear />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 border-derecho">
                                <div className="bordes">
                                    <div className="card-body  escuela2">
                                        <h5 className="card-title size espacio font-weight-bold">Segundo A</h5>
                                        <div class="d-flex flex-row-reverse">
                                            <Gear />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div>
                                    <div className="card-body">
                                        <Calendar className='w-100' />
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