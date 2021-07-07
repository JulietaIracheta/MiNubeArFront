import React, {useState, useEffect} from 'react'
import NavEstudiante from './NavEstudiante'
import Sidebar from '../Sidebar'
import {SidebarDataEstudiante} from '../sideBar/SidebarDataEstudiante'
import {
    TableContainer,
    Table,
    TableHead,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TableRow,
    TableCell,
    TableBody,
  withStyles
} from "@material-ui/core";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top: "unset !important",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: 0,
    paddingTop: 0,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});



const TrayectoriaEscolar = ({ classes, ...props }) => {
  const [boletin, setBoletin] = useState([]);
  const [año, SetAño] = useState(2020);
  const [años, setAños] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState('');
  const url="http://localhost:60671/informes/"+pdf;
  

    const handleInputChange = (e) => {
      SetAño(e.target.value)
      }
  
      useEffect(async () => {
        const result = await fetch('http://localhost:60671/api/boletin/año/', {
          method: 'GET',
          headers: { "Content-type": "application/json" },
          credentials: "include",
        }).then(function (response) {
          return response.json();
        })
          .then(response => {
            setAños(response)
            console.log(años)
            console.log(año)
            
           });
      }, []);

  useEffect(async () => {
    const result = await fetch('http://localhost:60671/api/boletin/trayectoria/' + año, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setBoletin(response)
       });
  }, [año]);

  useEffect(async () => {
    const result = await fetch('http://localhost:60671/api/informe/getInformeTrayectoria/' + año, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
      credentials: "include",
    }).then(function (response) {
      return response.json();
    })
      .then(response => {
        setPdf(response)
       });
  }, [año]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
      <div>
      <NavEstudiante />
    <div className="d-flex mt-1">
      <Sidebar data={SidebarDataEstudiante}/>
      <main className={classes.content}>
          <div className={classes.toolbar} id="coco" />
          <div id="coco">
            <div className="adminContent">
                <h3 className="ml-4">Trayectoria Escolar</h3>
                <hr class="hr-color w-100" />
      </div>
      <div className='demo-app'>
        <div className='demo-app-main'>
        <FormControl variant="outlined" className="mb-3 mt-3 ml-3">
            <InputLabel id="demo-simple-select-outlined-label">Año</InputLabel>
            <Select
              name="año"
              id="demo-simple-select-outlined"
              value={año}
              onChange={handleInputChange}
              label="Año"
            >
              {años.map((est) => (
                <MenuItem value={est}>
                  {est}
                  {console.log(años)}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
           
            <TableContainer>
              <Table>
                
                  <TableRow className="colorTab">
                    <TableCell className="colorTab">Materia</TableCell>
                    <TableCell className="colorTab">Nota T1</TableCell>
                    <TableCell className="colorTab">Nota T2</TableCell>
                    <TableCell className="colorTab">Nota T3</TableCell>
                    <TableCell className="colorTab">Promedio</TableCell>
                   </TableRow>
                <TableBody>
        {boletin.map((notas, index) => {
        var total=0;
        if(notas.t1){
          total=total+1;
        }else{
          notas.t1=0;
        }
        if(notas.t2){
          total=total+1;
        }else{
          notas.t2=0;
        }
        if(notas.t3){
          total=total+1;
        }else{
          notas.t3=0;
        }
             return (
                <TableRow key={index} hover>
                  <TableCell>{notas.materia}</TableCell>
                  <TableCell>{notas.t1}</TableCell>
                  <TableCell>{notas.t2}</TableCell>
                  <TableCell>{notas.t3}</TableCell>
                  <TableCell>{Math.ceil((parseInt(notas.t1) + parseInt(notas.t2) + parseInt(notas.t3)) /total)}</TableCell>
                </TableRow>

              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
               </div>
              <div>
                <h3 className="mt-4 mb-4 text-center">Informe Anual</h3>
               <Document
          file={url}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
            >
                  <Page pageNumber={pageNumber} />   
        
      </Document>
      </div>
      </div>
      </div>
      </main>
      </div>
      </div>
    )
  }
export default (withStyles(styles)(TrayectoriaEscolar));