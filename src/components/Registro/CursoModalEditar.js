import { useState, useEffect } from "react";
import { Modal, ModalBody } from 'reactstrap';
import { connect } from "react-redux";
import swal from 'sweetalert';
import * as actions from "../../actions/curso";


const ModalUpdateCurso = ({...props}) => {

    const [datos, setDatos] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState('');
    const emailRegex = /\S+@\S+\.\S+/;

    useEffect(() => {
        setDatos(props.datos)
        setIsValid(true)
        setMessage('')
    },[props.datos]); 

    const reload = () => {
        window.location.reload(true);
    }

    const modificando = () => {
        if( datos.idCurso !== null && isValid ){
            // datos.email = datos.email === null ? estudiantesActuales : datos.email
            const onSuccess = (respuesta) => {
                if(respuesta === null){
                  swal("Hubo un problema al querer modificar el curso, intente más tarde",'' , "error");
                }else if(respuesta.status === 204){
                  swal("Curso Actualizado Correctamente!",'' , "success");
                  reload();
                }
            };
            props.updateCurso(datos.idCurso, datos, onSuccess);
            props.modalFadeState()
        }
    }

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        });

    
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
                        <input type="text" name="idCurso" className="form-control" id="idCurso" readOnly
                                value = {props.datos.idCurso}
                                />
                    </div>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" name="nombre" className="form-control" id="nombre" 
                                value = {datos.nombre}
                                onChange = { handleInputChange }
                                />
                    </div>
                    <button type="submit" className="btn btn-outline-primary float-right ml-1 mt-2" onClick = { () => modificando()}>Guardar</button>
                    <button className="btn btn-secondary float-right mt-2" onClick={ () => props.modalFadeState() }>Cancelar</button> 
                </ModalBody>
            </Modal>
        );
};


const mapActionToProps = {
    updateCurso : actions.update,
};
  
  
export default connect(null,mapActionToProps)(ModalUpdateCurso);


    