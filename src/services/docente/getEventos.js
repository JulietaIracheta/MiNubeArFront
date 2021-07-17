const url = 'http://134.209.120.136:4000/api/evento/'

export default function getEventos() {
    
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    });
}