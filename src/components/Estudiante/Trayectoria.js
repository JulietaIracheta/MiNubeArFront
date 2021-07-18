import React, {useState, useEffect} from 'react'
import NavEstudiante from './NavEstudiante'
import Sidebar from '../Sidebar'
import {SidebarDataEstudiante} from '../sideBar/SidebarDataEstudiante';
import {withStyles} from "@material-ui/core";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { School } from '@material-ui/icons'
import { Document, Page, pdfjs } from 'react-pdf';
import './timeline.css';
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



const Trayectoria = ({ classes, ...props }) => {
  const [informes, setInformes] = useState([])
  const [materias, setMaterias] = useState([])
  
  useEffect(async () => {
    const result = await fetch(
      "http://localhost:60671/api/informe/getTrayectoria/" ,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        setInformes(response);
      });
  }, []);
  function dosDecimales(n) {
    let t=n.toString();
    let regex=/(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }


    return (
        <div>
        <NavEstudiante />
      <div className="d-flex mt-1">
        <Sidebar data={SidebarDataEstudiante}/>
        <main className={classes.content}>
            <div className={classes.toolbar}  />
            <div >
              <div style={{marginTop:"-3rem"}}>
                  <h3 className="ml-4">Trayectoria Escolar</h3>
                  <hr class="hr-color w-100" />
        </div>
        <div className='demo-app'>
          <div className='demo-app-main-trayectoria'>

<VerticalTimeline>
  {informes.map((record) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
      date={record.año}
    iconStyle={{ background:'#b61915', color: '#fff' }}
    icon={<School />}
  >
    <span><b><i>{record.institucion}</i></b></span><br />
    <span><b><i>{record.curso}</i></b></span><br />
    {record.materiaCalificacion.map((mat) =>(
      <div>
        
    <span><small><b>{mat.materia}</b> :{mat.calificacion} </small></span><br />
  
    </div>
    )
    )}
    { record.informe ? <a href={`http://localhost:60671/informes/${record.informe}`} target='_blank' rel='noopener noreferrer'>Ver Informe</a>
    : ""}     
  </VerticalTimelineElement>
  ))}
  </VerticalTimeline>

      </div>
      </div>
      </div>
      </main>
      </div>
      </div>
    )
  }
export default (withStyles(styles)(Trayectoria));