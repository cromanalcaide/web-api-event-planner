import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';

import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css'


export const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState(new Date());
    
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

    let onlyDay = format(selectedDay, 'PP');
    let formatDay = format(selectedDay, 'PPPP', { locale: es });
    
    let futureDate = eventsByGuests.filter(item =>   format(new Date (item.date), 'PP') == onlyDay && new Date(item.date).getTime() > new Date().getTime());
    futureDate.sort(function(a, b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
     
    let bookedDays = eventsByGuests.map((el => new Date(el.date) > new Date() ? new Date(el.date) : null));
    const bookedStyle = { color: "red" , fontWeight: "bold" };

    return (
        <div>
      <DayPicker 
        locale={es}
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        modifiers={{ booked: bookedDays }}
        modifiersStyles={{ booked: bookedStyle }}
      />
      <div className='next-events'  >
                  {futureDate.length === 0 ? <h5 className = "numEvent">No tienes ningún evento el {formatDay}</h5>
                  :futureDate.length === 1 ? <h5 className = "numEvent">Tienes {futureDate.length} evento el {formatDay}</h5>
                  :<h5 className = "numEvent">Tienes {futureDate.length} eventos el {formatDay}</h5>
                  } 
                  
                  {futureDate.map((el, index) => {
                  return (
                    <div key={index}>
                    <Link to={"/singleevent/" + el.id}>
                  <p className='p-event' > Hora: {el.date.slice(11 , 16)} &nbsp;&nbsp;&nbsp; {el.title} &nbsp;&nbsp;&nbsp;  Lugar: {el.location} &nbsp;&nbsp;&nbsp; Ver detalles</p>
                  </Link>
                  </div>
                  )})}
            </div>
      </div>
    );
}