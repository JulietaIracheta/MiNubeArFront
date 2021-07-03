const url='http://localhost:60671/api/institucion/';
const URL_ESTUDIANTE = 'http://localhost:60671/api/institucion/getInstitucionesDeUnEstudiante/'

export default function getInstituciones() {
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const instituciones = res
        return instituciones
    });
}


export async function getInstitucionesDeUnEstudiante(id) {
    const url=`${URL_ESTUDIANTE}${id}`
    return fetch(url, {
        method: 'GET',
        headers: { "Content-type": "application/json" },
        credentials: "include",
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const instEst = res
        return instEst
    });
}