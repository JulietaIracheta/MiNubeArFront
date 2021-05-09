import React from 'react'
const urlBase='https://reqres.in/api/users/';

export default function getEstudiante(id) {
    const url=urlBase+`${id}`
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const estudiante = res.data
        return estudiante
    });
}