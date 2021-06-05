import { BorderColor, Business, Group } from '@material-ui/icons'
import React from 'react'

export const SidebarDataTutor = [
    {
        title: 'Estudiantes ', 
        icon: <Business />,
        link: "tutor/estudiantesAsignados"
    },
    {
        title: 'Calificaciones', 
        icon: <Group />,
        link: "/calificaciones"
    },
    {
        title: 'Informes', 
        icon: <Group />,
        link: "/informes"
    },
    {
        title: 'Comunicados', 
        icon: <Group />,
        link: "/comunicados"
    }
] 