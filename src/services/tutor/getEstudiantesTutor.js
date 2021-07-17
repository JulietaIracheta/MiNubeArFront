const url = 'http://134.209.120.136:4000/api/tutor/6'

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