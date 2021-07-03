import { BorderColor,Business, Group } from '@material-ui/icons'
import React from 'react'
import ChatIcon from '@material-ui/icons/Chat';
export const SidebarDataEstudiante = [
    {
        title: 'Chat', 
        icon: <ChatIcon />,
        link: "/estudiante/chat"
    },
    {
        title: 'Comunicados', 
        icon: <Group />,
        link: "/estudiante/comunicado"
    },
    {
        title: 'Materias', 
        icon: <Business />,
        link: "/rol"
    },
   {
        title: 'Calificaciones', 
        icon: <BorderColor />,
        link: "/calificaciones"
    }
] 