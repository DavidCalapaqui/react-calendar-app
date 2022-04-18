import React from 'react';
import {mount} from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';

import { eventStartDelete } from '../../../actions/events';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';


jest.mock('../../../actions/auth', ()=>({
    startLogin: jest.fn(),
    startRegister: jest.fn(),
}))

jest.mock('sweetalert2', ()=>({
    fire: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider
        store = {store}
    >
        <LoginScreen />
    </Provider>
);


describe('pruebas en <LoginScreen />', ()=>{

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('Debe de mostarse correctamente', () => { 

        expect(wrapper).toMatchSnapshot();

     })

    test('Debe de llamar el dispatch del login', () => { 
        //llenar inputs con valores para probar el login
        wrapper.find('input[name="loginEmail"]').simulate('change',{
            target: {
                name: "loginEmail",
                value: "david@gmail.com"
            }
        })

        wrapper.find('input[name="loginPassword"]').simulate('change',{
            target: {
                name: "loginPassword",
                value: "123456"
            }
        })


        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLogin).toHaveBeenCalledWith('david@gmail.com', '123456');

        

     })


     test('No hay registro si las contraseñas son diferentes', () => { 
    
        //cambios en registerPassword1 registerPassword1, simulate

        wrapper.find('input[name="registerPassword1"]').simulate('change',{
            target: {
                name: "registerPassword1",
                value: "123456"
            }
        })

        wrapper.find('input[name="registerPassword2"]').simulate('change',{
            target: {
                name: "registerPassword2",
                value: "1234564"
            }
        })

        //submit
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        //startRegister no sea llamado
        expect(startRegister).not.toHaveBeenCalled();
       
        //Swal.fire sea llamado con 'Error', 'Las contraseñas deben ser iguales', 'error'
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben ser iguales', 'error');
    
    })

    test('Debe dispararse el registro con traseñas iguales', () => { 

         //cambios en registerPassword1 registerPassword1, simulate

         wrapper.find('input[name="registerPassword1"]').simulate('change',{
            target: {
                name: "registerPassword1",
                value: "123456"
            }
        })

        wrapper.find('input[name="registerPassword2"]').simulate('change',{
            target: {
                name: "registerPassword2",
                value: "123456"
            }
        })

        //submit
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        //startRegister no sea llamado
        expect(startRegister).toHaveBeenCalled();
       
        //Swal.fire sea llamado con 'Error', 'Las contraseñas deben ser iguales', 'error'
        //expect(Swal.fire).not.toHaveBeenCalledWith('',);



     })
})