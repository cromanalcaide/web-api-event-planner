import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/eventsform.css"


export const Eventsform = () => {
	const { store, actions } = useContext(Context);

  const [newEvent, setNewEvent] = useState([]) 
  
  console.log(newEvent)
 

  const objNewEvent = {
    title: "",
    date: "",
    description: "",
    location: "",
    image: "",
    user_id: "",
    name: "",
    email: "",
  };
  //let title = objNewEvent.title;

	const handelChange= (e) => {
		objNewEvent[e.target.name] = e.target.value;
	}

	const handelClick= (e) => {
		e.preventDefault();
		setNewEvent([objNewEvent]);
    sendNewEvent();
    sendNewContact();
		e.target.reset();
	}

  const sendNewEvent = async (title, date, description, location, image, user_id) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const url =
            "https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu88.gitpod.io/api/event/register" 
        const request = {
            method: "POST",
            body: JSON.stringify({
            "title": title, 
            "date": date, 
            "description": description, 
            "location": location, 
            "image": image,
            "user_id": user_id}),
          
            headers:  { "Content-Type":"application/json"
},
        };
        const response = await fetch(url, request);
        const result = await response.json();
        console.log(result);
        getTasksAPI();
        } catch (error) {
            console.log(error);
    }
};

const sendNewContact = async (title, email, user_id) => {
  console.log(title)
  try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const url =
          "https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu88.gitpod.io/api/contacts/register" 
      const request = {
          method: "POST",
          body: JSON.stringify({
            "name": name, 
            "email": email, 
            "user_id": user_id}),
          headers:  { "Content-Type":"application/json"
},
      };
      const response = await fetch(url, request);
      const result = await response.json();
      console.log(result);
      getTasksAPI();
      } catch (error) {
          console.log(error);
  }
};
 
    return (
      <div className="eventsform-form">
        <section className="section-eventsf vh-100 bg">
          <form onChange={handelChange} onSubmit={handelClick}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input type="text" name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Event"/>
                
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Date</label>
                <input type="text" name="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Date"/>
                
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Description</label>
                <input type="text" name="description" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Descripton Event"/>
                
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Location</label>
                <input type="text" name="location" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Place"/>
                
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Image</label>
                <input type="text" name="image" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter image"/>
                
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">User_Id</label>
                <input type="text" name="user_id" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter image"/>
                
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Contact Name</label>
                <input type="text" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter image"/>
                
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Contact Email</label>
                <input type="text" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter image"/>
                
              </div>
              <button type="submit" >Save</button>
          </form>
        </section>
  </div>
    );
  };
      
