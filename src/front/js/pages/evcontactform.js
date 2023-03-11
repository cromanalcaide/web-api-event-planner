import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


import "../../styles/evcontactsform.css"
import { array } from "prop-types";



export const Evcontactform = () => {

  const BACKEND_URL = process.env.BACKEND_URL

  const { store, actions } = useContext(Context);

  let eventsList = store.events;
  let evListById = eventsList.filter(item => item.user_id === 11);//Usar datos local.Storage.
  let evListOrd = evListById.sort(function(a, b){return a.id - b.id});
  let lastEvent = evListOrd[evListOrd.length - 1];
  let lastEvId = {...lastEvent}.id;
  let arr = [];
  for (let i = 0; i <eventsList.length; i++) {
    if (eventsList[i].id === lastEvId) {
      arr.push(eventsList[i]);
    }
  }
  
  let contactsList = store.contacts;
  let contactUser = contactsList.filter(el => el.user_id === 11); //Usar datos local.Storage.

  const [contactCheck, setContactCheck] = useState([]) 
  console.log(contactCheck)
  const copyCheck = [];
  for (let i = 0; i < contactCheck.length; i++) {
   copyCheck.push({email: contactCheck[i].email, user_id: contactCheck[i].user_id, event_id: lastEvId, contact_id: contactCheck[i].id})
    };


  const sendNewEventGuess = async (objGuessEvent) => {
    for (let i = 0; i < objGuessEvent.length; i++) {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const url = (`${BACKEND_URL}/api/events_guest/register/`)
      const request = {

        method: "POST",
        body: JSON.stringify(objGuessEvent[i]),

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
  };

  

  const handleChexbox = (e) => {
    if (e.target.checked === true){
      setContactCheck([...contactCheck, contactUser[(e.target.id)]]);
    }
    if (e.target.checked === false){
      let cheqOff = [...contactCheck];
		  cheqOff.splice(e.target.id, 1);
      setContactCheck(cheqOff);
    }
  }
  
  const handelClick = (e) => {
    e.preventDefault();
    sendNewEventGuess(copyCheck);
  }
  

  useEffect(() => {
    actions.getAllEvents();
  }, []);


  return (
    <div className=' container row'>
      {arr.map((el, index) => {
      return (
      <div key={index} >
        <div  className='row main-evc '>
          <h1 id= "h1-singlee">Evento Creado</h1>
          <h1></h1>
          <h1></h1>
            <div className="col-sm-6">
              <img className="image-singlee" src={el.image}/>
              <h6 className="p-contacts">Evento</h6>
              <p className="p-singlee"><strong>{el.title}</strong></p>
              <p className="p-singlee"><strong>Horario: </strong>{el.date}</p>
              <p className="p-singlee"><strong>Lugar: </strong>{el.location}</p>
            <h6 className="p-singlee">Descripción</h6>
            <p className="p-contacts" >{el.description}</p>
            </div>
          <div className="col-sm-6 ">
            <section className=" section-eventsf">
              <form   onSubmit={handelClick}>
                <h5>Choose a contact</h5>
                {contactUser.map((el, index) => {
                return (
                  <div key={index}>
                  <input onChange={handleChexbox}  type="checkbox" id={index} defaultValue></input> 
                  <label htmlFor="cbox2">{el.name}</label>
                </div> 
                )})}
                <button type="submit" >Add Contacts</button>
                    <Link to={"/eventsform/"}>
                      <button >Add More Events</button>
                    </Link>
              </form>
            </section>
            </div>
        </div>
      </div>
      )})}
    
    
    </div>
  );
};

