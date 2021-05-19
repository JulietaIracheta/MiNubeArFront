import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';


class ModalNuevoComunicado extends Component{
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
                    block={true} 
                    color="btn-outline-primary" 
                    onClick={this.toogleAlert.bind(this)} 
                    variant="outline-primary"
                    className="btn btn-outline-primary btn-md"
                    >
                        Nuevo +
                </Button>
                <Modal 
                    isOpen={this.state.visible}  
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalBody>
                    <form className="p-3">
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Para</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Asunto</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" />
                        </div>

                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Mensaje</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <input type="file" className="form-control-file" id="imagen" />
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
    
export default ModalNuevoComunicado;