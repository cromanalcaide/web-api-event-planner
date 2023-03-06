import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CreateEventForm } from "../component/createevent";


export const Eventsform = () => {

  const { store, actions } = useContext(Context);


  const objNewEvent = {
    title: "",
    date: "",
    description: "",
    location: "",
    image: "",
    user_id: 11 // Modificar con datos de Local Storage
  };
  console.log(objNewEvent)

  const handelChange = (e) => {
    objNewEvent[e.target.name] = e.target.value;
  }

  const handelClick = (e) => {
    e.preventDefault();
    sendNewEvent(objNewEvent);
    e.target.reset();
  }


  const sendNewEvent = async (newEvent) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const url =
        "https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu89.gitpod.io/api/event/register"
      const request = {
        method: "POST",
        body: JSON.stringify(newEvent),

        headers: { "Content-Type": "application/json" },
      };
      console.log(request);
      const response = await fetch(url, request);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="eventsform-form">
      <CreateEventForm/>
    </div>
  );
};
