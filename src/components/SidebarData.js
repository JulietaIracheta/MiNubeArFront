import { BorderColor, Business, Group, LocalLibrary, MeetingRoom } from '@material-ui/icons'
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
   /* {
        title: 'Asignar Cursos a Institucion', 
        icon: <MeetingRoom />,
        link: "/cursosInstitucion"
    },*/
    {
        title: 'Materias', 
        icon: <BorderColor />,
        link: "/materias"
    },

] 