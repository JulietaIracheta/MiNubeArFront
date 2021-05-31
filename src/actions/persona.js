import api from "./api";

export const ACTION_TYPES = {
    FETCH_ALL: 'FETCH_ALL',
    FETCH_BY_ID:'FETCH_BY_ID'
}


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

export const fetchById = (id) => dispatch => {
    api.persona().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}





