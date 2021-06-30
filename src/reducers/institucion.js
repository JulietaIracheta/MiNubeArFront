import { ACTION_TYPES } from "../actions/institucion";
const initialState = {
    list: []
}

export const institucion = (state = initialState, action) => {

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
                list: state.list.map(institucion => institucion.idInstitucion === action.payload.id ? action.payload : institucion)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(institucion => institucion.idInstitucion != action.payload)
            }
            
        default:
            return state
    }
}