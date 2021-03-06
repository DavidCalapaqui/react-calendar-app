import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
//cambiado para pruebas
if(process.env.NODE_ENV !== 'test'){
    Modal.setAppElement('#root');
}


const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hour');
const initEvent = {
    title: '', 
    notes: '',
    start: now.toDate(),
    end:   nowPlus1.toDate(),
}


export const CalendarModal = () => {
    
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleValid, setTitleValid] = useState( true );
    
    //abrir y cerrar modal desde el store
    const {modalOpen} = useSelector(state=>state.ui);
    const {activeEvent} = useSelector(state=>state.calendar);


    const dispatch = useDispatch();


    const [formValues, setFormValues] = useState({initEvent});
    
    const {title, notes,  start, end} = formValues;

    //al pendiente del active event
    useEffect(() => {
       if(activeEvent){
           setFormValues(activeEvent);
       }else{
           setFormValues(initEvent)
       }
    }, [activeEvent, setFormValues])
    

    const handleInputChange = ({target}) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = ()=>{
        //setIsOpen(false);
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent)
        
    }

    const handleStartDateChange = (e) =>{
        //se cambia a la fecha que se recibe del picker
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) =>{
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) =>{
        e.preventDefault();
        const momentStart = moment(start);
        const momenteEnd = moment(end);

        if(momentStart.isSameOrAfter(momenteEnd)){
            console.error('FECHA 2 DEBE SER MAYOR');
            return Swal.fire('Error', 'La fecha de fin debe ser mayor a la fecha de inicio', 'error')
           
        }

        if(title.trim().length<2){
            return setTitleValid(false); 
        }

        //actualizando
        if(activeEvent){
            dispatch(eventStartUpdate(formValues))
        }else{
            //creando un nuevo
            dispatch(eventStartAddNew(formValues));
        }

       
        
        setTitleValid(true);

        closeModal();
    }

  return (
    <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className='modal'
        overlayClassName='modal-fondo'
        ariaHideApp={!process.env.NODE_ENV === 'test'}
    >
       <h1> {(activeEvent)?'Editando evento': 'Nuevo evento'} </h1>
        <hr />
        <form 
        className="container"
        onSubmit={handleSubmitForm}
        >
            
            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker 
                    onChange={handleStartDateChange} 
                    value={start}
                    className='form-control' 
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker 
                    onChange={handleEndDateChange} 
                    value={end}
                    className='form-control' 
                    minDate={ start }
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${!titleValid && 'is-invalid'}`}
                    placeholder="T??tulo del evento"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={handleInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
