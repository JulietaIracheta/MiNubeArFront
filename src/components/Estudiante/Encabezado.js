import React from 'react';

const Encabezado = (props) => {
   
    return (          
        <div>
            <h2>Bienvenido {props.nombre}</h2>
            <hr className="hr-color"/>
        </div>
    )
}

export default Encabezado;