
const urlBase = 'http://localhost:60671/api/persona/getPerfil/'

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