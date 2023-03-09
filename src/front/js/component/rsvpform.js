import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import "../../styles/rsvpform.css"

export const RsvpForm = () => {
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
    const BACKEND_URL = process.env.BACKEND_URL
    
    const formData = {
      email: email,
      rsvp_status: rsvpResponse,
      event_id: parseInt(params.theid)
    };
    
    console.log(formData)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    };
    try {
      const resp = await fetch(`${BACKEND_URL}/api/actualizar-rsvp`, requestOptions)
      if (resp.status != 200) {
        console.log("An error has occurred");
        return false;
      }
      const data = await resp.json();
      console.log(data)
      setShowConfirmation(true); 
      return true

    }catch (error) {
      console.error("There has been an error with the RSVP")
    }
  }

  return (
  <div className='container-form-div'>  
    <div className="rsvp-div">
    {showConfirmation ? ( 
        <p>¡Gracias por responder! Le informaremos al organizador del evento de tu respuesta.</p>
      ) : (
      <form className="rsvp-form" onSubmit={handleSubmit}>
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
      </form > )}
    </div >
  </div>  
  );
}

