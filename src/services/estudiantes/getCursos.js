import React from 'react'
const urlBase='http://localhost:60671/api/cursos/';

export default function getCursos() {
    const url=urlBase
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const cursos = res
        return cursos
   
    });
}