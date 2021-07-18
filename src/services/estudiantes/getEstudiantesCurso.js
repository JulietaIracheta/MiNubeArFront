import url from "../../url"
const urlBase = `${url.url}/api/docente/getEstudiantesPorCurso/`

export default function getEstudiantesCurso(idInstitucion, idCurso) {
    const url=urlBase+`${idInstitucion}/${idCurso}`;
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const usuarios = res
        return usuarios
    });
}

