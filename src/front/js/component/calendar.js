import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { addMonths, isSameMonth } from 'date-fns';
import 'react-day-picker/dist/style.css';

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

    
    
    let form = format(selectedDay, 'PP');
    
    let futureDate = eventsByGuests.filter(item =>   format(new Date (item.date), 'PP') == form && new Date(item.date).getTime() > new Date().getTime());
    futureDate.sort(function(a, b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
    console.log(futureDate);

     
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
                  <h5>Eventos en {form}</h5>
                  {futureDate.map((el, index) => {
                  return (
                    <div key={index}>
                    <Link to={"/singleevent/" + el.id}>
                  <p className='p-event' > Fecha: {el.date} &nbsp;&nbsp;&nbsp; {el.title} &nbsp;&nbsp;&nbsp;  Lugar: {el.location} &nbsp;&nbsp;&nbsp; Ver detalles</p>
                  </Link>
                  </div>
                  )})}
            </div>
      </div>
    );
}