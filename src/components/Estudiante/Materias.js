import React from "react";
import {Calculator, Controller, MusicNoteList, Palette, Laptop, Globe, Flower2, ThermometerSun, VectorPen} from 'react-bootstrap-icons';
import '../../assets/css/css-estudiante.css';

const Materias = (params) => {
   
    return (
        
    <div className="container cardContainer">
        <div>
            <h2>Hola {params.name}, ¿Que estudiamos hoy?</h2>
            <hr className="hr-color"/>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div className="cardMatematica">
              <div className="card-body">
                <h5 className="card-title size espacio">Matematicas</h5>
                <Calculator className="bigIcon"/>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <div className="cardLiteratura">
                  <div className="card-body">
                    <h5 className="card-title size espacio">Literatura</h5>
                    <VectorPen className="smallIcon"/>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="cardJuegos">
                  <div className="card-body">
                    <h5 className="card-title size espacio">Juegos</h5>
                    <Controller className="smallIcon"/>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="cardCiencia">
                  <div className="card-body">
                    <h5 className="card-title size espacio">Ciencias</h5>
                    <ThermometerSun className="smallIcon"/>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="cardMusica">
                  <div className="card-body">
                    <h5 className="card-title size espacio">Musica</h5>
                    <MusicNoteList className="smallIcon"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3">
                <div className="cardDibujo">
                  <div className="card-body">
                    <h5 className="card-title size espacio">Dibujo</h5>
                    <Palette className="smallIcon"/>

                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="cardComputacion">
                  <div className="card-body">
                    <h5 className="card-title size espacio">Computacion</h5>
                    <Laptop className="smallIcon"/>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="cardGeografia">
                  <div className="card-body">
                    <h5 className="card-title size espacio">Geografia</h5>
                    <Globe className="smallIcon"/>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="cardNaturales">
                  <div className="card-body">
                    <h5 className="card-title size espacio">Ciencias Naturales</h5>
                    <Flower2 className="smallIcon"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }


  export default Materias;