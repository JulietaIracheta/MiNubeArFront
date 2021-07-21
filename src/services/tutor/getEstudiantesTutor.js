import url from "../../url"


export default function getEstudiantesTutor(jwt) {
const urlBase = `${url.url}/api/tutor?jwt=`+jwt

    return fetch(urlBase, {
        method: 'GET',
        headers: { "Content-type": "application/json" },
        credentials: "include",
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const estudiantes = res
        return estudiantes
    });
}