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
                    <form>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Para*</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Asunto*</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="escriba su asunto" />
                        </div>

                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Mensaje*</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="imagen">Adjunte un archivo</label>
                            <input type="file" className="form-control-file" id="imagen" />
                        </div>
                        <button type="submit" className="btn btn-outline-primary float-right ml-1">Guardar</button>
                        <button className="btn btn-secondary float-right" onClick={this.toogleAlert.bind(this)}>Cancelar</button> 
                    </form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
    
export default ModalNuevoComunicado;