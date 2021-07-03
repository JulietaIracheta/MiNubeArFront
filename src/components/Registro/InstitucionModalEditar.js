import { useState, useEffect } from "react";
import { Modal, ModalBody } from 'reactstrap';
import { connect } from "react-redux";
import swal from 'sweetalert';
import * as actions from "../../actions/institucion";


const ModalUpdateInstitucion = ({...props}) => {

    const [datos, setDatos] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState('');
    const emailRegex = /\S+@\S+\.\S+/;

    useEffect(() => {
        setDatos(props.datos)
        setIsValid(true)
        setMessage('')
    },[props.datos]); 

    const modificando = () => {
        if( datos.idInstitucion !== null && isValid ){
            // datos.email = datos.email === null ? estudiantesActuales : datos.email
            const onSuccess = (respuesta) => {
                if(respuesta === null){
                  swal("Hubo un problema al querer modificar la Institución, intente más tarde",'' , "error");
                }else if(respuesta.status === 204){
                  swal("Institución Actualizada Correctamente!",'' , "success");
                }
            };
            props.updateInstitucion(datos.idInstitucion, datos, onSuccess);
            props.modalFadeState()
        }
    }

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
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
                <ModalBody className="p-3">
                    <div className="form-group">
                        <label>Id:</label>
                        <input type="text" name="idInstitucion" className="form-control" id="idInstitucion" readOnly
                                value = {props.datos.idInstitucion}
                                />
                    </div>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" name="nombre" className="form-control" id="nombre" 
                                value = {datos.nombre}
                                onChange = { handleInputChange }
                                />
                    </div>
                    <div className="form-group">
                        <label>Dirección:</label>
                        <input type="text" name="direccion" className="form-control" id="direccion" 
                                value = {datos.direccion }
                                onChange = { handleInputChange }
                                />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" name="email" className="form-control" id="email" 
                                value = {datos.email === ''? props.datos.email : datos.email}
                                onChange = { handleInputChange }
                                />
                         <div className={`pl-1 ${isValid ? 'text-success' : 'text-danger'}`}>
                            {message}
                         </div> 
                    </div> 
                    <button type="submit" className="btn btn-outline-primary float-right ml-1 mt-2" onClick = { () => modificando()}>Guardar</button>
                    <button className="btn btn-secondary float-right mt-2" onClick={ () => props.modalFadeState() }>Cancelar</button> 
                </ModalBody>
            </Modal>
        );
};


const mapActionToProps = {
    updateInstitucion : actions.update,
};
  
  
export default connect(null,mapActionToProps)(ModalUpdateInstitucion);


    