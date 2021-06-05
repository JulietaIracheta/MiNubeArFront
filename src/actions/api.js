import axios from "axios";
const baseUrl = "http://localhost:60671/api/"

export default {

    persona(url = baseUrl + 'persona/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },

    usuario(url = baseUrl + 'usuario/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    institucion(url = baseUrl + 'institucion/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    contenido(url = baseUrl + 'contenido/') {
        return {
            fetchById: id => axios.get(url + id),
            fetchByMateriaId: id => axios.get(url + "getContenidoByMateria/"+id),
            create: newRecord => axios.post(url+"cargarVideo", newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}