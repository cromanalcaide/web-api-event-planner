import { array } from 'prop-types';
import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../store/appContext";

import Button from 'react-bootstrap/Button';

import "../../styles/printeventslists.css"

export const Printeventslist = ()=>{

    const { store, actions } = useContext(Context);

    const eventos = store.events;
    const evguest = store.eventguests;

    let getGuestsEmail = evguest.filter(item => item.email === "juanmism@gmail.com");

    let eventsByGuests = [];
    for (let i = 0; i < eventos.length; i++) {
      for (let j = 0; j < getGuestsEmail.length; j++) {
        if (eventos[i].id === getGuestsEmail[j].event_id) {
          eventsByGuests.push(eventos[i]);
        }
      }
    }

    let actualTime = new Date().getTime(); 
    let futureDate = eventsByGuests.filter(item => new Date (item.date).getTime() > actualTime );
    futureDate.sort(function(a, b){return new Date(a.date).getTime() - new Date(b.date).getTime()});

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