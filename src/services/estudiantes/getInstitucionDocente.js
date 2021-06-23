
const urlBase='http://localhost:60671/api/docente/';

const URL_DOCENTE = 'http://localhost:60671/api/docente/getInstitucionesDeUnDocente/'


export default async function getInstitucionDocente(id) {
    const url=urlBase+`${id}`
    return fetch(url, {
        method: 'GET',
        headers: { "Content-type": "application/json" },
        credentials: "include",
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const instDoc = res
        return instDoc
    });
}



export async function getInstitucionesDeUnDocente(id) {
    const url=`${URL_DOCENTE}${id}`
    return fetch(url, {
        method: 'GET',
        headers: { "Content-type": "application/json" },
        credentials: "include",
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const instDoc = res
        return instDoc
    });
}


