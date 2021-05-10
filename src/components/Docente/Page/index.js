import React, { Component, useState} from 'react'
import EscuelasDocente from '../EscuelasDocente.js'
import NavDocente from '../../NavDocente'

const Docente = () => {
        return (
            <div>
           <NavDocente />
           <EscuelasDocente />
           </div>
        )
    
}

export default Docente;