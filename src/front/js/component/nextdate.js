import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';

import "../../styles/nextdate.css"


export const Nextdate = ()=>{

    const [todoDates, setTodoDates] = useState([]);

  

    //let obj = {date: "2023-02-28", description: "Quedada el Domingo para correr 20 km", id: 5,image: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",location:  "Salou", time: "18:35", title: "Salir a correr", user_id: 4};

    let objPr = [{date: "2023-02-28", description: "Quedada el Domingo para correr 20 km", id: 5,image: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",location:  "Salou", time: "18:35", title: "Salir a correr", user_id: 4},
                {date: "2023-02-23", description: "Quedada el Lunes para nadar 2 km", id: 5,image: "https://img.freepik.com/foto-gratis/hembra-alegre-positiva-indica-espacio-copia-blanco-contenido-promocional_273609-18361.jpg?w=740&t=st=1676915141~exp=1676915741~hmac=cba4214b435541ae11f43b37023ef9911b89874b8d35c163fb6be04ae85455b0",location:  "Almeria", time: "18:34", title: "Nadar", user_id: 4},
                {date: "2023-02-22", description: "Quedada el Lunes para bici 200 km", id: 5,image: "https://img.freepik.com/foto-gratis/mujer-tranquila-cabello-tenido-pie-manos-cruzadas-sonrisa-sincera-encantadora-demostrando-sus-dientes-perfectos-posando_273609-7675.jpg?w=740&t=st=1676915061~exp=1676915661~hmac=a7ed395df20d9de8fbb8e2ca8fa0ee6ed7c35eb15ef39bba51f465a436272ff7",location:  "Madrid", time: "18:31", title: "Montar en bici", user_id: 4}];

  
    let futureDate = [];

    for (let i = 0; i< objPr.length; i++) {
      if (new Date (objPr[i].date).getTime() > new Date().getTime()){
        futureDate.push(objPr[i]);
    }

    }
    let arrayNumbers = [];
    for (let j = 0; j< futureDate.length; j++) {
    arrayNumbers.push(new Date (futureDate[j].date).getTime());
    }
    console.log(arrayNumbers);

    let min = Math.min(...arrayNumbers);
    console.log(min);

    let resFin = futureDate.filter(item => new Date (item.date).getTime()  === min);
    let resultFin = resFin[0];
   

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
              <img className="image-nexdate" src={resultFin.image}/>
            </div>
            <div className="col-sm-3">
              <p>{resultFin.title}</p>
              <p>{resultFin.date}</p>
              <p>{resultFin.time}</p>
            </div>
            <div className="col-sm-6">
              <p>{resultFin.location}</p>
              <p>{resultFin.description}</p>
              </div>
            <div className="col-sm-1">
            <Button variant="light">Ver Evento</Button>{' '}
            </div>
          </div>
        </div>
      
          );
        };