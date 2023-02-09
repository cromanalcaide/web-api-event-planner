import React from "react";
import { Link } from "react-router-dom";
import "../../styles/description.css"

import image1 from "../../img/descriptionimg/crear-eventos.png"
import image2 from "../../img/descriptionimg/invita-a-participar.png"
import image3 from "../../img/descriptionimg/chat-interno.png"
import image4 from "../../img/descriptionimg/correo.png"


export const Description = () => {
    return (
    <section className="bg">    
        <div className="descript-cont row justify-content-center">
            <div className="col-sm-2">
                <div className="text-center mb-3" style={{width: 14 + "rem"}}>
                    <img src={image1} className="card-img-top" alt="..." style={{width: 8 + "rem"}}/>
                    <div className="card-body">
                        <h5 className="card-title">Crea tus eventos o reuniones</h5>
                        <p className="card-text">Gestiona y organiza todo tipos de eventos de forma fácil y rápida.</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-2">
                <div className="text-center mb-3" style={{width: 14 + "rem"}}>
                    <img src={image2} className="card-img-top" alt="..." style={{width: 7 + "rem"}}/>
                    <div className="card-body">
                        <h5 className="card-title">Invita a participar a quien tú quieras</h5>
                        <p className="card-text">Envía invitaciones para tu evento desde tu agenda de contactos en tu tablero personal.</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-2 ">
                <div className="text-center mb-3" style={{width: 14 + "rem"}}>
                    <img src={image3} className="card-img-top" alt="..." style={{width: 8.5 + "rem"}}/>
                    <div className="card-body">
                        <h5 className="card-title">Deja mensajes a tus invitados</h5>
                        <p className="card-text">Dentro de tu evento podrás dejar mensajes a tus invitados y ellos podrán responderte!</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-2">
                <div className="text-center mb-3" style={{width: 14 + "rem"}}>
                    <img src={image4} className="card-img-top" alt="..." style={{width: 7 + "rem"}}/>
                    <div className="card-body">
                        <h5 className="card-title">Obtén información sobre el RSVP </h5>
                        <p className="card-text">Tus invitados recibirán un correo de invitación al evento y podrán confirmar su asistencia.</p>
                    </div>
                </div>
            </div>
            <div className="lc-block d-grid gap-2 d-md-flex justify-content-md-center">
                 <Link to="/register">
                    <button type="button" className="start-btn btn btn-primary btn-lg px-4 mt-2 ">Comienza ahora <i className="fa-solid fa-arrow-right"></i></button>
                </Link>
            </div>
        </div> 
    </section>   
            );
};