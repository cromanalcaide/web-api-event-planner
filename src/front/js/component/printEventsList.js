import React, { useContext } from 'react'
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


import "../../styles/printeventslist.css"

export const PrintEventsList = () => {

    const { store, actions } = useContext(Context);

    const eventos = store.events;
    const evguest = store.eventguests;

    const userInfo = store.user?.result
    const userEmail = userInfo?.email
    const userId = userInfo?.id

    let eventsOfUser = eventos.filter(item => item.user_id === userId) ///
    let getGuestsEmail = evguest.filter(item => item.email === userEmail);

    let eventsByGuests = [];

    for (let i = 0; i < eventos.length; i++) {
        for (let j = 0; j < getGuestsEmail.length; j++) {
            if (eventos[i].id === getGuestsEmail[j].event_id) {
                eventsByGuests.push(eventos[i]);
            }
        }
    }

    let actualTime = new Date().getTime();
    let futureDate = eventsByGuests.filter(item => new Date(item.date).getTime() > actualTime);
    let futureEvents = [...eventsOfUser, ...futureDate];///
    let futureEventsFiltered = futureEvents.filter(item => new Date(item.date).getTime() > actualTime);///


    futureEventsFiltered.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime() }).shift();

    const eventsById = {};
    for (const event of futureEventsFiltered) {
        if (!eventsById[event.id]) {
            eventsById[event.id] = event;
        }
    }
    const uniqueEvents = Object.values(eventsById);

    return (
        <div className='events-list'  >
            <p className='div-title'>Listado de eventos</p>
            {uniqueEvents.map((el, index) => {
                return (
                    <div key={index} className="events">
                        <div className='each-event'>
                            <img width="30" height="30" className='event-img rounded-circle' src={el.image} />
                            <p className='event-title' >{el.title}</p>
                        </div>
                        <div className='col each-date'>
                            <span className='event-date'>{el.date}</span>
                        </div>
                        <div className="col event-btn ">
                            <Link to={"/singleevent/" + el.id} className="text-decoration-none">
                                <p className="see-more-btn btn" >Ver evento</p>
                            </Link>
                        </div>
                    </div>

                )
            })}
        </div>
    );
};