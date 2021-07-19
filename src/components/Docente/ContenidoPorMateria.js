import React, { useState, useEffect } from "react";
import BotonVolver from '../BotonVolver/botonVolver';
import Sidebar from '../Sidebar';
import NavDocente from './NavDocente';
import Contenido from '../Contenido/contenido';
import '../../assets/css/docente/docente.css'
import getContenidos from '../../services/contenido/getContenidos';
import { Link, useHistory } from "react-router-dom";
import ModalDialogContenido from '../Contenido/ModalDialogContenido';
import { SidebarDataDocente } from '../sideBar/SidebarDataDocente';
import '../../assets/css/contenido/css-contenido.css';
import url from "../../url"

export default function ContenidoPorMateria({ id, set, ...props }) {
    const [contenidos, setContenidos] = useState([]);
    const [dialogContenido, setDialogContenido] = useState(false);
    const [materia, setMateria] = useState('');

    useEffect(function () {
        getContenidos(props.match.params.materiaId, props.match.params.cursoId).then(contenidos => setContenidos(contenidos));
    }, []);
    useEffect(function () {
        const urlB = `${url.url}/api/materias/` + props.match.params.materiaId;
        return fetch(urlB, {
            method: 'GET'
        }).then(res => {
            if (!res.ok) throw new Error('Response is NOT ok')
            return res.json()
        }).then(res => {
            setMateria(res);
        });
    }, []);

    const clickNuevaActividad = () => {
        setDialogContenido(true);
    };
    const clickCerrarModalActividad = () => {
        setDialogContenido(false);
    };
    return (
        <div>
            <NavDocente></NavDocente>
            <div className="d-flex mt-1 borde-tutor">
                <Sidebar data={SidebarDataDocente} />
                {console.log(contenidos)}
                <div className="container-fluid mt-2 ">
                    <div className="d-flex align-items-center mt-1 w-100 justify-content-between contenido-container-accion-responsive">
                        <div className="w-100 d-flex justify-content-center">
                            {materia ?
                                <h3 className="m-0 p-0 color-docente borde-docente">{materia.nombre}</h3>
                                : ""
                            }
                        </div>
                        <div className="d-flex justify-content-around contenido-acciones-responsive">
                            <Link to="/video" className="btn btn-outline-dark font-weight-bold">Clase en vivo</Link>
                            <button className="btn btn-outline-dark font-weight-bold" onClick={clickNuevaActividad}>Nueva clase grabada</button>
                            <ModalDialogContenido
                                idCurso={props.match.params.cursoId}
                                idMateria={props.match.params.materiaId}
                                open={dialogContenido}
                                handleClose={clickCerrarModalActividad} />
                        </div>
                    </div>
                    <div className="row">
                        {contenidos?.map((contenido, index) => {
                            return <div key={index} className="mt-4 col-md-4 card-contenido-responsive" style={{ minHeight: "10rem" }}>

                                <Contenido
                                    control={true}
                                    idCurso={props.match.params.cursoId}
                                    idMateria={props.match.params.materiaId}
                                    id={contenido.idContenido}
                                    unidad={contenido.unidad}
                                    titulo={contenido.titulo}
                                    descripcion={contenido.descripcion}
                                    video={contenido.video}
                                    actividad={contenido.actividades}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}