import React, {useState} from 'react'
import NavDocente from './../NavDocente'
import '../../assets/comunicado.css'
import MenuLateralPrincipal from './../Docente/MenuLateralPrincipal'
import ModalNuevoCurso from './ModalNuevoCurso'
import { Search, ThreeDotsVertical } from 'react-bootstrap-icons'
import { Button,  Popover, PopoverHeader, PopoverBody, ButtonToggle } from 'reactstrap';


const Cursos = () => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    
    const [popoverOpen2, setPopoverOpen2] = useState(false);
    const toggle2 = () => setPopoverOpen2(!popoverOpen2);
    
    const [popoverOpen3, setPopoverOpen3] = useState(false);
    const toggle3 = () => setPopoverOpen3(!popoverOpen3);
    
    const [popoverOpen4, setPopoverOpen4] = useState(false);
    const toggle4 = () => setPopoverOpen4(!popoverOpen4);

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
                            <h2 className="docente__titulo font-weight-bold align-self-center mt-2">Bienvenido Admin</h2>
                            <div className="buscador_add_contenido d-flex flex-row flex-sm-row justify-content-between">
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
                                <ModalNuevoCurso></ModalNuevoCurso> 
                            </div>
                        </div>
                         
                        <div className="comunicado__contenid d-sm-flex table-responsive">
                            <table className="table table-hover border">
                                <thead>
                                    <tr>
                                    <th>Código</th>
                                    <th scope="col">Institución</th>
                                    <th scope="col">Curso</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td key="1256-5689">1256-5689</td>
                                        <td>I.B.A</td>
                                        <td>Primero C</td>
                                            {/* <td><ThreeDotsVertical></ThreeDotsVertical></td> */}
                                        <td>
                                            <div>
                                                <Button id="Popover1" type="button" className="bg-transparent border-0 text-dark p-0 m-0">
                                                    <ThreeDotsVertical></ThreeDotsVertical>
                                                </Button>
                                                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                                                    <PopoverHeader>Elija una operación</PopoverHeader>
                                                    <PopoverBody>
                                                        <ButtonToggle color="danger">Eliminar</ButtonToggle>{' '}
                                                        <ButtonToggle color="warning">Editar</ButtonToggle>{' '}
                                                    </PopoverBody>
                                                </Popover>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td key="1256-5622">1256-5622</td>
                                        <td>I.B.A</td>
                                        <td>Primero A</td>
                                            <td>
                                            <div>
                                                <Button id="Popover2" type="button" className="bg-transparent border-0 text-dark p-0 m-0">
                                                    <ThreeDotsVertical></ThreeDotsVertical>
                                                </Button>
                                                <Popover placement="bottom" isOpen={popoverOpen2} target="Popover2" toggle={toggle2}>
                                                    <PopoverHeader>Elija una operación</PopoverHeader>
                                                    <PopoverBody>
                                                        <ButtonToggle color="danger">Eliminar</ButtonToggle>{' '}
                                                        <ButtonToggle color="warning">Editar</ButtonToggle>{' '}
                                                    </PopoverBody>
                                                </Popover>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td key="8978-5896">8978-5896</td>
                                        <td>Instituto Puzzurno</td>
                                        <td>Segundo A</td>
                                        <td>
                                            <div>
                                                <Button id="Popover3" type="button" className="bg-transparent border-0 text-dark p-0 m-0">
                                                    <ThreeDotsVertical></ThreeDotsVertical>
                                                </Button>
                                                <Popover placement="bottom" isOpen={popoverOpen3} target="Popover3" toggle={toggle3}>
                                                    <PopoverHeader>Elija una operación</PopoverHeader>
                                                    <PopoverBody>
                                                        <ButtonToggle color="danger">Eliminar</ButtonToggle>{' '}
                                                        <ButtonToggle color="warning">Editar</ButtonToggle>{' '}
                                                    </PopoverBody>
                                                </Popover>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td key="8978-5645">8978-5645</td>
                                        <td>Instituto Puzzurno</td>
                                        <td>Primero A</td>
                                        <td>
                                            <div>
                                                <Button id="Popover4" type="button" className="bg-transparent border-0 text-dark p-0 m-0">
                                                    <ThreeDotsVertical></ThreeDotsVertical>
                                                </Button>
                                                <Popover placement="bottom" isOpen={popoverOpen4} target="Popover4" toggle={toggle4}>
                                                    <PopoverHeader>Elija una operación</PopoverHeader>
                                                    <PopoverBody>
                                                        <ButtonToggle color="danger">Eliminar</ButtonToggle>{' '}
                                                        <ButtonToggle color="warning">Editar</ButtonToggle>{' '}
                                                    </PopoverBody>
                                                </Popover>
                                            </div>
                                        </td>
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


export default Cursos;