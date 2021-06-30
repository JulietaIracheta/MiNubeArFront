import React, { useState, useEffect } from "react";
import Message from "./Message";
import {
    HubConnectionBuilder,
    LogLevel,
    HttpTransportType
} from "@microsoft/signalr";
import Chat from './chat';
import NavEstudiante from '../Estudiante/NavEstudiante';
import NavDocente from '../Docente/NavDocente';
import Sidebar from '../Sidebar';
import { SidebarDataEstudiante } from "../sideBar/SidebarDataEstudiante";
import { SidebarDataDocente } from "../sideBar/SidebarDataDocente";
import './chat.css';
import { useCookies } from "react-cookie";
import InsertCommentIcon from '@material-ui/icons/InsertComment';

export default () => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState();
    const [users, setUsers] = useState([]);
    const [cookie, setCookie] = useCookies();
    const [nombreSala, setNombreSala] = useState('');

    useEffect(() => {

        (async () => {
            fetch("http://localhost:60671/api/usuario/getUsuarioChatEstudiante", {
                method: 'GET',
                headers: { "Content-type": "application/json" },
                credentials: "include",
            }).then(res => {
                if (!res.ok) throw new Error('Response is NOT ok')
                return res.text()
            }).then(res => {
                setNombreSala(res);
            });
        })();
    }, []);

    const joinRoom = async (e) => {
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
        <div>
            <NavEstudiante />
            <div className="flex">
                <Sidebar data={SidebarDataEstudiante} />
                <div className="container">
                    <h2 className="mt-2">Salas de chat</h2>
                    {!connection
                        ?
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <div className="card-body card-materia-estudiante font-weight-bold">
                                        <h5 className="card-title font-weight-bold" style={{color:"#B61915"}}>
                                            Sala de mi curso
                                        </h5>
                                        <div className="text-left">
                                            <div class="d-flex flex-row-reverse">
                                                <button class="btn btn-lg ml-2 text-white" style={{ background: "#B61915" }}
                                                    onClick={joinRoom}>
                                                    <InsertCommentIcon />
                                                    Unirse</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <Chat messages={messages}
                            sendMessage={sendMessage}
                            closeConnection={closeConnection}
                            users={users} />
                    }
                </div>
            </div>

        </div>
    );
};