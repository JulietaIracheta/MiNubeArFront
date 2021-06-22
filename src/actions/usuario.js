import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}


const formateData = data => ({
    ...data,
    telefono: parseInt(data.telefono ? data.telefono : 0)
})

export const fetchAll = () => dispatch => {
    api.persona().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
            
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {

    data = formateData(data)
    api.usuario().create(data)
        .then(res => { 
            if(res.data.email !== ""){
                dispatch({
                    type: ACTION_TYPES.CREATE,
                    payload: res.data
                })
            }
            onSuccess(res.data)
        })
        .catch(err => {
            console.error(err)
            onSuccess({"email":"error"})
        })
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.usuario().update(id, data )
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess(res)
        })
        .catch(err => {
            console.error(err)
            onSuccess(null)
        })
}

export const Delete = (id, onSuccess) => dispatch => {
    api.usuario().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
           onSuccess()
        })
        .catch(err => console.log(err))
    }

