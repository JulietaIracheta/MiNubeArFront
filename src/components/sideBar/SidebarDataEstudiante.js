import { BorderColor,Business, CastForEducation, ContactPhoneTwoTone, Group, History, MenuBook, Portrait, School } from '@material-ui/icons'
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
        link: "/estudiante/calificacion"
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
    },
    {
        title: 'Historial de contenidos', 
        icon: <History />,
        link: "/estudiante/contenidosHistoricos"
    }
] 