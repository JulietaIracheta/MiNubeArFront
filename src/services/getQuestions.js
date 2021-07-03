const urlBase = 'http://localhost:60671/api/question/'

export default function getQuestions(id) {
    const url=urlBase+`${id}`
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const questions = res
        return questions
    });
}