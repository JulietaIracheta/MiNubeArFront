import './timeline.css'
import NavEstudiante from './NavEstudiante'
import Sidebar from '../Sidebar'
import {SidebarDataEstudiante} from '../sideBar/SidebarDataEstudiante';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import fileUrl from '../../assets/Teórico 3.pdf'

const timelineData = [
    {
        text: 'Promedio : 8,50',
        date: '2016',
        curso:  '1°A',
        link: {
            url: 'https://github.com/florinpop17/app-ideas',
            text: 'Ver Informe'
        }
    },
    {
        text: 'Promedio : 7,50',
        date: '2017',
        curso:  '2°A',
        link: {
            url: 'https://github.com/florinpop17/app-ideas',
            text: 'Ver Informe'
        }
    },
    {
        text: 'Promedio : 8,00',
        date: '2018',
        curso:  '3°A',
        link: {
            url: 'https://github.com/florinpop17/app-ideas',
            text: 'Ver Informe'
        }
    },
    {
        text: 'Promedio : 9,00',
        date: '2019',
        curso:  '4°A',
        link: {
            url: 'https://github.com/florinpop17/app-ideas',
            text: 'Ver Informe'
        }
    },
    {
        text: 'Promedio : 8,50',
        date: '2020',
        curso:  '5°A',
        link: {
            url: 'https://github.com/florinpop17/app-ideas',
            text: 'Ver Informe'
        }
    },
]



const TimelineItem = ({ data }) => {
    const [shown, setShown] = useState(false);

    const modalBody = () => (
        <div
            style={{
                backgroundColor: '#fff',
                flexDirection: 'column',
                overflow: 'hidden',

                /* Fixed position */
                left: 0,
                position: 'fixed',
                top: 0,

                /* Take full size */
                height: '100%',
                width: '100%',

                /* Displayed on top of other elements */
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#000',
                    color: '#fff',
                    display: 'flex',
                    padding: '.5rem',
                }}
            >
                <div style={{ marginRight: 'auto' }}></div>
                <button
                    style={{
                        backgroundColor: '#357edd',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#ffffff',
                        cursor: 'pointer',
                        padding: '8px',
                    }}
                    onClick={() => setShown(false)}
                >
                    Close
                </button>
            </div>
            <div
                style={{
                    flexGrow: 1,
                    overflow: 'auto',
                }}
            >
                <Viewer fileUrl={fileUrl} />
            </div>
        </div>
    );

return (
<div className="timeline-item">
        <div className="timeline-item-content">
            <span className="tag" style={{ background: '#00DB15' }}>
                {data.curso}
            </span>
            <time>{data.date}</time>
            <p>{data.text}</p>
            {data.link && (
                <div>
                <button
                style={{
                    backgroundColor: '#00449e',
                    border: 'none',
                    borderRadius: '.25rem',
                    color: '#fff',
                    cursor: 'pointer',
                    padding: '.5rem',
                }}
                onClick={() => setShown(true)}
            ></button>
            {shown && ReactDOM.createPortal(modalBody(), document.body)}
                <a
                    href={data.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {data.link.text}
                </a>
</div>            )}
            <span className="circle" />
        </div>
    </div>
)
}

const Timeline = () => (
    timelineData.length > 0 && (
        <div>
        <NavEstudiante />
      <div>
      <div className="d-flex mt-1 borde-tutor">
        <Sidebar data={SidebarDataEstudiante}/>
        <div className="container mt-2">
          <h2 className="font-weight-bold">Trayectoria Escolar</h2>
          <hr class="hr-color w-100" />
          <div className=" w-100">
        <div className="timeline-container">
            {timelineData.map((data, idx) => (
                <TimelineItem data={data} key={idx} />
            ))}
        </div>
        </div>
      </div>
      </div>   
      </div>
      </div>
    )
)
    export default Timeline;