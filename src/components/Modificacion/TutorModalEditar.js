import { useState, useEffect } from "react";
import { Modal, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { connect } from "react-redux";
import swal from 'sweetalert';
import * as actions from "../../actions/usuario";
// import getInstituciones from "../../services/estudiantes/getInstituciones";
import {getEstudiantesDeUnTutor} from "../../services/estudiantes/getEstudiante";
import {getEstudiantes} from "../../services/estudiantes/getEstudiante";
import Select from 'react-select'


const EstudianteModalEditar = ({...props}) => {
    const [datos, setDatos] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState('');
    // const [instituciones, setInstituciones] = useState([]);
    const [idEstudiantesDelTutor, setIdEstudiantesDelTutor] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudiante, setEstudiante] = useState([]);
    const [estudiantesSelect, setEstudiantesSelect] = useState([]);
    const [estudiantesActuales, setEstudiantesActuales] = useState([]);
    const emailRegex = /\S+@\S+\.\S+/;

    useEffect(() => {
        setDatos(props.datos)
        setIsValid(true)
        setMessage('')

        // obtengo los estudiantes que tiene asignado un tutor
        getEstudiantesDeUnTutor(props.datos.idPersona).then((estudiante) => {
            setEstudiante(estudiante)
            let est = estudiante.map(item => item.idUsuario)
            setIdEstudiantesDelTutor(est)
            let emailsEstudiantesActuales = [];
            estudiante.map( item => {
                emailsEstudiantesActuales.push({value: item.idUsuario, label:  item.usuarioNombre })
            })
             setEstudiantesActuales(emailsEstudiantesActuales);
        });

        // obtengo todos los estudiantes existentes
        getEstudiantes().then((estudiante) => {
            let emailsEstudiantes = [];
            estudiante.map( item => {
               emailsEstudiantes.push({value: item.idUsuario, label:  item.usuarioNombre })
            })
            setEstudiantes(emailsEstudiantes);
        });
    },[]); 

    const modificando = () => {
        if( datos.idUsuario !== null && isValid ){
            // esto es por que si abro el modal y automaticamente pongo guardar, el valor de IdInstitucion es null
            datos.emailsEstudiantes = datos.emailsEstudiantes === null ? estudiantesActuales : datos.emailsEstudiantes
            const onSuccess = (respuesta) => {
                if(respuesta === null){
                  swal("Hubo un problema al querer modificar al Tutor, intente más tarde",'' , "error");
                }else if(respuesta.status === 204){
                  swal("Estudiante Actualizado Correctamente!",'' , "success");
                }
            };
            datos.idEstudiantes = estudiantesActuales.map( item => item.value) 
            props.updateUsuario(datos.idUsuario, datos, onSuccess);
            props.modalFadeState('Tutor')
        }
    }

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] :  event.target.value 
        });

        if (emailRegex.test(datos.email)) {
            setIsValid(true);
            setMessage('');
        } else {
            setIsValid(false);
            setMessage('Ingrese un email valido');
        }
    }

    const cambiaSelect=(value)=>{
        setEstudiantesActuales(value);
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
                        <label>Estudiante/s Asignado/s:</label>
                        <Select
                            value = {estudiantesActuales} 
                            options= {estudiantes}
                            isMulti 
                            placeholder="Email del Estudiante" 
                            onChange={cambiaSelect}
                        />
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
                    <button className="btn btn-secondary float-right mt-2" onClick={ () => props.modalFadeState('Tutor') }>Cancelar</button> 
                </ModalBody>
            </Modal>
        );
};


const mapActionToProps = {
    updateUsuario : actions.update,
};
  
  
export default connect(null,mapActionToProps)(EstudianteModalEditar);


    