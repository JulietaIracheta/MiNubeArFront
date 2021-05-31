const url = 'http://localhost:60671/api/persona/getEstudiantesAsignados/1'

export default function getEstudiantes() {
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