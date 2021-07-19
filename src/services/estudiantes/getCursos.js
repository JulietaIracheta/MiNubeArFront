import url from "../../url"

const urlBase=`${url.url}/api/cursos/`;

export default function getCursos() {
    const url=urlBase
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const cursos = res
        return cursos
   
    });
}


const urlBaseCursosDeInstitucion=`${url.url}/api/cursos/getCursosDeUnaInstitucion/`;

export function getCursosDeUnaInstitucion(id) {
    const url= `${urlBaseCursosDeInstitucion}${id}`
    console.log('url: ' + url)
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const cursos = res
        return cursos
   
    });
}