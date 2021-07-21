import React from 'react'
import { Link } from 'react-router-dom';
import logo from './assets/img/logoColor_bggris.jpeg'

const NotFound = () => {
        return (
            <div className="d-flex justify-content-center align-items-center w-100" style={{height:"100vh" ,backgroundColor:"#f7f7f7"}}>
                <div className="container d-flex flex-column justify-content-center">
                   <img src={logo} className="ml-auto mr-auto" alt="not found" width="300px"/> 
                   <h1 className="text-center display-3">404</h1>  
                   <h3 className="text-center text-secondary">Página no encontrada</h3>
                   <p className="text-center text-secondary">La página que estas buscando no esta disponible.</p>
                   <Link to="/rol" className="mt-3 btn w-auto btn-sm btn-primary m-auto rounded rounded-sm-pill">Volver al Inicio</Link>
                </div>
            </div>
        )
}
export default NotFound;