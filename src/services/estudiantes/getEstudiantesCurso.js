const urlBase = 'http://localhost:60671/api/persona/getEstudiantesCurso/'

export default function getEstudiantesCurso(id) {
   
    const url=urlBase+`${id}`;
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

