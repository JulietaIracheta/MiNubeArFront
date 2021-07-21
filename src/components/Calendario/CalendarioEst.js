import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions/evento";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import NavEstudiante from '../Estudiante/NavEstudiante'
import Sidebar from '../Sidebar'
import {SidebarDataEstudiante} from '../sideBar/SidebarDataEstudiante'
import esLocale from '@fullcalendar/core/locales/es';
import getEventos from '../../services/docente/getEventos'
import {
  withStyles
} from "@material-ui/core";

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

const CalendarioEst = ({ classes, ...props }) => {
  const [eventos, setEventos] = useState([]);
  
  useEffect(function () {
    getEventos().then(even => setEventos(even))   
    console.log(eventos)    
}, [])

  
  return (
      <div>
       <NavEstudiante />
       <div className="d-flex">
        <Sidebar data={SidebarDataEstudiante}/>
        <main className="main w-100 pr-2 pt-4">
          <div className="mb-2 pl-3 pl-sm-2">
              <span className="tituloadmin tituloEstudiante">Calendario</span>
          </div>
          <div className='p-4 bg-white' style={{border:"1px solid #edf2f9"}}>
            <div className='demo-app-main p-0'>
              <FullCalendar
                contentHeight={"auto"}
                locale={esLocale}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={false}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
          //     weekends={weekendsVisible}
                events={eventos} // alternatively, use the `events` setting to fetch from a feed
        //       select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
        //       eventClick={handleEventClick}
                
                //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
              eventRemove={function(){}}*/
              
              />
            </div>
          </div>
       </main>
      </div>
    </div>
    )
  /*
  function  handleDateSelect (selectInfo) {
    let title = prompt('Por favor Ingrese Evento')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }*/

 /* function  handleEventClick (clickInfo) {
    
    console.log(clickInfo.event.extendedProps.idEvento)
      
      onDelete(clickInfo.event.extendedProps.idEvento)
    
  }*/

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
)(withStyles(styles)(CalendarioEst));