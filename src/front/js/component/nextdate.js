import { array } from 'prop-types';
import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';

import "../../styles/nextdate.css"

// Dudas: Como coger el número de usuario para hacer el filtro de eventos
// Pero entonces sólo saldrían eventos por usuario: y si soy invitado.
// Poner campos de entrada con máximo de palabras para no desbordar texto
// O dar opción a seguir leyendo en la ventana de texto
// Esta es la primera página que ve el usuario despues de registrarse
// Si es así: link Listado de eventos por usuario y desde éste a evento
// en concreto. Crear página listado eventos y evento en concreto. 
// Quitar de base de datos "time" y ver como coger la fecha completa inclui-
// la hora en el formulario. Trabajos pendientes y repartin.

export const Nextdate = ()=>{

    const [eventDates, setEventDates] = useState([]);  
    const [eventGuests, setEventGhests] = useState([]);  

    console.log(eventDates);
    console.log(eventGuests);

    let getGuestsEmail = eventGuests.filter(item => item.email === "juanmism@gmail.com");

    let eventsByGuests = [];
    for (let i = 0; i < eventDates.length; i++) {
      for (let j = 0; j < getGuestsEmail.length; j++) {
        if (eventDates[i].id === getGuestsEmail[j].event_id) {
          eventsByGuests.push(eventDates[i]);
        }
      }
    }

    let actualTime = new Date().getTime(); 
    let futureDate = eventsByGuests.filter(item => new Date (item.date).getTime() > actualTime );
    //futureDate.sort(function(a, b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
   
    let arrayData = [];
    for (let j = 0; j< futureDate.length; j++) {
    arrayData.push(new Date (futureDate[j].date).getTime());
    }
    let minDate = Math.min(...arrayData);
    let resFin = futureDate.filter(item => new Date (item.date).getTime()  === minDate);
    //let restFin = [futureDate[0]];
 
    const getEventsGuests = () =>{
      fetch('https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu88.gitpod.io/api/events_guests', {method:"GET"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEventGhests(data.results);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  
    const getAllEvents = () =>{
      fetch('https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu88.gitpod.io/api/events', {method:"GET"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEventDates(data.results);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    useEffect( () => {
      getAllEvents();
      getEventsGuests();
    }, []);

    return (
     
        <div className='nexdate-main container text-center'>
          {resFin.map((el, index) => {
					return (
				  <div key={index} >
            <div  className='row'>
              <h1 id= "h1-nextdate">Próximo Evento</h1>
              <h1></h1>
              <div className="col-sm-2">
                <img className="image-nexdate" src={el.image}/>
              </div>
              <div className="col-sm-3">
                <p className="p-nextdate"><strong>{el.title}</strong></p>
                <p className="p-nextdate"><strong>Horario: </strong>{el.date}</p>
              </div>
              <div className="col-sm-5">
                <p className="p-nextdate"><strong>Lugar: </strong>{el.location}</p>
                <p className="p-nextdate" ><strong>Descripcion: </strong>{el.description}</p>
                </div>
              <div className="col-sm-2">
              <a className="p-nexdate" href="">Ir a Evento</a>
              </div>
            </div>
          </div>
          )})}
        </div>
          );
        };