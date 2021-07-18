import url from "../../url"

const urlB = `${url.url}/api/evento/`

export default function getEventos() {
    
    return fetch(urlB, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    });
}