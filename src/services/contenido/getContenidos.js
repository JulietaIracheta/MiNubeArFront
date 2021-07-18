import url from "../../url"

export default function getContenidos(idMateria, idCurso) {
    const urlB = `${url.url}/api/contenido/getContenidoByMateria/`+idMateria+"/"+idCurso;
    return fetch(urlB, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const contenidos = res
        return contenidos
    });
}