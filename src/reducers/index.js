import { combineReducers } from "redux";
import { usuario } from "./usuario";
import { institucion } from "./institucion";

export const reducers = combineReducers({
    usuario,
    institucion
})