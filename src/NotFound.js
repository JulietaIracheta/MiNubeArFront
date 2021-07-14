import React from 'react'
import img from '../src/assets/img/pne.jpg'

const NotFound = () => {

        return (
            <div>
                <div className="container justify-content-center">
                 <img src={img} alt="not found" height="400px"/>   
                <a href="/rol" className="justify-content-center">Volver</a>
                </div>
            </div>
        )
}
export default NotFound;