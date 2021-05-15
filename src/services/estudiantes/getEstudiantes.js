const url = 'https://reqres.in/api/users?page=2'

export default function getEstudiantes() {
    /*
    prueba llamada get y post a Api de c#
    var f = 'https://localhost:44330/weatherforecast';
    fetch(f, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const x = res
        console.log(x)
    });
    var docente={
        nombre:"marcos"
    }
    fetch('https://localhost:44330/weatherforecast', {        
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(docente)
      });
*/
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