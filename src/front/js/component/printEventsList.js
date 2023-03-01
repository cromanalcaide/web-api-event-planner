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

    futureDate.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime() }).shift();
    
   
    return (
        <div className='events-list'  >
            <p className='div-title'>Listado de eventos</p>
            {futureDate.map((el, index) => {
                return (
                    <div key={index} className="each-event">
                            <img  width="30" height="30" className='event-img rounded-circle' src={el.image}/>
                            <p className='event-title pt-1' > {el.title} <br/><span className='event-date'>{el.date}</span></p>
                            <div className="col ">
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