import { BorderColor, Business, Group, LocalLibrary } from '@material-ui/icons'
import React from 'react'

export const SidebarData = [
    {
        title: 'Instituciones', 
        icon: <Business />,
        link: "/instituciones"
    },
    {
        title: 'Usuarios', 
        icon: <Group />,
        link: "/usuarios"
    },
    {
        title: 'Cursos', 
        icon: <LocalLibrary />,
        link: "/cursos"
    },
    {
        title: 'Materias', 
        icon: <BorderColor />,
        link: "/materias"
    },

] 