import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import getContenidos from '../../services/contenido/getContenidos';

const VideoContenido = ({ idMateria,contenido,setAct }) => {

    const [contenidos, setContenidos] = useState([]);

    /*useEffect(function () {
        //getContenidos(idMateria, 1).then(contenidos => setContenidos(contenidos));
    }, []);*/
    useEffect(() => {
        (async () => {
          const response = await fetch("http://localhost:60671/api/contenido/"+contenido, {
            headers: { "Content-type": "application/json" },
            credentials: "include",
          });
          const res = await response.json();    
          setContenidos(res);
        })();
      },[]);

    return (
        <div className="p-2">
            {
                contenidos?
                <ReactPlayer url={"http://localhost:60671/videos/" + contenidos.video} controls width="80%" height="50%" onEnded={()=>setAct(true)} />

                :""
            }
        </div>
    )
}

export default VideoContenido;
