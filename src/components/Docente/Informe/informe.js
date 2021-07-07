import React, { Component } from 'react';
import './style.css';
import Sidebar from "../../Sidebar";
import { SidebarDataDocente } from "../../sideBar/SidebarDataDocente";
import NavDocente from "../NavDocente";
import { savePDF } from '@progress/kendo-react-pdf';

const PdfContainer = (props) => {

  
  const bodyRef = React.createRef();
  const createPdf = () => {
    props.createPdf(bodyRef.current);
    resetForm();
  } 
  const resetForm = () => {
    window.location.reload();
  };
    return (
    <section className="pdf-container">
      <section className="pdf-toolbar">
        <button onClick={createPdf}>Crear PDF</button>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}


class Informe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      año: '',
      apellido: '',
      descripcion: ''
    };
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      state[name] = value;
      return state;
    })
  }

  createPdf = (html) => {
    savePDF(html, { 
      paperSize: 'Letter',
      fileName: `${this.state.apellido}_${this.state.año}.pdf`,
      margin: 3
    }, )
  }

  render() {
    
    return (
      <React.Fragment>
         <div>
      <NavDocente />

      <div className="d-flex mt-1">
        <Sidebar data={SidebarDataDocente} />
        <div className="container-fluid mt-1">
          <div>
            <h4>Crear Informe</h4>
            <hr className="hr-colorDoc" />
          </div>
          <div class="row align-items-start">
        <div className="col-8">
        <PdfContainer createPdf={this.createPdf}>
          <React.Fragment>
            <section className="flex-column">
              <h2 className="flex">Informe</h2>
              <section className="flex-row">
                <input placeholder="Año"
                  name="año"
                  value={this.state.año}
                  onChange={this.onChange} />
                <input className="flex"
                  placeholder="Nombre y Apellido"
                  name="apellido"
                  value={this.state.apellido}
                  onChange={this.onChange} />
              </section>
              <textarea rows="20"
                placeholder="Descripcion"
                name="descripcion"
                value={this.state.descripcion}
                onChange={this.onChange} />
            </section>
          </React.Fragment>
          
        </PdfContainer>
      
</div>
        </div>
        </div></div></div>
      </React.Fragment>
    );
  }
}

export default Informe;