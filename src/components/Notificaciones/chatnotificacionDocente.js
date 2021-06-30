import React, { useState, useEffect } from "react";
import Message from "./Message";
import {
    HubConnectionBuilder,
    LogLevel,
    HttpTransportType
} from "@microsoft/signalr";
import Chat from './chat';
import NavDocente from '../Docente/NavDocente';
import Sidebar from '../Sidebar';
import { SidebarDataDocente } from "../sideBar/SidebarDataDocente";
import './chat.css';
import { useCookies } from "react-cookie";
import InsertCommentIcon from '@material-ui/icons/InsertComment';

export default () => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState();
    const [rol, setRol] = useState();
    const [users, setUsers] = useState([]);
    const [cookie, setCookie] = useCookies();
    const [cursosDocente, setCursosDocente] = useState([]);

    useEffect(() => {
        (async () => {
            await fetch("http://localhost:60671/api/usuario/getChatsDocente", {
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
        <div>
            <NavDocente />
            <div className="flex">
                <Sidebar data={SidebarDataDocente} />
                <div className="container">
                    <h2 className="mt-2">Salas de chat</h2>
                    {!connection
                        ?
                        <div className="row">
                        {cursosDocente.map((u, idx) =>
                        <div className="col-md-6">
                        <div className="bordes mb-3">
                          <div className="card-body colorDoc font-weight-bold">
                            <h5 className="card-title font-weight-bold colorDoc">
                            Sala: {u}
                            </h5>
                            <div className="text-left">
                              <div class="d-flex flex-row-reverse">
                              <button key={idx} class="btn btn-lg ml-2 text-white" style={{background:"#2d2f85"}}
                                onClick={() => joinRoom(u)}>
                                <InsertCommentIcon />
                                Unirse</button>
                              </div>
                            </div>
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
                </div>
            </div>

        </div>
    );
};