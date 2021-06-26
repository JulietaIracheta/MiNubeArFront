import { ACTION_TYPES } from "../actions/comunicado";
const initialState = {
    list: []
}

export const comunicados = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(comunicado => comunicado.idComunicado === action.payload.id ? action.payload : comunicado)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}