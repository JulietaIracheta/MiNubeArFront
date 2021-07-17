import React from 'react'
const urlBase='http://134.209.120.136:4000/api/docente/getCursos/';

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