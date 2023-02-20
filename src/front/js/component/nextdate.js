import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';

import "../../styles/nextdate.css"


export const Nextdate = ()=>{

    const [todoDates, setTodoDates] = useState([]);

    let obj = {date
      : 
      "18/02/2023",
      description
      : 
      "Quedada el Domingo para correr 20 km",
      id
      : 
      5,
      image
      : 
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
      location
      : 
      "Salou",
      time
      : 
      "18:35",
      title
      : 
      "Salir a correr",
      user_id
      : 
      4}

  
    const getAlldates = () =>{
      fetch('https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu87.gitpod.io/api/events', {method:"GET"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodoDates(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    useEffect( () => {
      getAlldates();
    }, []);
    return (
        <div className='nexdate-main container text-center'>
          <div className='row'>
            <h1>Próximo Evento</h1>
            <h1></h1>
            <div className="col-sm-2">
              <img className="image-nexdate" src={obj.image}/>
            </div>
            <div className="col-sm-3">
              <p>{obj.title}</p>
              <p>{obj.date}</p>
              <p>{obj.time}</p>
            </div>
            <div className="col-sm-6">
              <p>{obj.location}</p>
              <p>{obj.description}</p>
              </div>
            <div className="col-sm-1">
            <Button variant="light">Ver Evento</Button>{' '}
            </div>
          </div>
        </div>
      
          );
        };