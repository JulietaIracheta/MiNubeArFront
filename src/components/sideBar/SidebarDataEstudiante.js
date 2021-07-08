import { BorderColor,Business, CastForEducation, Group, MenuBook, Portrait, School } from '@material-ui/icons'
import React from 'react'
import ChatIcon from '@material-ui/icons/Chat';
export const SidebarDataEstudiante = [
    {
        title: 'Materias', 
        icon: <MenuBook />,
        link: "/rol"
    },
    {
        title: 'Comunicados', 
        icon: <Group />,
        link: "/estudiante/comunicado"
    },
    {
        title: 'Chat', 
        icon: <ChatIcon />,
        link: "/estudiante/chat"
    },
   {
        title: 'Calificaciones', 
        icon: <BorderColor />,
        link: "/calificaciones"
    },
    {
        title: 'Informe', 
        icon: <Portrait />,
        link: "/estudiante/informe"
    },
    {
        title: 'Trayectoria Escolar', 
        icon: <School />,
        link: "/estudiante/trayectoria"
    }
] 