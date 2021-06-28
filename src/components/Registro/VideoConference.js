import React, { useState } from "react";
import { Jutsu } from "react-jutsu";
import BotonVolver from "../BotonVolver/botonVolver";
import NavDocente from "../Docente/NavDocente";
import Sidebar from "../Sidebar";
import { SidebarDataDocente } from "../sideBar/SidebarDataDocente";
import { Link } from "react-router-dom";
import ModalDialogContenido from "../Contenido/ModalDialogContenido";
import ReactCircleModal from "react-circle-modal";
import WhiteBoard from "../Pizarra/HomePage";
import Tools from "../Pizarra/components/tools";
import History from "../Pizarra/components/history";

const VideoConference = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [call, setCall] = useState(false);
  const [password, setPassword] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if (room && name) setCall(true);
  };

  return (
    <div>
      <NavDocente></NavDocente>

      <div className="d-flex ">
        <Sidebar data={SidebarDataDocente} />

        <div className="container-fluid mt-4">
          <div className="d-flex align-items-center mt-1 w-100 justify-content-between">
            <div className="w-100 d-flex justify-content-center">
              <h3 className="m-0 p-0 color-docente borde-docente">
                Clase en Vivo
              </h3>
            </div>
            <div className="w-50 d-flex justify-content-around">
              <ReactCircleModal
                backgroundColor="#97349a"
                toogleComponent={(onClick) => (
                  <button
                    className="btn btn-outline-dark font-weight-bold"
                    onClick={onClick}
                  >
                    Abrir Pizarra
                  </button>
                )}
                offsetX={0}
                offsetY={0}
              >
                {(onClick) => (
                  <div style={{ backgroundColor: "#fff", padding: "1em" }}>
                   
                        <WhiteBoard />
                    <button onClick={onClick}>Click para cerrar pizarra</button>
                  </div>
                )}
              </ReactCircleModal>
            </div>
          </div>
          {call ? (
            <div
              className="container-fluid mt-5 w-100 "
              style={{ height: "70vh" }}
            >
              <Jutsu
                containerStyles={{ width: "100%", height: "100%" }}
                roomName={room}
                password={password}
                displayName={name}
                width="100%"
                height="100%"
                onMeetingEnd={() => window.location.reload()}
                loadingComponent={<p>ʕ •ᴥ•ʔ jitsi está cargando ...</p>}
              />
            </div>
          ) : (
            <div className="container">
              <div className="form-row mt-5">
                <div className="col-3">
                  <input
                    id="room"
                    className="form-control"
                    type="text"
                    placeholder="Room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <input
                    id="name"
                    className="form-control"
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <input
                    id="password"
                    className="form-control"
                    type="text"
                    placeholder="Password (opcional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <button
                    onClick={handleClick}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Empezar / Unirte
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
