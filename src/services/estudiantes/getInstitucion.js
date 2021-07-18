import React from 'react'
import url from "../../url"
const urlBase=`${url.url}/api/institucion/`;

export default function getInstitucion(id) {
    const url=urlBase+`${id}`
    return fetch(url, {
        method: 'GET'
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const institucion = res.data
        return institucion
    });
}