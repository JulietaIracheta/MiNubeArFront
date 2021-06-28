import React, { useState, useEffect } from "react";
import BotonVolver from '../BotonVolver/botonVolver';
import Sidebar from '../Sidebar';
import NavDocente from './NavDocente';
import Contenido from '../Contenido/contenido';
import '../../assets/css/docente/docente.css'
import getContenidos from '../../services/contenido/getContenidos';
import { Link } from "react-router-dom";
import ModalDialogContenido from '../Contenido/ModalDialogContenido';
import { SidebarDataDocente } from '../sideBar/SidebarDataDocente';

export default function ContenidoPorMateria({ ...props }) {

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
                <Sidebar data={SidebarDataDocente} />
                <div className="container-fluid mt-2 ">
                    <div className="d-flex align-items-center mt-1 w-100 justify-content-between">
                        <div className="w-100 d-flex justify-content-center">
                            <h3 className="m-0 p-0 color-docente borde-docente">Matemáticas - {props.match.params.materiaId}</h3>
                        </div>
                        <div className="w-50 d-flex justify-content-around">
                            <Link to="/video" className="btn btn-outline-dark font-weight-bold">Clase en vivo</Link>
                            <button className="btn btn-outline-dark font-weight-bold" onClick={clickNuevaActividad}>Nueva clase grabada</button>
                            <ModalDialogContenido open={dialogContenido} handleClose={clickCerrarModalActividad} />
                        </div>
                    </div>
                    <div className="row">
                        {contenidos?.map(contenido => {
                            return <div className="mt-4 col-md-4" style={{ minHeight: "10rem" }}>
                                <Contenido
                                    titulo={contenido.titulo}
                                    descripcion={contenido.descripcion}
                                    video={contenido.video}
                                />
                            </div>
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}