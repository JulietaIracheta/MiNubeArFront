import userEvent from "@testing-library/user-event";
import React from "react";
import {Link} from 'react-router-dom'
import {Gear} from 'react-bootstrap-icons';
import {Calendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../assets/css/css-docente.css';
import Notificaciones from "./Notificaciones";

export default function EscuelasDocente () {

  
    return (
        
    <div className="container cardContainer ">
        <div>
            <h2 className="font-weight-bold colorDoc">Mis Escuelas</h2>
            <hr className="hr-colorDoc"/>
            
        </div>
        
        <div className="row">
          <div className="col-md-6 border-derecho">
          <Link to='/curso/1' className='text-decoration-none'>
            <div className="bordes mb-3">
              <div className="card-body colorDoc font-weight-bold">
                <h5 className="card-title size espacio font-weight-bold colorDoc">Escuela Nº 148</h5>
                <div className="text-left">
                <p>3 grupos</p>
                <span>32 estudiantes</span>   
                <div class="d-flex flex-row-reverse">          
                <Gear />
                </div>
                </div>
              </div>
                       </div></Link>
          </div>
          <Notificaciones />
          <div className="col-md-12 colorDoc font-weight-bold" >
            <div className="row">
              <div className="col-md-3 ">                
                  <div className="card-body escuela1">
                    <h5 className="card-title size espacio font-weight-bold">Escuela Nº 8 </h5>
                    <div class="d-flex flex-row-reverse"> 
                    <Gear />
                  </div>
                  </div>
           
              </div>
              <div className="col-md-3 border-derecho">               
                  <div className="card-body  escuela2">
                    <h5 className="card-title size espacio font-weight-bold">Escuela Nº 1</h5>
                    <div class="d-flex flex-row-reverse"> 
                    <Gear />
                    </div>
                  </div>
              </div>
              <div className="col-md-6 ">
                <div>
                  <div className="card-body">
                    <Calendar className='w-100' />
                  </div>
                </div>
              </div>
            </div>
          </div>
</div></div>
    );
  }
