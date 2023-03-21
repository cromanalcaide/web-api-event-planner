import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "../../styles/singleevent.css"

export const Singleevent = props => {
	const { store, actions } = useContext(Context);

	const params = useParams();

  let eveResult = store.events.filter(el => el.id == params.theid);

  let eventGuestByEvent =store.eventguests.filter(el => el.event_id == params.theid);

  let allContacts = store.contacts;

  let namesByEvent = [];
    for (let i = 0; i < eventGuestByEvent.length; i++) {
      for (let j = 0; j < allContacts.length; j++) {
        if (eventGuestByEvent[i].contact_id === allContacts[j].id) {
          namesByEvent.push(allContacts[j]);
        }
      }
    }
 
    return (
      <div className='event-detail container text-center'>
      {eveResult.map((el, index) => {
      return (
      <div key={index} >
        <div  className='row'>
          <h1 id= "h1-singlee">Detalles del Evento</h1>
          <h1></h1>
          <h1></h1>
            <div className="col-sm-4">
              <img className="image-singlee" src={el.image}/>
            </div>
          <div className="col-sm-4">
            <h6 className="p-contacts">Evento</h6>
              <p className="p-singlee"><strong>{el.title}</strong></p>
              <p className="p-singlee"><strong>Horario: </strong>{el.date.split(" ")[0].split("-").reverse().join("-") + ' ' + el.date.split(" ")[1].slice(0,5)}</p>
              <p className="p-singlee"><strong>Lugar: </strong>{el.location}</p>
            <div className="p-singlee">
                <br></br>
                <br></br>
                  <h6>Asistentes</h6>
                  {namesByEvent.map((el, index) => {
                    return (
                      <div key={index}>     
                        <p key={index}>{el.name}</p>
                      </div>)})}
            </div>
          </div>
          <div className="col-sm-4">
            <h6 className="p-singlee">Descripción</h6>
            <p className="p-contacts" >{el.description}</p>
            <br></br>
            <br></br>
            <br></br>
            <Link to={"/events/"}> 
            <h6 className="p-contacts" >VOLVER AL LISTADO</h6>
            </Link>
            </div>
        </div>
      </div>
      )})}
    </div>)
  };
      
    
Singleevent.propTypes = {
	match: PropTypes.object
};