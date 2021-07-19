import React from 'react';

const Encabezado = (props) => {
   
    return (          
        <div className="w-100">
            <h2 className="tituloadmin tituloEstudiante text-left">{props.texto}</h2>
            <p className="subtituloEstudiante">
                Acá podras ver las materias que estas cursando actualmente<br/>
                Si quieres ver más detalles entra a ellas.
            </p>
        </div>
    )
}

export default Encabezado;