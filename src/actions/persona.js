import api from "./api";

export const ACTION_TYPES = {
<<<<<<< HEAD
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data,
    edad: parseInt(data.edad ? data.edad : 0)
})
=======
    FETCH_ALL: 'FETCH_ALL',
    FETCH_BY_ID:'FETCH_BY_ID'
}

>>>>>>> 7f7efb93c81f39706d8038a0be69621cb57f1d77

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

<<<<<<< HEAD
export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.persona().create(data)
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
    api.persona().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
        //    onSuccess()
=======
export const fetchById = (id) => dispatch => {
    api.persona().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
>>>>>>> 7f7efb93c81f39706d8038a0be69621cb57f1d77
        })
        .catch(err => console.log(err))
}

<<<<<<< HEAD
export const Delete = (id) => dispatch => {
    api.persona().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
     //       onSuccess()
        })
        .catch(err => console.log(err))
    }
=======



>>>>>>> 7f7efb93c81f39706d8038a0be69621cb57f1d77

