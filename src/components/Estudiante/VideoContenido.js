import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import getContenidos from '../../services/contenido/getContenidos';

const VideoContenido = ({idMateria}) => {

    const [contenidos, setContenidos] = useState([]);

    useEffect(function () {
        getContenidos(idMateria).then(contenidos => setContenidos(contenidos));
    }, []);

    console.log(contenidos);
    const url="http://134.209.120.136:4000/videos/"+contenidos.video;

    return (
        <div className="p-2"> 
            <ReactPlayer url={url} controls width="80%" height="50%" />
        </div>
    )
}

export default VideoContenido;
