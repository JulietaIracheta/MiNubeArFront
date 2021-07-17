import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import NavAdmin from "../Registro/NavAdmin";
import Sidebar from '../Sidebar';
import { SidebarData } from '../SidebarData';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 340,
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

export default function TrayectoriaAcademica() {
    const cookieNombreEstudiante = new Cookies();


    const [x, setX] = useState();
    useEffect(() => {
        fetch("http://134.209.120.136:4000/api/boletin/getBoletinesEstudiante/" + 1, {
            method: "GET",
            headers: { "Content-type": "application/json" },
            credentials: "include",
        }).then(res => {
            if (!res.ok) throw new Error('Response is NOT ok')
            return res.json()
        }).then(res => {
            setX(res);
        });
    }, []);


    return (
        <div>
            <NavAdmin />
            <div className="d-flex mt-1">
            <Sidebar data={SidebarData} />

            <div className="w-100 mt-5">
                <h2 className="text-center">Estadísticas de los usuarios de MiNube</h2>
                {x ?
                <>
                    <div class="content-trayectoria" style={{marginTop:"4rem"}}>
                        <div class="hexagon">
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Total de Estudiantes</Typography>
                                        <em>{"La cantidad de "} <b>{'estudiantes'}</b> {" que utilizan la plataforma como complemento para estudiar."}</em>
                                    </React.Fragment>
                                }
                            >
                                <Button style={{ width: "100%", fontSize: "35px", fontFamily: "cursive", fontWeight: "bold", color: "white" }}>
                                    {x.totalEstudiantes}
                                </Button>
                            </HtmlTooltip>
                        </div>

                        <div class="hexagon">
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Total de Instituciones</Typography>
                                        <em>{"La cantidad de "} <b>{'instituciones'}</b> {" que utilizan la plataforma para complementar su forma de educar."}</em>
                                    </React.Fragment>
                                }
                            >
                                <Button style={{ width: "100%", fontSize: "35px", fontFamily: "cursive", fontWeight: "bold", color: "white" }}>
                                    {x.totalInstituciones}
                                </Button>
                            </HtmlTooltip>
                        </div>
                        <div class="hexagon" style={{ fontSize: "14px" }}>
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Estudiante estrella</Typography>
                                        <em>{"El "} <b>{'estudiante'}</b> {" con mejor promedio de la plataforma."}</em>
                                    </React.Fragment>
                                }
                            >
                                <Button style={{ width: "100%", fontSize: "14px", fontFamily: "cursive", fontWeight: "bold", color: "white" }}>
                                    {x.estudiante}
                                </Button>
                            </HtmlTooltip>
                        </div>
                        <div class="hexagon">
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">El promedio más alto</Typography>
                                        <em>{"El "} <b>{' promedio '}</b> {" más alto durante el actual año lectivo."}</em>
                                    </React.Fragment>
                                }
                            >
                                <Button style={{ width: "100%", fontSize: "35px", fontFamily: "cursive", fontWeight: "bold", color: "white" }}>
                                    {x.mejorPromedio}
                                </Button>
                            </HtmlTooltip>
                        </div>
                        <div class="hexagon" style={{ fontSize: "14px" }}>
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Institución estrella</Typography>
                                        <em>{"La "} <b>{'institución'}</b> {" que tiene los estudiantes con mayor promedio."}</em>
                                    </React.Fragment>
                                }
                            >
                                <Button style={{ width: "100%", fontSize: "14px", fontFamily: "cursive", fontWeight: "bold", color: "white" }}> {x.colegioMejorPromedio}</Button>
                            </HtmlTooltip>
                        </div>

                        <div class="hexagon">
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Total de Docentes</Typography>
                                        <em>{"La cantidad de "} <b>{'docentes'}</b> {" que utilizan la plataforma organizar sus clases."}</em>
                                    </React.Fragment>
                                }
                            >
                                <Button style={{ width: "100%", fontSize: "35px", fontFamily: "cursive", fontWeight: "bold", color: "white" }}> {x.totalDocentes}</Button>
                            </HtmlTooltip>

                        </div>
                        <div class="hexagon">
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Total de Tutores</Typography>
                                        <em>{"La cantidad de "} <b>{'tutores'}</b> {" que utilizan la plataforma para ayudar a sus hijos."}</em>
                                    </React.Fragment>
                                }
                            >
                                <Button style={{ width: "100%", fontSize: "35px", fontFamily: "cursive", fontWeight: "bold", color: "white" }}>{x.totalTutores}</Button>
                            </HtmlTooltip>
                        </div>
                    </div>
                </>
                    : ""}
            </div>
            </div>
        </div>
    );


}