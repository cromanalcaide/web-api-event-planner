import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';

import "../../styles/nextdate.css"


export const Nextdate = ()=>{

    const [todoDates, setTodoDates] = useState([]);  
  
    let futureDate = [];

    for (let i = 0; i< todoDates.length; i++) {
      if (new Date (todoDates[i].date).getTime() > new Date().getTime()){
        futureDate.push(todoDates[i]);
    }

    }
    let arrayNumbers = [];
    for (let j = 0; j< futureDate.length; j++) {
    arrayNumbers.push(new Date (futureDate[j].date).getTime());
    }
   
    let min = Math.min(...arrayNumbers);
    
    let resFin = futureDate.filter(item => new Date (item.date).getTime()  === min);
  
    const getAlldates = () =>{
      fetch('https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu87.gitpod.io/api/events', {method:"GET"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodoDates(data.results);
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
          {resFin.map((el) => {
					return (
				  <>
            <div className='row'>
              <h1>Próximo Evento</h1>
              <h1></h1>
              <div className="col-sm-2">
                <img className="image-nexdate" src={el.image}/>
              </div>
              <div className="col-sm-3">
                <p>{el.title}</p>
                <p>{el.date}</p>
              </div>
              <div className="col-sm-6">
                <p>{el.location}</p>
                <p>{el.description}</p>
                </div>
              <div className="col-sm-1">
              <Button variant="light">Ver Evento</Button>{' '}
              </div>
            </div>
          </>
          )})}
        </div>
          );
        };