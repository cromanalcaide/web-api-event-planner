import React from "react";
import "../../styles/quees.css"

export const Quees = () => {
    return (
        <div className=" about text-center">
            <h1 className="about-title">¿Qué es <span>ComMeet</span>?</h1>
            <p className="about-text"> Cansados de tener un grupo de WhatsApp por cada salida con amigos, quedadas del trabajo <br/> o evento del cole de los nenes, creamos ComMeet, un planificador de eventos <b>rápido y ordenado</b>, para  <br/> personas organizadas a las que les gusta tener <b>toda la información en un solo lugar.</b> </p>
            {/* <p className="about-text"> Cree eventos, invite a sus amigos, establezca una fecha y un lugar, y vea <br/>cómo sus contactos aceptan su invitación (o responden "quizás" si son fanáticos del suspenso).</p> */}
            <p className="about-text"><strong>Cree eventos, invite a sus amigos, establezca una fecha y un lugar y listo! </strong></p>
            <p className="about-text"> ComMeet fue creado en 2023 como un pequeño y divertido proyecto para graduarse <br/> de su Full Stack Development Bootcamp. </p>
            <p className="about-text"> Esto es lo que sucede cuando se unen tres pequeños fanáticos del control <br/> a los que también les encanta programar.</p>
            <h2 className="about-subtitle"> LA HERRAMIENTA QUE NO SABÍAS QUE NECESITABAS </h2>
        </div>
    );
};