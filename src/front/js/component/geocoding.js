
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { date } from 'yup';

export const Geocoding = () => {
    const [address, setAddress] = useState('');
    const [listCoorden, setCoorden] = useState('');
    const [listTitle, setTitle] = useState('');
    const [listDate, setDate] = useState('');
    const [listTime, setTime] = useState('');
    const [listDescription, setDescription] = useState('');
    const [listImage, setImage] = useState('');
  
    let dateTime = listDate+" "+listTime+":00"
   
    const objNewEvent = {
      title: listTitle,
      date: dateTime,
      description: listDescription,
      location: address,
      image: listImage,
      user_id: 11, // Modificar con datos de Local Storage
      coord: listCoorden
    };
    console.log(objNewEvent)
    const navigate = useNavigate();

    const handelClick = (e) => {
      e.preventDefault();
      sendNewEvent(objNewEvent);
      e.target.reset();
      navigate('/evcontactform')
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


    const inputRef = useRef(null);
    const apiKey = process.env.REACT_APP_GOOGLEPLACES_API_KEY;
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            const autocomplete = new 
            window.google.maps.places.Autocomplete(inputRef.current);
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
        }}, [apiKey]);
        return (
         
          <section className="section-eventsf vh-100 bg">
            <form   onSubmit={handelClick}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input  onChange={(e) => {
                setTitle(e.target.value)}} type="text" name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Event" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Date</label>
                <input  onChange={(e) => {
                setDate(e.target.value)}} type="date" name="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Date" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Time</label>
                <input  onChange={(e) => {
                setTime(e.target.value)}} type="time" name="time" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Time" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Description</label>
                <input  onChange={(e) => {
                setDescription(e.target.value)}} type="text" name="description" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Descripton Event" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Image</label>
                <input  onChange={(e) => {
                setImage(e.target.value)}} type="text" name="image" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter image" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Location</label>
                <input
                    className="form-control"
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ref={inputRef}
                />
              </div>
                <button type="submit" >Create Event</button>
            </form>
          </section>
        );
};