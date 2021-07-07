import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data
})
export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.informe().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => alert(err))
}

export const update = (id, data) => dispatch => {
    data = formateData(data)
    api.informe().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            //    onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id) => dispatch => {
    api.informe().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            //       onSuccess()
        })
        .catch(err => console.log(err))
}

export const fetchById = (id) => dispatch => {
    api.informe().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}
export const fetchByEstudianteId = (id) => dispatch => {
    api.informe().fetchByEstudianteId(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}