const url = 'http://localhost:60671/api/evento/'

export default function getEventos() {
    
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    });
}