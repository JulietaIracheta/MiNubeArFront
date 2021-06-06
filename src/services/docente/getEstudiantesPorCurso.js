const url = 'http://localhost:60671/api/docente/getEstudiantesPorCurso/'

export default function getEstudiantes(id) {
    const url=urlBase+`${id}`;
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        return res;
    });
}

