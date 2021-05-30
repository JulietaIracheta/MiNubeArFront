const url='http://localhost:60671/api/institucion/';

export default function getInstituciones() {
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const instituciones = res.data
        console.log(instituciones)
    });
}