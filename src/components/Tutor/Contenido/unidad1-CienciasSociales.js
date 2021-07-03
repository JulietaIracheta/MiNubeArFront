import React, { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import "../../../assets/css/css-tutor.css";
import Sidebar from "../../Sidebar";
import {SidebarDataTutor} from '../../sideBar/SidebarDataTutor';
import { Button, ButtonGroup } from "@material-ui/core";
import NavTutor from '../NavTutor'
import pdf from '../../../assets/9deJulio.pdf'
import '../../../assets/css/contenidoMateria.css'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function Unidad1CienciasSociales(props) {
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
          <h2 className="font-weight-bold colorTut">Unidad 1</h2>
          <hr className="hr-colorTut" />
          <div className="container-flex">
          <div>
        <Document
          file={pdf}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
            
        >
        <Page pageNumber={pageNumber} />
      </Document>
        <p className="paginas">
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <ButtonGroup className="botonera">
        <Button type="button" className="buttonn" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </Button>
        <Button
          type="button"
          className="buttonn"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </Button>
        </ButtonGroup>
      </div>
 </div>
          </div>

          <div>
          </div>
        </div>
      </div>
  );
  }

