
import React, { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/rsvpform.css"

export const RsvpForm = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [rsvpResponse, setRsvpResponse] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const params = useParams();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSiChange = (event) => {
    if (event.target.checked) {
      setRsvpResponse(true);
    }
  }

  const handleNoChange = (event) => {
    if (event.target.checked) {
      setRsvpResponse(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      rsvp_status: rsvpResponse,
      event_id: parseInt(params.theid)
    };
    console.log(formData)
    actions.updateRSVP(formData)
    setShowConfirmation(true);

  }

  return (
    <div className='container-form-div'>
      <div className="rsvp-div">

        <form className="rsvp-form" onSubmit={handleSubmit}>
          {showConfirmation ? (
            <div>
              <p className='logo-form'>ComMeet</p>
              <p className='confirmation-msg'>¡Gracias por responder! Le informaremos al organizador del evento de tu respuesta.</p>
            </div>
          ) : (
            <div>
              <p className='logo-form'>ComMeet</p>
              <label className='label-rsvp-form'>
                Correo electrónico:
                <br />
                <input className='input-rsvp-form form-control' type="email" value={email} onChange={handleEmailChange} />
              </label>
              <br />
              <label className='label-rsvp-form'>¿Asistirás al evento?</label>
              <div className='checks-box'>
                <div>
                  <label className="container-check">
                    <input type="checkbox" value="si" onChange={handleSiChange} />
                    <div className="checkmark"></div>
                    <p className="check-label"> Si </p>
                  </label>
                </div>
                <div>
                  <label className="container-check">
                    <input type="checkbox" value="no" onChange={handleNoChange} />
                    <div className="checkmark"></div>
                    <p className="check-label"> No</p>
                  </label>
                </div>
              </div >
              <button type='submit' className='rsvp-sub-btn'>Enviar</button>
            </div>
          )}
        </form >
      </div >

    </div>
  );
}

