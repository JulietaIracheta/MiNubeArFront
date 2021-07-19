import React, { useEffect, useState } from 'react'
import NavEstudiante from "./NavEstudiante";
import Sidebar from "../Sidebar";
import { SidebarDataEstudiante } from "../sideBar/SidebarDataEstudiante";
import '../../assets/css/comunicados/comunicados.css';
import { Cookies } from 'react-cookie';

export default function ComunicadosEstudiante() {
    const [comunicados, setComunicados] = useState([]);
    const cookie = new Cookies();
    const jwt = cookie.get('jwt');

    useEffect(async function () {
        const url = 'http://localhost:60671/api/comunicado/getComunicadosByEstudiante?jwt=' + jwt
        return await fetch(url, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            credentials: "include",
        }).then(res => {
            if (!res.ok) throw new Error('Response is NOT ok')
            return res.json()
        }).then(res => {
            setComunicados(res);
        });
    }, [])
    return (
        <div>
            <NavEstudiante />
            <div className="flex">
                <Sidebar data={SidebarDataEstudiante} />
                <div className="main w-100 pr-2 pt-4">
                    <div className="row container">
                        <h2 className="tituloadmin tituloEstudiante">Comunicados</h2>
                    </div>
                    <div className="row m-0">
                        {/* <hr class="hr-color w-100" /> */}
                        <div className="container-fluid comunicados-container">
                            <div className="py-3 h-100 comunicados-overflow">
                                {comunicados.length ?
                                    comunicados.map((c, index) => {
                                        return <div key={index}>
                                            <div className="d-flex flex-column mt-3 p-2" style={{ borderBottom: "1px solid #cecece", backgroundColor:"rgba(182, 25, 21, .08)" }}>
                                                <span style={{ fontSize: "14px", color: "#2d2f85" }} className="font-weight-bold">
                                                    {c.fecha}
                                                </span>
                                                <p>
                                                    <span className="font-weight-bold">
                                                        {c.docente}
                                                    </span>{": "}{c.descripcion}
                                                </p>
                                            </div>
                                        </div>
                                    })
                                    : <h6 className="text-left">Parece que todavía no tiene ningún comunicado.</h6>}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

       
    )
}