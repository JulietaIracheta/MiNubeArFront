const url = 'http://localhost:60671/api/comunicado/getComunicados'

export default async function getComunicados() {
    return await fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        return res
    });
}
