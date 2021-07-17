import { BorderColor, Business, Group, LocalLibrary, MeetingRoom  } from '@material-ui/icons'
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
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
        icon: <AssignmentIcon />,
        link: "/asignarCursos"
    },

    {
        title: 'Asignar Estudiantes a Cursos', 
        icon: <AssignmentIndIcon />,
        link: "/asignarEstudiantes"
    },
    {
        title: 'Estadisticas', 
        icon: <CategoryIcon />,
        link: "/estadisticas"
    },

] 