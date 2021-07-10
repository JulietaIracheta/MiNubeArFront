import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import getContenidos from '../../services/contenido/getContenidos';

const VideoContenido = () => {

    const [contenidos, setContenidos] = useState([]);

    useEffect(function () {
        getContenidos().then(contenidos => setContenidos(contenidos));
    }, []);


    const url="http://localhost:60671/videos/"+contenidos.video;

    return (
        <div className="p-2"> 
            <ReactPlayer url={url} controls width="80%" height="50%" />
        </div>
    )
}

export default VideoContenido;
