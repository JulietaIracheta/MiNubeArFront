import React, {useState} from 'react'
import NavDocente from './../NavDocente'
import '../../assets/comunicado.css'
import MenuLateralPrincipal from './../Docente/MenuLateralPrincipal'


const InstitucionesEditar = () => {
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
                            <h2 className="docente__titulo font-weight-bold align-self-center mt-2">Editar Institución</h2>
                        </div>
                         
                        <div className="comunicado__contenid d-flex justify-content-center mt-5">
                            <form className="p-4 border">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" name="nombre" className="form-control" id="nombre" value='Escuela técnica n°17' />
                                </div>
                                <div className="form-group">
                                    <label>Barrio</label>
                                    <input type="text" className="form-control" id="barrio" value='San Justo'/>
                                </div>

                                <div className="form-group">
                                    <label>Tipo</label>
                                    <select className="form-control" id="tipo">
                                    <option>PUBLICA</option>
                                    <option>PRIVADA</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-outline-primary float-right ml-1 mt-2">Guardar</button>
                                    <button type="submit" className="btn btn-secondary float-right ml-1 mt-2">Cancelar</button>
                                </div>
                            </form>
                     </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default InstitucionesEditar;