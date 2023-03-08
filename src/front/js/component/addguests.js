import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/addguest.css"
import emailjs from 'emailjs-com';




export const AddGuestsToEvent = () => {
  const { store, actions } = useContext(Context);
  const Navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem('userId'))

  let eventsList = store.events;

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


  const sendInvitationToGuests = (invitados) => {

    const userInfo = store.user.result

    const mensaje = {
      from_name: 'El equipo de ComMeet',
      to_emails: invitados.map((invitado) => invitado.email),
      subject: `Invitación al evento ${lastEvent.title}`,
      message: `Hola!, ${userInfo.name} te ha invitado al evento ${lastEvent.title} que se realizará el ${lastEvent.date} en ${lastEvent.location}. ¡Esperamos verte allí!`,
    };
  
    const servicioID = 'service_yrjx7ri';
    const plantillaID = 'template_7tphbsi';
    const userID = 'DSeMYPcDEYnErZESa';
  
    emailjs.send(servicioID, plantillaID, mensaje, userID)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
  

  const handleClick = (e) => {
    e.preventDefault();
    actions.sendNewEventGuess(copyCheck);
    sendInvitationToGuests(contactCheck)
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
                <form  onSubmit={handleClick}>
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