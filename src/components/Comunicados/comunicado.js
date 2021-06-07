import React, { useEffect, useState } from 'react';
import ModalDialogComunicado from './ModalDialogComunicado';
import getComunicados from '../../services/comunicados/getComunicados';
import  '../../assets/css/comunicados/comunicados.css';

export default function Comunicado({idCurso}) {
    const [dialogComunicado, setDialogComunicado] = useState(false);
    const [comunicados, setComunicados] = useState([]);

    useEffect(function () {
        getComunicados().then(comunicados => setComunicados(comunicados));
    }, []);

    const clickNuevoComunicado = () => {
        setDialogComunicado(true);
    };
    const cerrarModal = () => {
        setDialogComunicado(false);
    };
    return <div>
        <div className="container-fluid">
            <div className="row comunicados-container" style={{ border: "1px solid #707070" }}>
                <div className="col-md-3">
                    <div className="w-100 d-flex flex-column py-3">
                        <button className="btn btn-outline-dark btn-lg" onClick={clickNuevoComunicado}>Nuevo +</button>
                    </div>
                    <ModalDialogComunicado open={dialogComunicado} handleClose={cerrarModal} idCurso={idCurso} />
                </div>

                <div className="col-md-9 py-3 h-100 comunicados-overflow" style={{ borderLeft: "1px solid #707070" }}>
                    {comunicados.map(c => {
                        return <div>
                            <div className="d-flex flex-column mt-3" style={{borderBottom:"1px solid #707070"}}>
                                <span style={{fontSize:"14px", color:"#2d2f85"}} className="font-weight-bold">Para: 
                                    {c.idUsuarioNavigation.idPersonaNavigation.nombre} { }
                                    {c.idUsuarioNavigation.idPersonaNavigation.apellido}
                                </span>
                                <p>{c.descripcion}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}