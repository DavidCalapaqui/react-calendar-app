import { types } from "../types/types";


const initialState = {
    //cuando se carga la app verificar si ya está autenticado anteriormente
    //esperando resultado de la api
    
    checking: true, 
    //uid: null,
    //name: null

}


export const authReducer = (state = initialState, action)=>{

    switch (action.type) {
        
        case types.authLogin: 
            return {
                ...state,
                ...action.payload,
                checking: false,
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            //borra el id y el name
            return {
                checking: false
            }
        
        default:
            return state;
    }

}