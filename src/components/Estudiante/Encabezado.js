import React from 'react';

const Encabezado = (props) => {
   
    return (          
        <div>
            <h2>{props.texto}</h2>
            <hr className="hr-color"/>
        </div>
    )
}

export default Encabezado;