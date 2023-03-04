import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


import "../../styles/eventsform.css"



export const Evcontactform = () => {

  const { store, actions } = useContext(Context);

  let eventsList = store.events;
  let evListById = eventsList.filter(item => item.user_id === 11);//Usar datos local.Storage.
  let evListOrd = evListById.sort(function(a, b){return a.id - b.id});
  let lastEvent = evListOrd[evListOrd.length - 1]
  
  let contactsList = store.contacts;
  let contactUser = contactsList.filter(el => el.user_id === 11); //Usar datos local.Storage.
 
  console.log(contactUser);
  console.log(lastEvent);

  const [contactCheck, setContactCheck] = useState([]) 
  console.log(contactCheck)



  const handelClick = (e) => {
    e.preventDefault();
  }

  const handleChexbox = (e) => {
    setContactCheck([...contactCheck, contactUser[(e.target.value)]]);
  }
 
  /*/const sendContactUser = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(objNewEvent.name, objNewEvent.email, objNewEvent.user_id);
      const url =
        "https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu89.gitpod.io/api/contact/register"
      const request = {
        method: "POST",
        body: JSON.stringify({
          "name": objNewEvent.name,
          "email": objNewEvent.email,
          "user_id": objNewEvent.user_id
        }),
        headers: {
          "Content-Type": "application/json"
        },
      };
      const response = await fetch(url, request);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };*/
  useEffect(() => {
    actions.getAllEvents();
  }, []);


  return (
    <div className="eventsform-form">
      <section className="section-eventsf vh-100 bg">
        <form  onSubmit={handelClick}>
          
          <h5>Choose a contact</h5>
          {contactUser.map((el, index) => {
					return (
            <div key={index}>
            <input onChange={handleChexbox}  type="checkbox" id={index} value={index}></input> 
            <label htmlFor="cbox2">{el.name}</label>
          </div> 
          )})}
          <button type="submit" >Create Event</button>
        </form>
      </section>
    </div>
  );
};

