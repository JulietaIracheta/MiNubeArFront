import { BorderColor, Business, Group } from '@material-ui/icons'
import React from 'react'

export const SidebarDataEstudiante = [
    {
        title: 'Menu', 
        icon: <Business />
    },
    {
        title: 'Materias', 
        icon: <Business />,
        link: "/materias"
    },
    {
        title: 'Calificaciones', 
        icon: <Group />,
        link: "/calificaciones"
    }
] 