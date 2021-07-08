import React, { useState, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
import Sidebar from "../Sidebar";
import { SidebarDataEstudiante } from "../sideBar/SidebarDataEstudiante";
import { Button, ButtonGroup } from "@material-ui/core";
import NavEstudiante from './NavEstudiante'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function InformeEstudiante(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdf, setPdf] = useState('');
    const url="http://localhost:60671/informes/"+pdf;

    useEffect(async () => {
        const result = await fetch('http://localhost:60671/api/informe/getInformeByEstudiante/1', {
          method: 'GET',
          headers: { "Content-type": "application/json" },
          credentials: "include",
        }).then(function (response) {
          return response.json();
        })
          .then(response => {
            setPdf(response)
            console.log(pdf)
          });
      }, [])

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
        <NavEstudiante />
      <div className="d-flex mt-1 borde-tutor">
        <Sidebar data={SidebarDataEstudiante}/>
        <div className="container mt-2">
          <h2>Informe Alumno</h2>
          <hr class="hr-color w-100" />
          <div className="container-flex">
          <div>
        <Document
          file={url}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
            
        >
        <Page pageNumber={pageNumber} />
      </Document>
        <p className="paginas">
          Página {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <ButtonGroup className="botonera">
        <Button type="button" className="buttonn" disabled={pageNumber <= 1} onClick={previousPage}>
          Anterior
        </Button>
        <Button
          type="button"
          className="buttonn"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Próxima
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

