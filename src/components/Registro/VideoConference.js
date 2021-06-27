import React, { useState } from "react";
import { Jutsu } from 'react-jutsu'
import BotonVolver from "../BotonVolver/botonVolver";
import NavDocente from '../Docente/NavDocente';
import Sidebar from "../Sidebar";
import {SidebarDataDocente} from "../sideBar/SidebarDataDocente";

const VideoConference = () => {
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')

  const handleClick = event => {
    event.preventDefault()
    if (room && name) setCall(true)
  }

  return (
    <div>
      <NavDocente></NavDocente>

      <div className="d-flex ">
        <Sidebar data={SidebarDataDocente} />

        <div className="container-fluid mt-4">
          <div className="d-flex align-items-center mt-1">
            <h3 className="m-0 p-0"
              style={{
                borderBottom: "2px solid #2d2f85", width: "100%", fontWeight: "bold", color: "#2d2f85"
              }}
            >Matemáticas - Clase en vivo
                        </h3>
          </div>
          {call ? (
            <div className="container-fluid mt-5 w-100 " style={{height:"70vh"}}>
              <Jutsu
                containerStyles = { {  width : '100%' ,  height : '100%'  } }
                roomName={room}
                password={password}
                displayName={name}
                width="100%"
                height="100%"
                onMeetingEnd={() => window.location.reload()}
                loadingComponent={<p>ʕ •ᴥ•ʔ jitsi está cargando ...</p>} />
            </div>
          ): (
              <div className="container">
                <div className="form-row mt-5 formulario-clase-vivo-responsive">
                  <div className="col">
                    <input id='room' className="form-control" type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
                  </div>
                  <div className="col">
                    <input id='name' className="form-control" type='text' placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col">
                    <input id='password' className="form-control" type='text' placeholder='Password (opcional)' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="col">

                    <button onClick={handleClick} type='submit' className="btn btn-primary">
                      Empezar / Unirte
            </button>
                  </div>

                </div>

              </div>
            )}
        </div>
      </div>
    </div>
  )
};

export default VideoConference;
