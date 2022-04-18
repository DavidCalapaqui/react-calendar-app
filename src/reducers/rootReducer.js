

//combinacion de mis reducers: auth, calendario,ui

import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

//ASI VA A LUCIR EL STORE
export const rootReducer = combineReducers({
    
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})