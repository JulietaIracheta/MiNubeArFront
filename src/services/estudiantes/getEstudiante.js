
const urlBase = 'http://localhost:60671/api/persona/getPerfil/'
const URL_BASE_ESTUDIANTES_DE_TUTOR = 'http://localhost:60671/api/usuario/getEstudiantesDeUnTutor/'
const URL_BASE_ESTUDIANTES = 'http://localhost:60671/api/usuario/getEstudiantes/'

export default function getEstudiante(id) {
    const url=urlBase+`${id}`;
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) alert('Estudiante no encontrado')
        return res.json()
    }).then(res => {
        return res;
    });
}



export function getEstudiantes() {
    const url=URL_BASE_ESTUDIANTES;
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) alert('Estudiantes no encontrados')
        return res.json()
    }).then(res => {
        return res;
    });
}

export function getEstudiantesDeUnTutor(id) {
    const url=URL_BASE_ESTUDIANTES_DE_TUTOR+`${id}`;
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) alert('Estudiantes del tutor no encontrado')
        return res.json()
    }).then(res => {
        return res;
    });
}


const URL_BASE_ESTUDIANTES_DE_INSTITUCION = 'http://localhost:60671/api/institucion/getEstudiantesDeUnaInstitucion/'

export function getEstudiantesDeUnaInstitucion(id) {
    const url=URL_BASE_ESTUDIANTES_DE_INSTITUCION+`${id}`;
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) alert('Estudiantes la institución no encontrado')
        return res.json()
    }).then(res => {
        return res;
    });
}

