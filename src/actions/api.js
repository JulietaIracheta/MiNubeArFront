import axios from "axios";

const baseUrl = "http://localhost:60671/api/"



export default {

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
    }
}