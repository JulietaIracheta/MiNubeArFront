import {  Business, Group } from '@material-ui/icons'
import ChatIcon from '@material-ui/icons/Chat';

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
    /*{
        title: 'Calificaciones', 
        icon: <Group />,
        link: "/calificaciones"
    }*/
] 