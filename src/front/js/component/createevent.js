
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Context } from "../store/appContext";

import { useNavigate } from "react-router-dom";

import "../../styles/createevent.css"


export const CreateEventForm = () => {
  const { store, actions } = useContext(Context);
  const [address, setAddress] = useState('');
  const [listCoorden, setCoorden] = useState('');
  const [listTitle, setTitle] = useState('');
  const [listDate, setDate] = useState('');
  const [listDescription, setDescription] = useState('');
  // const [listImage, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [imageSrc, setImageSrc] = useState("")
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('userId'))

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleUploadClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'ml_default');

    const cloudName = process.env.CLOUD_NAME

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log("this is data img", data)
    setImageSrc(data.secure_url);

    const objNewEvent = {
      title: listTitle,
      date: listDate,
      description: listDescription,
      location: address,
      image: data.secure_url,
      user_id: userId.id,
      coord: listCoorden
    };
  
    sendNewEvent(objNewEvent);
    navigate('/add-guest-event');
  }

  
  const sendNewEvent = async (newEvent) => {
    const URL = process.env.BACKEND_URL

    console.log(newEvent)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newEvent),
      }

    try {
      const resp = await fetch(`https://3001-cromanalcai-webapievent-8evfm2s59z0.ws-eu89.gitpod.io/api/event/register`, requestOptions)
      if (resp.status != 200) {
        alert("An error has occurred while creating the event");
        return false;
      }
      const data = await resp.json();
      console.log(data)
      return true;
    } catch (error) {
      console.log("There has been an error creating a event",error);
    }

  }
  


  const inputRef = useRef(null);
  const apiKey = process.env.REACT_APP_GOOGLEPLACES_API_KEY;
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const selectedAddress =
          place.formatted_address;
        setAddress(selectedAddress);

        const geocoder = new
          window.google.maps.Geocoder();
        geocoder.geocode({ address: selectedAddress },
          (results, status) => {

            if (status === "OK") {
              setCoorden([results[0].geometry.location.lat(), results[0].geometry.location.lng()])

              console.log(`Latitud: ${results[0].geometry.location.lat()}, Longitud: ${results[0].geometry.location.lng()}`);
            } else {
              console.error("No se pudo obtener la ubicación para la dirección especificada");
            }
          });
      });

    };


    return () => {
      document.body.removeChild(script);
    }
  }, [apiKey]);
  return (

    <div className='create-event'>
      <p className='create-title'>Ingresa aquí la información del nuevo evento</p>
      <form onSubmit={handleUploadClick}>
        <div className="form-group">
          <label className='create-label' htmlFor="exampleInputEmail1">Título</label>
          <input className="create-input form-control" onChange={(e) => {
            setTitle(e.target.value)
          }} type="text" name="title" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre de tu evento..." />
        </div>
        <div className="form-group">
          <label className='create-label' htmlFor="exampleInputEmail1">Fecha</label>
          <input className="create-input form-control" onChange={(e) => {
            setDate(e.target.value)
          }} type="text" name="date" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Fecha del evento" />
        </div>
        <div className="form-group">
          <label className='create-label' htmlFor="exampleInputEmail1">Descripción</label>
          <input className="create-input form-control" onChange={(e) => {
            setDescription(e.target.value)
          }} type="text-area" name="description" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Descripción del evento..." />
        </div>
        <div className="form-group">
          <label className='create-label' htmlFor="exampleInputEmail1">Imagen</label>
          <input className="create-input form-control" accept="image/*" onChange={handleFileInputChange}
            type="file" name="image" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter image" />
        </div>
        <div className="form-group">
          <label className='create-label' htmlFor="exampleInputEmail1">Lugar</label>
          <input
            className="create-input form-control"
            type="text"
            name="location"
            placeholder="Enter Location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            ref={inputRef}
          />
        </div>
        <button className='create-ev-btn' type="submit" >Crear Evento</button>
        {/* <Link to={"/evcontactform/"}>
            <button className='add-guest-btn'>Agregar Ivitados</button>
          </Link> */}
      </form >
    </div >


  );
};