import { combineReducers } from "redux";
import { usuario } from "./usuario";
import { institucion } from "./institucion";
import {persona} from './persona';

export const reducers = combineReducers({
    usuario,
    institucion,
    persona
})