export default function getContenidos(idMateria) {
const url = 'http://localhost:60671/api/contenido/getContenidoByMateria/'+idMateria;
console.log(url);
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