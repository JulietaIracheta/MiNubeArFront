import React from 'react'
const urlBase='http://localhost:60671/api/docente/getCursos/';

export default async function getCursoDocente(id) {
    const url=urlBase+`${id}`
    return await fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const cursoDoc = res
        return cursoDoc
    });
}