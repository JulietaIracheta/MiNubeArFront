const url = 'http://localhost:60671/api/notificacion/';

export default function eliminarNotificacion(id) {
    return fetch(url + id, {
        method: 'DELETE'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res
    });
}