import React, { useEffect, useState } from 'react'
import NavTutor from "./NavTutor";
import Sidebar from "../Sidebar";
import { SidebarDataTutor } from "../sideBar/SidebarDataTutor";
import '../../assets/css/comunicados/comunicados.css';
import { Cookies } from 'react-cookie';
import url from "../../url"

export default function ComunicadosEstudiante() {
    const [comunicados, setComunicados] = useState([]);
    const cookie = new Cookies();
    const jwt = cookie.get('jwt');

    useEffect(async function () {
        const url = `${url.url}/api/comunicado/getComunicadosByTutor?jwt=`+jwt
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
    }, []);

    return (
        <div>
            <NavTutor />
            <div className="flex">
                <Sidebar data={SidebarDataTutor} />
                <div className="main w-100 pr-2 pt-4">
                    <div className="row container">
                        <h2 className="tituloadmin tituloTutor">Comunicados</h2>
                    </div>
                    <div className="row m-0">
                        <div className="container-fluid comunicados-container">
                            <div className=" py-3 h-100 comunicados-overflow">
                                {comunicados.map((c, index) => {
                                    return <div key={index}>
                                        <div className="d-flex flex-column mt-3 p-2" style={{ borderBottom: "1px solid #cecece", backgroundColor:"rgba(103, 161, 71, 0.25)" }}>
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