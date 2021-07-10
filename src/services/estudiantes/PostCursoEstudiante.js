
const urlBaseAsignaEstudiantesAcurso = 'http://localhost:60671/api/cursos/AsignaEstudiandesAcurso/';

export function AsignaEstudiandesAcurso(data) {
    const url= `${urlBaseAsignaEstudiantesAcurso}`
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(res => {
         console.log('res:') 
         console.log(res) 
    })
    .catch(function(res){ console.log(res) })
}