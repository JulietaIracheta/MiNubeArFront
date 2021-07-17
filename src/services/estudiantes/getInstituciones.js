const url='http://134.209.120.136:4000/api/institucion/';
const URL_ESTUDIANTE = 'http://134.209.120.136:4000/api/institucion/getInstitucionesDeUnEstudiante/'
const URL_INSTITUCION_DE_ESTUDIANTE = 'http://134.209.120.136:4000/api/institucion/getInstitucionDeUnEstudiante/'

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


export async function getInstitucionDeUnEstudiante(id) {
    console.info('entro a la peticion')
    const url=`${URL_INSTITUCION_DE_ESTUDIANTE}${id}`
    console.log('url: ' + url)
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