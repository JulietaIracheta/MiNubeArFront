import React, { useState, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
import "../../assets/css/css-tutor.css";
import Sidebar from "../Sidebar";
import {SidebarDataTutor} from '../sideBar/SidebarDataTutor';
import { Button, ButtonGroup } from "@material-ui/core";
import NavTutor from './NavTutor'
import pdf from '../../assets/9deJulio.pdf'
import '../../assets/css/contenidoMateria.css'
import { Document, Page, pdfjs } from 'react-pdf';
import { textAlign } from "@material-ui/system";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function ContenidoMateria(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    
      function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
    
      function previousPage() {
        changePage(-1);
      }
    
      function nextPage() {
        changePage(1);
    }

    return (
    <div>
        <NavTutor />
      <div className="d-flex mt-1 borde-tutor">
        <Sidebar data={SidebarDataTutor}/>
        <div className="container mt-2">
          <h2 className="font-weight-bold colorTut">Mis Estudiantes</h2>
          <hr className="hr-colorTut" />
          <div className="container-flex">
          <div className="row">
          <div className="col-xs-6">
                <div className="bordes mb-3 ml-4">

          <div className="card-body colorTut font-weight-bold">
                    <h5 className="card-title font-weight-bold colorTut">
                        Unidad 1
                        </h5><ButtonGroup
            variant="outlined"
            color="primary"
            aria-label="text primary button group"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a href="/tutor/contenidoMateria/1" class="text-dark">
              <Button
              >
                Contenido
              </Button>
            </a>
            <a href="/tutor/ActividadEstudiante" class="text-dark">
              <Button>Actividades</Button>
            </a>
          </ButtonGroup>
                        
                        </div>
     
      </div>
      </div>
      <div className="col-xs-6">

      <div className="bordes mb-3  ml-4">

<div className="card-body colorTut font-weight-bold">
          <h5 className="card-title font-weight-bold colorTut">
              Unidad 2
              </h5><ButtonGroup
  variant="outlined"
  color="primary"
  aria-label="text primary button group"
  style={{ display: "flex", justifyContent: "center" }}
>
  <a href="/tutor/contenidoMateria/2" class="text-dark">
    <Button
    >
      Contenido
    </Button>
  </a>
  <a href="/tutor/ActividadEstudiante" class="text-dark">
    <Button>Actividades</Button>
  </a>
</ButtonGroup>
              
              </div>

</div>
 </div>
 <div className="col-xs-6">

<div className="bordes mb-3  ml-4">

<div className="card-body colorTut font-weight-bold">
    <h5 className="card-title font-weight-bold colorTut">
        Unidad 3
        </h5><ButtonGroup
variant="outlined"
color="primary"
aria-label="text primary button group"
style={{ display: "flex", justifyContent: "center" }}
>
<a href="/tutor/contenidoMateria/3" class="text-dark">
<Button
>
Contenido
</Button>
</a>
<a href="/tutor/ActividadEstudiante" class="text-dark">
<Button>Actividades</Button>
</a>
</ButtonGroup>
        
        </div>

</div>
</div>
 </div>
 </div>
          </div>

          <div>
          </div>
        </div>
      </div>
  );
  }

