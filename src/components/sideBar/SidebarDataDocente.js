import ChatIcon from '@material-ui/icons/Chat';
import { Ballot, BorderColor, Business,Group } from '@material-ui/icons'
import React from 'react'

export const SidebarDataDocente = [
    {
        title: 'Chat', 
        icon: <ChatIcon />,
        link: "/docente/chat"
    },
    {
        title: 'Escuelas', 
        icon: <Business />,
        link: "/rol"
    }
    ,{
        title: 'Calificaciones', 
        icon: <BorderColor />,
        link: "/docente/cargarCalificaciones"
    }
    /*{
        title: 'Crear Actividades', 
        icon: <Ballot />,
        link: "/crearactividades"
    }*/
] 