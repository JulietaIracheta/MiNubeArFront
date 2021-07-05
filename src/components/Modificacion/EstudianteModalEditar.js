import { useState, useEffect } from "react";
import { Modal, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { connect } from "react-redux";
import swal from 'sweetalert';
import * as actions from "../../actions/usuario";
import getInstituciones from "../../services/estudiantes/getInstituciones";
import {getInstitucionDeUnEstudiante} from "../../services/estudiantes/getInstituciones";


const EstudianteModalEditar = ({...props}) => {
    const [datos, setDatos] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState('');
    const [instituciones, setInstituciones] = useState([]);
    const [idInstitucionDelEstudiante, setIdInstitucionDelEstudiante] = useState(null);
    const emailRegex = /\S+@\S+\.\S+/;

    useEffect(() => {
        setDatos(props.datos)
        setIsValid(true)
        setMessage('')
        getInstituciones().then((instituciones) => setInstituciones(instituciones));
        getInstitucionDeUnEstudiante(props.datos.idUsuario).then((estudiante) => {
            setIdInstitucionDelEstudiante(estudiante.idInstitucion)
        });
    },[props.datos]); 

    const modificando = () => {
        if( datos.idUsuario !== null && isValid ){
            // esto es por que si abro el modal y automaticamente pongo guardar, el valor de IdInstitucion es null
            console.log('datos.idInstitucionEstudiante')
            console.log(datos.idInstitucionEstudiante)
            datos.idInstitucionEstudiante = !datos.idInstitucionEstudiante ? idInstitucionDelEstudiante : datos.idInstitucionEstudiante
            
            const onSuccess = (respuesta) => {
                if(respuesta === null){
                  swal("Hubo un problema al querer modificar al Estudiante, intente más tarde",'' , "error");
                }else if(respuesta.status === 204){
                  swal("Estudiante Actualizado Correctamente!",'' , "success");
                }
            };
            console.log('datos: ')
            console.log(datos)
            props.updateUsuario(datos.idUsuario, datos, onSuccess);
            props.modalFadeState('Estudiante')
        }
    }

    const handleInputChange = (event) => {

        setDatos({
            ...datos,
            [event.target.name] :  event.target.value  //event.nativeEvent.target.id === 'idInstitucion' ?  idSeleccionados : event.target.value 
        });

        if (emailRegex.test(datos.email)) {
            setIsValid(true);
            setMessage('');
        } else {
            setIsValid(false);
            setMessage('Ingrese un email valido');
        }
    }
    return (
            <Modal 
                isOpen={props.open} 
                aria-labelledby="contained-modal-title-vcenter"
                centered
            > 
                <ModalBody className="p-4">
                    <FormGroup>
                        <label>Id:</label>
                        <input type="text" name="idUsuario" className="form-control" id="idUsuario" readOnly
                                value = {datos.idUsuario}
                                />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" className="form-control" id="nombre" 
                                value = {datos.nombre}
                                onChange = { handleInputChange }
                                />
                    </FormGroup>
                    <FormGroup>
                        <label>Apellido:</label>
                        <input type="text" name="apellido" className="form-control" id="apellido" 
                                value = {datos.apellido}
                                onChange = { handleInputChange }
                                />
                    </FormGroup>
                    <FormGroup>
                        <label>Email:</label>
                        <input type="text" name="email" className="form-control" id="email" 
                                value = {datos.email}
                                onChange = { handleInputChange }
                                />
                         <div className={`pl-1 ${isValid ? 'text-success' : 'text-danger'}`}>
                            {message}
                         </div> 
                    </FormGroup> 
                    <FormGroup>
                        <label>Teléfono:</label>
                        <input type="text" name="telefono" className="form-control" id="telefono" 
                                value = {datos.telefono }
                                onChange = { handleInputChange }
                                />
                    </FormGroup>
                    <FormGroup>
                        <Label for="idInstitucionEstudiante">Instituciones</Label>
                        <Input type="select" 
                               name="idInstitucionEstudiante"
                               onChange = { handleInputChange } 
                               id="idInstitucionEstudiante" 
                               value = {datos.idInstitucion}  
                        >
                        {
                            instituciones.map((institucion) => {
                                let option

                                if(idInstitucionDelEstudiante == institucion.idInstitucion){   
                                    option = <option value={institucion.idInstitucion}  selected>
                                                {institucion.nombre}
                                            </option>
                                }else{
                                    option = <option value={institucion.idInstitucion}>
                                                {institucion.nombre}
                                             </option>
                                }
                                return option
                            })
                        }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <label>Rol:</label>
                        <input type="text" name="rol" className="form-control" id="rol" 
                                value = {datos.rol }
                                onChange = { handleInputChange }
                                readOnly
                                />
                    </FormGroup>
                    <button type="submit" className="btn btn-outline-primary float-right ml-1 mt-2" onClick = { () => modificando()}>Guardar</button>
                    <button className="btn btn-secondary float-right mt-2" onClick={ () => props.modalFadeState('Estudiante') }>Cancelar</button> 
                </ModalBody>
            </Modal>
        );
};


const mapActionToProps = {
    updateUsuario : actions.update,
};
  
  
export default connect(null,mapActionToProps)(EstudianteModalEditar);


    