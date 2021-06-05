import React, { useState, useEffect } from "react";
import BotonVolver from '../BotonVolver/botonVolver';
import Sidebar from '../Sidebar';
import NavDocente from './NavDocente';
import Contenido from '../Contenido/contenido';
import '../../assets/css/docente/docente.css'
import getContenidos from '../../services/contenido/getContenidos';
import { Link } from "react-router-dom";
import ModalDialogContenido from '../Contenido/ModalDialogContenido';

export default function ContenidoPorMateria({...props}) {

    const [contenidos, setContenidos] = useState([]);
    const [dialogContenido, setDialogContenido] = useState(false);

    useEffect(function () {
        getContenidos().then(contenidos => setContenidos(contenidos));
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
                <Sidebar />
                <div className="container-fluid mt-2 ">
                    <div className="d-flex align-items-center mt-1 w-100 justify-content-between">
                        <div className="w-100 d-flex justify-content-center">
                            <BotonVolver ruta="/docente/estudiantesAsignados"></BotonVolver>
                            <h3 className="m-0 p-0 color-docente borde-docente">Matemáticas</h3>
                        </div>
                        <div className="w-50 d-flex justify-content-around">
                            <Link to="/video" className="btn btn-outline-dark font-weight-bold">Clase en vivo</Link>
                            <button className="btn btn-outline-dark font-weight-bold" onClick={clickNuevaActividad}>Nueva clase grabada</button>
                            <ModalDialogContenido open={dialogContenido} handleClose={clickCerrarModalActividad} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mt-4 col-md-4" style={{ height: "10rem" }}>
                            <Contenido
                                titulo={contenidos.titulo}
                                descripcion={contenidos.descripcion}
                            />
                        </div>
                        <div className="mt-4 col-md-4" style={{ height: "10rem" }}>
                            <Contenido
                                titulo={contenidos.titulo}
                                descripcion={contenidos.descripcion}
                            />
                        </div>
                        <div className="mt-4 col-md-4" style={{ height: "10rem" }}>
                            <Contenido
                                titulo={contenidos.titulo}
                                descripcion={contenidos.descripcion}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}