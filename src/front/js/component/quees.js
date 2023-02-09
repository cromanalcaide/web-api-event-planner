import React from "react";
import "../../styles/quees.css"

export const Quees = () => {
    return (
        <div className=" about text-center">
            <h1 className="about-title">¿Qué es <span>ComMeet</span>?</h1>
            <p className="about-text"> Es un planificador de eventos <b>rápido y ordenado</b>, para personas organizadas a las que les <br/> gusta tener <b>toda la información en un solo lugar.</b> </p>
            <p className="about-text"> Cree eventos, invite a sus amigos, establezca una fecha y un lugar, y vea <br/>cómo sus contactos aceptan su invitación (o responden "quizás" si son fanáticos del suspenso).</p>
            <p className="about-text"> ComMeet fue creado en 2023 como un pequeño y divertido proyecto para graduarse <br/> de su Full Stack Development Bootcamp. </p>
            <p className="about-text"> Esto es lo que sucede cuando se unen tres pequeños fanáticos del control <br/> a los que también les encanta programar.</p>
            <h2 className="about-subtitle"> LA HERRAMIENTA QUE NO SABÍAS QUE NECESITABAS </h2>
        </div>
    );
};