import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe('Pruebas en fetch', ()=>{

    let token = '';

    test('fetchSinToken debe funcionar', async() => { 

        const resp = await fetchSinToken('auth', {email: 'david@gmail.com', password: '123456'}, 'POST');
        const body = await resp.json();

        expect(resp instanceof Response).toBe(true);
        expect(body.ok).toBe(true);

        token = body.token;
     })

     test('fetchSinToken debe funcar', async() => { 
        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/', {}, 'GET');
        const body = await resp.json();

        //console.log(typeof body.eventos)

        expect(body.ok).toBe(true)
        //expect(typeof body.eventos).toBe(Object)
      })
     

})