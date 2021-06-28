import React from 'react';

const Encabezado = (props) => {
   
    return (          
        <div>
            <h2 className="mt-2">Hola {props.nombre}!</h2>
            <hr className="hr-color"/>
        </div>
    )
}

export default Encabezado;