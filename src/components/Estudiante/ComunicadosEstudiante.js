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
        const url = 'http://134.209.120.136:4000/api/comunicado/getComunicadosByEstudiante?jwt='+jwt
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
                <div className="container-fluid">
                    <div className="row container">
                        <h2 className="d-block w-100">Comunicados</h2>
                        <hr class="hr-color w-100" />
                        <div className="container-fluid comunicados-container">
                            <div className=" py-3 h-100 comunicados-overflow">
                                {comunicados.map((c, index) => {
                                    return <div key={index}>
                                        <div className="d-flex flex-column mt-3" style={{ borderBottom: "1px solid #707070" }}>
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
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}