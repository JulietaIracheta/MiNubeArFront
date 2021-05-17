import React from 'react'
import NavDocente from '../NavDocente'
import '../../assets/comunicado.css'
import ModalNuevoComunicado from './ModalNuevoComunicado'
import MenuLateralPrincipal from './MenuLateralPrincipal'


const DocenteComunicado = () => {
    return(
        <React.Fragment>
            <NavDocente></NavDocente>  
            <div className="container-fuid comunicado">
                <div className="d-sm-flex h-100">
                    <MenuLateralPrincipal
                        items= {[{nombre : 'Actividad Reciente', activo: false },
                                 {nombre: 'Cursos', activo: true},
                                 {nombre: 'Calificaciones', activo: false}
                                ]}
                    >
                    </MenuLateralPrincipal>
                    <div className="docente-comunicado-cuerpo col-12 col-md-9 pt-3">
                        <h2 className="docente__titulo pb-2 font-weight-bold">Escuela Primaria N° 12 - Primero C</h2>
                        <div className="comunicado__nav mb-3">
                            <ul className="nav flex-row justify-content-start">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/#">Estudiantes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/#">Materia</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="/#">Comunicados</a>
                                </li>
                            </ul> 
                        </div>
                         
                        <div className="comunicado__contenido d-sm-flex border">
                            <div className="comunicado__contenido--navbar border-right border-bottom pt-3 pl-0 pr-0 col-12 col-sm-3 col-lg-2">
                                <ul className="nav flex-column justify-content-start p-0 text-center">
                                    <li className="nav-item pl-2 pr-2 pl-lg-3 pr-lg-3 pt-1 pb-1">
                                        <ModalNuevoComunicado></ModalNuevoComunicado>                                    
                                    </li>
                                    <li className="nav-item mt-4 comunicado__contenido--link-activo">
                                        <a className="nav-link pl-0" href="/#">Grupales</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pl-0" href="/#">Particulares</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="comunicado_contenido--info w-md-75 p-4 p-sm-5">
                                <article className="pb-3">
                                    <h3 className="font-weight-bold">Acto día de la familia</h3>
                                    <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere assumenda minima sed ducimus, 
                                        consequatur ab repudiandae libero ullam eos asperiores debitis, consectetur nesciunt labore autem 
                                        ut explicabo ratione. Illo, est.
                                    </p>
                                </article>
                                <article>
                                    <h3 className="font-weight-bold">Actividades de invierno</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae nemo quia perspiciatis fuga 
                                        error cum iusto numquam, possimus tempore velit et, sint temporibus aut ex impedit iure maxime 
                                        veritatis libero.
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default DocenteComunicado;