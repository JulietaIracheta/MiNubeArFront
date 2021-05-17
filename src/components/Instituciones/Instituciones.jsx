import React from 'react'
import NavDocente from './../NavDocente'
import '../../assets/comunicado.css'
import MenuLateralPrincipal from './../Docente/MenuLateralPrincipal'
import { Search, ThreeDotsVertical, Plus} from 'react-bootstrap-icons'
import { Button } from 'reactstrap';


const Instituciones = () => {
    return(
        <React.Fragment>
            <NavDocente></NavDocente>  
            <div className="container-fuid comunicado">
                <div className="d-sm-flex h-100">
                    <MenuLateralPrincipal
                        items= {[{nombre : 'Historial', activo: false },
                                 {nombre: 'Instituciones', activo: true},
                                 {nombre: 'Usuarios', activo: false},
                                 {nombre: 'Cursos', activo: false}
                                ]}
                    >
                    </MenuLateralPrincipal>
                    <div className="docente-comunicado-cuerpo col-12 col-md-9 pt-3">
                        <div className="d-flex flex-column flex-sm-row justify-content-between  border-bottom mb-3 pb-2">
                            <h2 className="docente__titulo font-weight-bold align-self-center mt-2">Bienvenido Admin</h2>
                            <div className="buscador_add_contenido d-flex flex-row flex-sm-row  justify-content-between">
                                <div className="mx-auto">
                                    <div className="input-group">
                                        <input className="form-control border-end-0 border mt-1" type="text"  id="example-search-inpu" />
                                        <span className="input-group-append mr-4 mt-1">
                                            <button className="btn btn-outline-secondary bg-white border border-left-0 ms-n5" type="button">
                                                <Search></Search>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <Button 
                                    color="btn-outline-primary" 
                                    variant="outline-primary"
                                    className="btn btn-outline-primary d-none d-lg-block"
                                    >
                                        Nuevo +
                                </Button>
                                <Button 
                                    color="btn-outline-primary" 
                                    variant="outline-primary"
                                    className="btn btn-outline-primary d-block d-lg-none rounded-circle"
                                    >
                                        <Plus></Plus>  
                                </Button>
                            </div>
                        </div>
                         
                        <div className="comunicado__contenid d-sm-flex table-responsive">
                            <table class="table table-hover border">
                                <thead>
                                    <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Barrio</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>I.B.A</td>
                                        <td>Isidro Casanova</td>
                                        <td>PRIVADA</td>
                                        <td><ThreeDotsVertical></ThreeDotsVertical></td>
                                    </tr>
                                    <tr>
                                        <td>E.E.S.T N°7</td>
                                        <td>La Ferrere</td>
                                        <td>PUBLICADA</td>
                                        <td><ThreeDotsVertical></ThreeDotsVertical></td>
                                    </tr>
                                    <tr>
                                        <td>E.E.S.T N°1</td>
                                        <td>san Justo</td>
                                        <td>PUBLICA</td>
                                        <td><ThreeDotsVertical></ThreeDotsVertical></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Instituciones;