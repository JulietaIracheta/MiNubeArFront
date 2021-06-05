const url = 'http://localhost:60671/api/contenido/getContenidoByMateria/3'

export default function getContenidos() {
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