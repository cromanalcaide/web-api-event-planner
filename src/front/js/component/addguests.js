import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/addguest.css"




export const AddGuestsToEvent = () => {

  const { store, actions } = useContext(Context);

  const userId = JSON.parse(localStorage.getItem('userId'))

  let eventsList = store.events;
  // let evListById = eventsList.filter(item => item.user_id === userId);
  let evListOrd = eventsList.sort(function (a, b) { return a.id - b.id });
  let lastEvent = evListOrd[evListOrd.length - 1];
  let lastEvId = { ...lastEvent }.id;
  let arr = [];
  for (let i = 0; i < eventsList.length; i++) {
    if (eventsList[i].id === lastEvId) {
      arr.push(eventsList[i]);
    }
  }

  let contactsList = store.userContacts;

  const [contactCheck, setContactCheck] = useState([])
  console.log(contactCheck)

  const copyCheck = [];
  for (let i = 0; i < contactCheck.length; i++) {
    copyCheck.push({ email: contactCheck[i].email, user_id: userId.id, event_id: lastEvId, contact_id: contactCheck[i].id })
  };
  console.log(copyCheck);


  const sendNewEventGuess = async (objGuessEvent) => {
    for (let i = 0; i < objGuessEvent.length; i++) {
      try {

        const url =
          "https://3001-cromanalcai-webapievent-8evfm2s59z0.ws-eu89.gitpod.io/api/events_guest/register"
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
    if (e.target.checked === true) {
      setContactCheck([...contactCheck, contactsList[(e.target.id)]]);
    }
    if (e.target.checked === false) {
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
    <div className='add-g-container container'>
      {arr.map((el, index) => {
        return (
          <div key={index} >
            <div className='row main-evc '>
              <div className="col-sm-6">
                <p className="add-g-title">Evento Creado</p>
                <img className="add-g-image image-nexdate  mt-2" width="120" height="120" src={el.image} />
                <h6 className="p-contacts">Evento</h6>
                <p className="p-singlee"><strong>{el.title}</strong></p>
                <p className="p-singlee"><strong>Horario: </strong>{el.date}</p>
                <p className="p-singlee"><strong>Lugar: </strong>{el.location}</p>
                <h6 className="p-singlee">Descripción</h6>
                <p className="p-contacts" >{el.description}</p>
              </div>
              <div className="col-sm-6 ">
                  <form onSubmit={handelClick}>
                    <h5>Choose a contact</h5>
                    {contactsList.map((el, index) => {
                      return (
                        <div key={index}>
                          <input onChange={handleChexbox} type="checkbox" id={index} defaultValue></input>
                          <label htmlFor="cbox2">{el.name}</label>
                        </div>
                      )
                    })}
                    <button type="submit" >Add Contacts</button>
                    <Link to={"/eventsform/"}>
                      <button >Add More Events</button>
                    </Link>
                  </form>
              </div>
            </div>
          </div>
        )
      })}


    </div>
  );
};