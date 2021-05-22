import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Plus} from 'react-bootstrap-icons'


class ModalNuevoCurso extends Component{
    state = {
        visible: false
    }

    toogleAlert(){
        this.setState({
            visible: !this.state.visible
        })
    }

    render(){
        return (
            <React.Fragment>
                <Button 
                    color="btn-outline-primary" 
                    variant="outline-primary"
                    onClick={this.toogleAlert.bind(this)} 
                    className="btn btn-outline-primary d-none d-lg-block"
                    >
                        Nuevo +
                </Button>
                <Button 
                    color="btn-outline-primary" 
                    variant="outline-primary"
                    onClick={this.toogleAlert.bind(this)} 
                    className="btn btn-outline-primary d-block d-lg-none rounded-circle"
                    >
                        <Plus></Plus>  
                </Button>
                <Modal 
                    isOpen={this.state.visible}  
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalBody>
                    <form className="p-3">
                        <div className="form-group">
                            <label>Código</label>
                            <input type="text" name="codigo" className="form-control" id="codigo" />
                        </div>
                        <div className="form-group">
                            <label>Institución</label>
                            <input type="text" className="form-control" id="institucion" />
                        </div>
                        <div className="form-group">
                            <label>Curso</label>
                            <input type="text" className="form-control" id="curso" />
                        </div>
                        <button type="submit" className="btn btn-outline-primary float-right ml-1 mt-2">Guardar</button>
                        <button className="btn btn-secondary float-right mt-2" onClick={this.toogleAlert.bind(this)}>Cancelar</button> 
                    </form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
    
export default ModalNuevoCurso;