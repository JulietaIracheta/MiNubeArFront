import url from "../../url"
const urlBase = `${url.url}/api/notificacion/`;

export default function eliminarNotificacion(id) {
    return fetch(urlBase + id, {
        method: 'DELETE'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res
    });
}