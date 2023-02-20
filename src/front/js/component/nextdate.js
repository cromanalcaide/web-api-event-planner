import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';

import "../../styles/nextdate.css"


export const Nextdate = ()=>{

    const [todoDates, setTodoDates] = useState([]);

  

    let obj = {date: "2023-02-28", description: "Quedada el Domingo para correr 20 km", id: 5,image: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",location:  "Salou", time: "18:35", title: "Salir a correr", user_id: 4};

    let objPr = [{date: "2023-02-28", description: "Quedada el Domingo para correr 20 km", id: 5,image: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",location:  "Salou", time: "18:35", title: "Salir a correr", user_id: 4},
                {date: "2023-02-27", description: "Quedada el Lunes para nadar 2 km", id: 5,image: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",location:  "Almeria", time: "18:34", title: "Nadar", user_id: 4},
                {date: "2023-02-16", description: "Quedada el Lunes para bici 200 km", id: 5,image: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",location:  "Madrid", time: "18:31", title: "Montar en bici", user_id: 4}];

  
    let futureDate = [];

    for (let i = 0; i< todoDates.length; i++) {
      if (new Date (objPr[i].date).getTime() > new Date().getTime()){
        futureDate.push(objPr[i]);
    }

    }
    let arrayNumbers = [];
    for (let j = 0; j< futureDate.length; j++) {
    arrayNumbers.push(new Date (futureDate[j].date).getTime());
    }

    let min = Math.min(...arrayNumbers);

    let resultFin = futureDate.filter(item => new Date (item.date).getTime()  === min);

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

    console.log(todoDates);
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