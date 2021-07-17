const url = 'http://134.209.120.136:4000/api/notificacion/';

export default function eliminarNotificacion(id) {
    return fetch(url + id, {
        method: 'DELETE'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res
    });
}