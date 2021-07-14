import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import getContenidos from '../../services/contenido/getContenidos';

const VideoContenido = ({ idMateria }) => {

    const [contenidos, setContenidos] = useState([]);

    useEffect(function () {
        getContenidos(idMateria, 1).then(contenidos => setContenidos(contenidos));
    }, []);

    console.log(contenidos);

    return (
        <div className="p-2">
            {
                contenidos?
                <ReactPlayer url={"http://localhost:60671/videos/" + contenidos[0]?.video} controls width="80%" height="50%" />

                :""
            }
        </div>
    )
}

export default VideoContenido;
