import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './components/routes/AppRouter'
import { store } from './store/store'
//proveer informacion a los hojs en el arbol


export const CalendarApp = () => {
  return (
      
        <Provider store={store}>
          <AppRouter />
        </Provider>
            
      
    
  )
}
