import { combineReducers } from "redux";
import { usuario } from "./usuario";
import { institucion } from "./institucion";
import {persona} from './persona';
import {cursos} from './curso'

export const reducers = combineReducers({
    usuario,
    institucion,
    persona,
    cursos,
    
})