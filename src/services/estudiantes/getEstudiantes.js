import url from "../../url"
const urlB = `${url.url}/api/persona/getEstudiantesAsignados/1`

export default function getEstudiantes() {
    return fetch(urlB, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const usuarios = res
        return usuarios
    });
}

