import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import NavEstudiante from './NavEstudiante';
import { SidebarDataEstudiante } from "../sideBar/SidebarDataEstudiante";
import Sidebar from '../Sidebar';
import { Card, CardActions, CardContent, IconButton } from '@material-ui/core';
import ReactPlayer from 'react-player';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Moment from 'moment';

import {
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import { ToastProvider } from 'react-toast-notifications';
import { format } from 'date-fns';

export default function () {
    const cookie = new Cookies();
    const jwt = cookie.get('jwt');
    const [contenidos, setContenidos] = useState([]);
    const [abrirDetalleActividad, setAbrirDetalleActividad] = useState(false);
    const [detalleActividad, setDetalleActividad] = useState();

    useEffect(() => {
        var url = "http://localhost:60671/api/contenido/getContenidosHistoricos?jwt=" + jwt;
        fetch(url, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            credentials: "include",
        }).then(function (response) {
            console.log(response);
            return response.json();
        }).then(response => {
            console.log(response);
            setContenidos(response);
        });
    }, []);

    return (
        <div>
            <NavEstudiante />
            <div className="d-flex mt-1">
                <Sidebar data={SidebarDataEstudiante} />
                <div className="container">
                <h2 className="mt-2">Contenidos de años anteriores</h2>
                <hr class="hr-color"></hr>
                    <div className="row">
                    {contenidos ?
                        contenidos.map((contenido => (
                            <div className="col-md-4">
                                <Card>
                                    {contenido.video != "" ? 
                                    <ReactPlayer url={"http://localhost:60671/videos/"+contenido.video} 
                                    controls width="100%" height="12rem" style={{ minHeight: "12rem" }} 
                                                                       />
                                    :<div className="w-100" style={{height:"12rem",minHeight: "12rem"}}>
                                    </div>}

                                    <CardContent>
                                        <h6 className="font-weight-bold">
                                            {contenido.contenidoMateriaCurso[0].idMateriaCursoNavigation.
                                            idMateriaNavigation.nombre}{" Unidad - "}{contenido.unidad}
                                        </h6>
                                        <p>{contenido.titulo}</p>
                                        <p>{contenido.descripcion}</p>
                                <li>Subido el {Moment(contenido.fecha).format('DD/MM/YYYY')}</li>

                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <p className="color-docente font-weight-bold m-0">ACTIVIDAD</p>
                                        <div className="w-100 d-flex justify-content-end">
                                            {
                                                contenido.actividades.length ?
                                                    <div>
                                                        <IconButton>
                                                        <VisibilityIcon onClick={() =>  { console.log(contenido.actividades);setAbrirDetalleActividad(true); setDetalleActividad(contenido.actividades) }} />
                                                        </IconButton>
                                                    </div>
                                                    : ""
                                            }
                                        </div>
                                    </CardActions>
                                </Card>
                            </div>
                        )))
                        : "loading..."}
                    </div>
                    <Dialog open={abrirDetalleActividad} maxWidth="800">
            {detalleActividad? 
            
                <ToastProvider >
                    <div className="d-flex w-100 p-5">
                        <form
                            autoComplete="off"
                            noValidate
                            className="w-100"
                        >
                            <h5 className="mb-4">Actividad</h5>
                            <Grid container spacing={3}>
                                
                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    {console.log(detalleActividad[0].unidad)}
                                    <TextField
                                        name="unidad"
                                        variant="outlined"
                                        label="Unidad"
                                        value={detalleActividad[0].unidad}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={12} className="mt-4">
                                    <TextField
                                        name="titulo"
                                        variant="outlined"
                                        label="Titulo"
                                        value={detalleActividad[0].titulo}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={12} xl={12} lg={12} xs={12} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="question"
                                        variant="outlined"
                                        label="Pregunta"
                                        value={detalleActividad[0].questions[0].content}
                                        disabled
                                    />
                                </Grid>
                                {/*respuestas*/}

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="respuesta"
                                        variant="outlined"
                                        label="Respuesta"
                                        value={detalleActividad[0].questions[0].answers[0].content}
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        fullWidth
                                        disabled
                                        control={<Checkbox name="checked1" checked={detalleActividad[0].questions[0].answers[0].correct} />}
                                        label="Correcto"
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        className=""
                                        name="respuesta"
                                        variant="outlined"
                                        disabled
                                        label="Respuesta"
                                        value={detalleActividad[0].questions[0].answers[1].content}                                      
                                    />
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        disabled
                                        control={<Checkbox name="checked2" checked={detalleActividad[0].questions[0].answers[1].correct} />}
                                        label="Correcto"
                                    />
                                </Grid>

                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <TextField
                                        fullWidth
                                        name="respuesta"
                                        disabled
                                        variant="outlined"
                                        label="Respuesta"
                                        value={detalleActividad[0].questions[0].answers[2].content}/>
                                </Grid>
                                <Grid item md={6} xl={6} lg={6} xs={6} className="mt-4">
                                    <FormControlLabel
                                        disabled
                                        control={<Checkbox name="checked3" checked={detalleActividad[0].questions[0].answers[2].correct} />}
                                        label="Correcto"
                                    />
                                </Grid>
                              
                                <Grid item md={12} xl={12} lg={12} xs={12} className="mt-4">
                                    <Button
                                        fullWidth
                                        type="button"
                                        color="secondary"
                                        onClick={() => setAbrirDetalleActividad(false)}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>
                    </div>
                </ToastProvider>
                    : ""
                }

            </Dialog>
                </div>
            </div>
        </div>
    );
}