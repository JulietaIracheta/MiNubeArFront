
const urlBaseAsignaEstudiantesAcurso = 'http://134.209.120.136:4000/api/cursos/AsignaEstudiandesAcurso/';

export function AsignaEstudiandesAcurso(data, onSuccess) {
    const url= `${urlBaseAsignaEstudiantesAcurso}`
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(res => {
         onSuccess(res) 
    })
    .catch(err => { 
        console.log(err) 
        onSuccess(null)
    })
}