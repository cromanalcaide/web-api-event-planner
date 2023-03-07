import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


import "../../styles/nextevent.css"

export const Nextevent = () => {

    const { store, actions } = useContext(Context);

    const eventos = store.events;
    const evguest = store.eventguests;

    const userInfo = store.user?.result
    const userEmail = userInfo?.email
    const userId = userInfo?.id


    let eventsOfUser = eventos.filter(item => item.user_id === userId) ///
    let getGuestsEmail = evguest.filter(item => item.email === userEmail);
    console.log("NextEvent2", getGuestsEmail)

    let eventsByGuests = [];
    for (let i = 0; i < eventos.length; i++) {
        for (let j = 0; j < getGuestsEmail.length; j++) {
            if (eventos[i].id === getGuestsEmail[j].event_id) {
                eventsByGuests.push(eventos[i]);
            }
        }
    }
    console.log(eventsByGuests)
    let actualTime = new Date().getTime();
    let futureDate = eventsByGuests.filter(item => new Date(item.date).getTime() > actualTime);

    let futureEvents = [...eventsOfUser, ...futureDate];///
    let futureEventsFiltered = futureEvents.filter(item => new Date(item.date).getTime() > actualTime);///

    let arrayData = [];
    for (let j = 0; j < futureEventsFiltered.length; j++) {
        arrayData.push(new Date(futureEventsFiltered[j].date).getTime());
    }

    let minDate = Math.min(...arrayData);
    let nextEvent = futureEventsFiltered.filter(item => new Date(item.date).getTime() === minDate)[0];

    // let arrayData = [];
    // for (let j = 0; j < futureDate.length; j++) {
    //     arrayData.push(new Date(futureDate[j].date).getTime());
    // }

    // let minDate = Math.min(...arrayData);
    // let resFin = futureDate.filter(item => new Date(item.date).getTime() === minDate);

    return (
        <div className='nexdate-main container text-center'>
            {nextEvent ? (
                <div>
                    <div className='row'>
                        <p id="title-nextdate" className="ms-2">Próximo Evento</p>
                        <h1></h1>
                        <div className="col-sm-2">
                            <img width="80" height="80" className="image-nexdate rounded-circle mt-2" src={nextEvent.image} />
                        </div>
                        <div className="col-sm-3">
                            <p className="p-nextdate mt-3"><strong>{nextEvent.title}</strong></p>
                            <p className="p-nextdate"><strong>Horario: </strong>{nextEvent.date}</p>
                        </div>
                        <div className="col-sm-5">
                            <p className="p-nextdate mt-3"><strong>Lugar: </strong>{nextEvent.location}</p>
                            <p className="p-nextdate" ><strong>Descripcion: </strong>{nextEvent.description}</p>
                        </div>
                        <div className="col-sm-2">
                            <Link to={"/singleevent/" + nextEvent.id}>
                                <p className="see-event-btn btn" >Ver evento</p>
                            </Link>
                        </div>
                    </div>
                </div>
            ) :
                (<div> No hay eventos programados aún </div>)}
        </div>
    );
}    