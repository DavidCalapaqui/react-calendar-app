import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    
    //leer eventos del store
    const {events, activeEvent} = useSelector(state=>state.calendar);
    const {uid} = useSelector(state => state.auth);
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
    
    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])
    

    //doble click en el evento
    const onDoubleClick = (e) =>{
        //console.log('Arir modal')
        dispatch(uiOpenModal());
    }

    //cuando se selecciona el evento
    const onSelectEvent = (e) =>{
        dispatch(eventSetActive(e));
        
    }
    //cuando cambia la vista entre dia, mes , semana y agenda
    const onViewChange = (e)=>{
        setLastView(e)
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) =>{
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (event, start, end, isSelected) =>{
        //console.log(event, start, end, isSelected)

        

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660' ,
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

  return (
      <div className='calendar-screen'>

          <NavBar />

          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            selectable={true}
            onView={onViewChange}
            view={lastView}
            components={{
                event: CalendarEvent
            }}
          />
        
          <AddNewFab />
          {( activeEvent) &&
            <DeleteEventFab />
          }
         
          <CalendarModal />
      </div>
    
  )
}
