import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/addguest.css"




export const AddGuestsToEvent = () => {

  const { store, actions } = useContext(Context);
  const Navigate = useNavigate()
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

    Navigate( `/singleevent/${lastEvId} `)
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
                <img className="add-g-image  mt-2" width="120" height="120" src={el.image} />
                <p className="add-g-info"><strong className="marked-p">Título: <br/></strong> {el.title} </p>
                <p className="add-g-info"><strong className="marked-p">Horario: <br/></strong>{el.date}</p>
                <p className="add-g-info"><strong className="marked-p">Lugar: <br/></strong>{el.location}</p>
                <p className="add-g-info"><strong className="marked-p">Descripción:</strong> <br/> {el.description}</p>
                
              </div>
              <div className=" col">
                <form  onSubmit={handelClick}>
                  <p className="add-g-title">Elige a los invitados</p>
                  {contactsList.map((el, index) => {
                    return (
                      <div key={index} className="add-g-list">
                        <input onChange={handleChexbox} type="checkbox" id={index} defaultValue></input>
                        <label className="cont-name-label" htmlFor="cbox2">{el.name}</label>
                      </div>
                    )
                  })}
                  <button className="add-g-btn" type="submit"  >Agregar Invitados</button>
                </form>
              </div>
            </div>
          </div>

        )
      })}


    </div>
  );
};