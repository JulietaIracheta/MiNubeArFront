import { BorderColor, Business, Email, FolderShared, Group } from '@material-ui/icons'
import React from 'react'

export const SidebarDataTutor = [
    {
        title: 'Estudiantes ', 
        icon: <Business />,
        link: "/rol"
    },
    {
        title: 'Calificaciones', 
        icon: <BorderColor />,
        link: "/calificacionesTutor"
    },
    {
        title: 'Informes', 
        icon: <FolderShared />,
        link: "/informes"
    },
    {
        title: 'Comunicados', 
        icon: <Email />,
        link: "/comunicados"
    }
] 