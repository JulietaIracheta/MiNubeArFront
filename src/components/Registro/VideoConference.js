import React, {useState} from "react";
import { Jutsu } from 'react-jutsu'

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
    <div className="video">
      {call ? (<Jutsu
        roomName={room}
        password={password}
        displayName={name}
        onMeetingEnd={() => console.log('La reunión ha finalizado')}
        loadingComponent={<p>ʕ •ᴥ•ʔ jitsi está cargando ...</p>} />)
        : (
          <form>
            <input id='room' type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
            <input id='name' type='text' placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)} />
            <input id='password' type='text' placeholder='Password (opcional)' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleClick} type='submit'>
              Empezar / Unirte
            </button>
          </form>
        )}
    </div>
  )
};

export default VideoConference;
