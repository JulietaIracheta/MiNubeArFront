import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions/evento";
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from "axios";
import NavDocente from '../Docente/NavDocente'
import Sidebar from '../Sidebar'
import {SidebarDataDocente} from '../sideBar/SidebarDataDocente'
import ModalDialog from "./ModalDialog";
import { Button } from "reactstrap";
import esLocale from '@fullcalendar/core/locales/es';
import getEventos from '../../services/docente/getEventos'
import {
  withStyles
} from "@material-ui/core";
import Swal from 'sweetalert2';

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

const Calendario = ({ classes, ...props }) => {
  const [eventos, setEventos] = useState([]);
  const [open, setOpen] = useState(false);
    // function to handle modal open
    const handleOpen = () => {
      setOpen(true);      
    };
  
    // function to handle modal close
    const handleClose = () => {
      setOpen(false);
    };
  
  useEffect(function () {
    getEventos().then(even => setEventos(even))   
    console.log(eventos)    
}, [])

const reload = () => {
  window.location.reload(true);
}

const onDelete = (id) => {
  Swal.fire({
    title: 'Estas seguro de eliminarlo?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Sí`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Eliminado!', '', 'success')
      props.deleteEvento(id)
       
    }
  else{
    return;
  }
  reload();
})

};

  
  return (
      <div>
      <NavDocente />
    <div className="d-flex mt-1">
      <Sidebar data={SidebarDataDocente}/>
      <main className={classes.content}>
          <div className={classes.toolbar} id="coco" />
          <div id="coco">
            <div className="adminContent">
              <span className="tituloadmin">Calendario</span>
           <Button
                className="btn btn-danger menuadmin"
                onClick={handleOpen}
              >
                Nuevo Evento
              </Button>
              <ModalDialog open={open} handleClose={handleClose} />
        <hr className="hr-colorDoc" />
      </div>
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
       //     weekends={weekendsVisible}
            events={eventos} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            
            //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
           eventRemove={function(){}}*/
           
          />
        </div>
      </div>
      </div>
      </main>
      </div>
      </div>
    )
  
  function  handleDateSelect () {
    handleOpen();
    <ModalDialog open={open} handleClose={handleClose}/>
  }
  

 function  handleEventClick (clickInfo) {
  
      if(clickInfo.event.url == "#"){
        onDelete(clickInfo.event.extendedProps.idEvento)}
         
 }
}
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>{" hs - "}
      <i>{eventInfo.event.title}</i>
      
    </>
  )
}

const mapStateToProps = (state) => ({
  eventoList: state.evento.list,
});

const mapActionToProps = {
  createEvento: actions.create,
  updateEvento: actions.update,
  deleteEvento: actions.Delete
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Calendario));