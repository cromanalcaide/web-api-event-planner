import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { addMonths, isSameMonth } from 'date-fns';
import 'react-day-picker/dist/style.css';

export const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState(new Date());
    console.log(selectedDay)
    console.log(selectedDay.toISOString().slice(0, 10))

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
    let onliDay = selectedDay.toISOString().slice(0, 10);
    let futureDate = eventsByGuests.filter(item => new Date (item.date).toISOString().slice(0, 10) == onliDay );
    futureDate.sort(function(a, b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
    console.log(futureDate);


    
    return (
        <div>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
      />
      <div className='next-events'  >
                  <h5>Eventos el {onliDay}</h5>
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