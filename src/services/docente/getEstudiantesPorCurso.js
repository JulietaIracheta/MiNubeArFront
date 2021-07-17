const urlBase = 'http://134.209.120.136:4000/api/docente/getEstudiantesPorCurso/'

export default function getEstudiantes(idInstitucion,idCurso) {
    const url=urlBase+`${idInstitucion}/${idCurso}`;
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        return res;
    });
}

