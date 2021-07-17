const url = 'http://134.209.120.136:4000/api/comunicado/getComunicados'

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
