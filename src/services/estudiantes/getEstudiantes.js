const url='https://reqres.in/api/users?page=2'

export default function getEstudiantes(){
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const usuarios = res.data
        return usuarios
    });
}