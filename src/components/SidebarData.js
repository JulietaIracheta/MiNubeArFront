import { BorderColor, Business, Group, LocalLibrary, MeetingRoom } from '@material-ui/icons'
import React from 'react'
import CategoryIcon from '@material-ui/icons/Category';
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
    {
        title: 'Asignar Materias a Cursos', 
        icon: <MeetingRoom />,
        link: "/asignarMaterias"
    },
    {
        title: 'Asignar Cursos a Institución', 
        icon: <MeetingRoom />,
        link: "/asignarCursos"
    },

    {
        title: 'Asignar Estudiantes a Cursos', 
        icon: <MeetingRoom />,
        link: "/asignarEstudiantes"
    },
    {
        title: 'Estadisticas', 
        icon: <CategoryIcon />,
        link: "/estadisticas"
    },

] 