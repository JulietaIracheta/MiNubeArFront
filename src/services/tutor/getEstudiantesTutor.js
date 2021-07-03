const url = 'http://localhost:60671/api/tutor/6'

export default function getEstudiantesTutor() {
    return fetch(url, {
        method: 'GET',
        headers: { "Content-type": "application/json" },
        credentials: "include",
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const estudiantes = res
        return estudiantes
    });
}