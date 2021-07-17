import React from 'react';

const Encabezado = (props) => {
   
    return (          
        <div className="w-100">
            <h2 className="mt-2">{props.texto}</h2>
            <hr className="hr-color"/>
        </div>
    )
}

export default Encabezado;