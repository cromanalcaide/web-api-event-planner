import { array } from 'prop-types';
import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';

import "../../styles/printeventslists.css"

export const Printeventslist = ()=>{

    const [eventDates, setEventDates] = useState([]);  
    const [eventGuests, setEventGhests] = useState([]);  

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
    futureDate.sort(function(a, b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
    console.log(futureDate);
    

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
        <div className='next-events'  >
            <h1>Lista Eventos</h1>
          {futureDate.map((el, index) => {
				return (
                    <p className='p-event' key={index}> Fecha: {el.date} &nbsp;&nbsp;&nbsp; {el.title} &nbsp;&nbsp;&nbsp;  Lugar: {el.location}</p>
                )})}
        </div>

          );
        };