import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";




export const AddGuestsToEvent = () => {

  const { store, actions } = useContext(Context);

  const userId = JSON.parse(localStorage.getItem('userId'))

  let eventsList = store.events;
  let evListById = eventsList.filter(item => item.user_id === userId);
  console.log(eventsList)
  let evListOrd = evListById.sort(function(a, b){return a.id - b.id});
  console.log(evListOrd)
  let lastEvent = evListOrd[evListOrd.length - 1];
  let lastEvId = {...lastEvent}.id;
  console.log(lastEvent);
  console.log(lastEvId);

  

  let contactsList = store.userContacts;
  let contactUser = contactsList.filter(el => el.user_id === userId); 


  const [contactCheck, setContactCheck] = useState([]) 
  console.log(contactCheck)

  const copyCheck = [];
  for (let i = 0; i < contactCheck.length; i++) {
   copyCheck.push({email: contactCheck[i].email, user_id: contactCheck[i].user_id, event_id: lastEvId, contact_id: contactCheck[i].id})
    };
    console.log(copyCheck);


  const sendNewEventGuess = async (objGuessEvent) => {
    for (let i = 0; i < objGuessEvent.length; i++) {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const url =
        "https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu89.gitpod.io/api/events_guest/register"
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
    <div className="eventsform-form">
      <section className="section-eventsf vh-100 bg">
        <form  onSubmit={handelClick}>

          <h5>Choose a contact</h5>
          {contactUser.map((el, index) => {
					return (
            <div key={index}>
            <input onChange={handleChexbox}  type="checkbox" id={index} defaultValue></input> 
            <label htmlFor="cbox2">{el.name}</label>
          </div> 
          )})}
          <button type="submit" >Create Event</button>
        </form>
      </section>
    </div>
  );
};
