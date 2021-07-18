
import url from "../../url"
const urlB = `${url.url}/api/comunicado/getComunicados`

export default async function getComunicados() {
    return await fetch(urlB, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        return res
    });
}
