import { ACTION_TYPES } from "../actions/usuario";
const initialState = {
    list: []
}


export const usuario = (state = initialState, action) => {
    
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
                list: state.list.map(usuario => usuario.idUsuario === action.payload.id ? action.payload : usuario)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(usuario => usuario.idUsuario !== action.payload)
            }
            
        default:
            return state
    }
}