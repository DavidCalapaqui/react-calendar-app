import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
import { startChecking } from '../../actions/auth';
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {


  const dispatch = useDispatch();

  //termino de realizar la autenticacion
  const {checking, uid} = useSelector(state => state.auth);


  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])
  
  if(checking){
    return (<h5>Espere ...</h5>)
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/login' element={ 
              <PublicRoute uid={uid} >
                <LoginScreen/> 
              </PublicRoute>
            } 
          />
          <Route exact path='/*' 
            element={ 
              <PrivateRoute uid={uid}>
                <CalendarScreen />
              </PrivateRoute> 
            }  
          />
          
        </Routes>
      </div>
    </Router>
  )
}
