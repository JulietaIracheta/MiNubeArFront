import React, {useState} from 'react'
import NavDocente from './../NavDocente'
import '../../assets/comunicado.css'
import MenuLateralPrincipal from './../Docente/MenuLateralPrincipal'


const CursosEditar = () => {
    return(
        <React.Fragment>
            <NavDocente></NavDocente>  
            <div className="container-fuid comunicado">
                <div className="d-sm-flex h-100">
                    <MenuLateralPrincipal
                        items= {[
                                 {nombre: 'Instituciones', activo: false},
                                 {nombre: 'Usuarios', activo: false},
                                 {nombre: 'Cursos', activo: true}
                                ]}
                    >
                    </MenuLateralPrincipal>
                    <div className="docente-comunicado-cuerpo col-12 col-md-9 pt-3">
                        <div className="d-flex flex-column flex-sm-row justify-content-between  border-bottom mb-3 pb-2">
                            <h2 className="docente__titulo font-weight-bold align-self-center mt-2">Editar Curso</h2>
                        </div>
                         
                        <div className="comunicado__contenid d-flex justify-content-center mt-5">
                            <form className="p-4 border">
                                <div className="form-group">
                                    <label>Código</label>
                                    <input type="text" name="codigo" className="form-control" id="codigo" value='8978-5645' />
                                </div>
                                <div className="form-group">
                                    <label>Institución</label>
                                    <input type="text" className="form-control" id="institucion" value='Instituto Puzzurno'/>
                                </div>
                                <div className="form-group">
                                    <label>Curso</label>
                                    <input type="text" className="form-control" id="curso" value='Primero A'/>
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


export default CursosEditar;