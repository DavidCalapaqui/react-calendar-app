import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

const initialState = {
    checking: true
}


describe('Pruebas en authReducer', ()=>{

    test('Debe de retornar el estado por defecto', () => { 
        const state = authReducer(initialState, {});    
        expect(state).toEqual({ checking: true });
    })

    test('authLogin debe autenticar el usuario', () => {

        const action = {
            type: types.authLogin,
            payload: {
                uid: "624f249163110b5315e90bf9",
                name:"David"
            }
        }
        const state = authReducer(initialState, action);

        expect(state).toEqual( { checking: false, uid: '624f249163110b5315e90bf9', name: 'David' })

    })



})