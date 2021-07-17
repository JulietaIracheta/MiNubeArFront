export default function getContenidos(idMateria, idCurso) {
    const url = 'http://134.209.120.136:4000/api/contenido/getContenidoByMateria/'+idMateria+"/"+idCurso;
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const contenidos = res
        return contenidos
    });
}