import React, { useState, useEffect } from "react";
import {
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import Chat from './chat';
import NavDocente from '../Docente/NavDocente';
import Sidebar from '../Sidebar';
import { SidebarDataDocente } from "../sideBar/SidebarDataDocente";
import './chat.css';
import { useCookies } from "react-cookie";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Cookies } from 'react-cookie';

export default () => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState();
    const [rol, setRol] = useState();
    const [users, setUsers] = useState([]);
    const [cookie, setCookie] = useCookies();
    const [cursosDocente, setCursosDocente] = useState([]);
    const getCookie = new Cookies();
    const jwt = getCookie.get('jwt');

    useEffect(() => {
        (async () => {
            await fetch("http://localhost:60671/api/usuario/getChatsDocente?jwt="+jwt, {
                method: 'GET',
                headers: { "Content-type": "application/json" },
                credentials: "include",
            }).then(res => {
                if (!res.ok) throw new Error('Response is NOT ok')
                return res.json()
            }).then(res => {
                setCursosDocente(res);
            });
        })();
    }, []);

    const joinRoom = async (nombreSala) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:60671/chatHub")
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("UsersInRoom", (users) => {
                setUsers(users);
            });

            conn.on("ReceiveMessage", (user, msj) => {
                setMessages(messages => [...messages, { user, msj }]);
            });

            conn.onclose(e => {
                setConnection();
                setMessages([]);
                setUsers([]);
            });

            await conn.start();

            const objs = {
                user: cookie.nombrePersona + " " + cookie.apellidoPersona,
                room: nombreSala.toString()
            }
            await conn.invoke("JoinRoom", objs)

            setConnection(conn);

        } catch (e) {
            console.log(e)
        }
    }
    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }
    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <NavDocente />
            <div className="flex">
                <Sidebar data={SidebarDataDocente} />
                <main className="main w-100 pr-2 pt-4">
                    <div className="mb-4 pl-3 pl-sm-2">
                        <span className="tituloadmin tituloDocente">Salas de chat</span>
                        <p className="text-secondary">
                            En esta sección tiene todas las salas de chat<br/>
                            por cada uno de los cursos que tiene a cargo.
                        </p>
                    </div>
                    {!connection
                        ?
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 m-0">
                        {cursosDocente.map((u, idx) =>
                        <div className="col mb-4">
                          <div className="card container bordes">
                            <h5 className="card-title pt-3 pl-2 card-title-docente">
                                {u}
                            </h5>
                            <div className="card-body">
                              <button key={idx} class="btn btn-md ml-0 ml-sm-2  text-white float-right" style={{background:"#2d2f85"}}
                                onClick={() => joinRoom(u)}>
                                <InsertCommentIcon />
                                Unirse</button>
                            </div>
                          </div>
                      </div>
                        )}
                        </div>
                        :
                        <Chat messages={messages}
                            sendMessage={sendMessage}
                            closeConnection={closeConnection}
                            users={users} />
                            
                    }
                </main>
            </div>
          
        </>
    );
};