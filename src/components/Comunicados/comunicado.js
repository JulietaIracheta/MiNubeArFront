import React, { useEffect, useState } from 'react';
import ModalDialogComunicado from './ModalDialogComunicado';
import getComunicados from '../../services/comunicados/getComunicados';

export default function Comunicado() {
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
            <div className="row" style={{ border: "1px solid #707070" }}>
                <div className="col-md-3">
                    <div className="w-100 d-flex flex-column py-3">
                        <button className="btn btn-outline-dark btn-lg" onClick={clickNuevoComunicado}>Nuevo +</button>
                        <p className="font-size-24 mt-4 active-comunicado">Grupales</p>
                        <p className="font-size-24">Particulares</p>
                    </div>
                    <ModalDialogComunicado open={dialogComunicado} handleClose={cerrarModal} />

                </div>

                <div className="col-md-9 py-3" style={{ borderLeft: "1px solid #707070" }}>
                    {comunicados.map(c => {
                        return <div>
                            <div className="d-flex flex-column mt-3" style={{borderBottom:"1px solid #707070"}}>
                                <p>{c.descripcion}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}