import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import emailjs from 'emailjs-com';



export const ForgotPass = () => {
    const [emailFP, setEmailFP] = useState('');

    const handleEmailChange = (e) => {
        setEmailFP(e.target.value)
    }


    const sendEmail = (email, userId) => {
        const mensaje = {
            from_name: 'El equipo de ComMeet',
            to_emails: email,
            subject: `Recuperación de contraseña`,
            message: `Hola!,

            Recibimos una solicitud para restablecer tu contraseña en nuestra web. Si no hiciste esta solicitud, puedes ignorar este correo electrónico y tu contraseña actual seguirá siendo válida.
            
            \nSi solicitaste el restablecimiento de la contraseña, haz clic en el siguiente enlace para continuar:
            
            \nhttps://3000-cromanalcai-webapievent-8evfm2s59z0.ws-eu89b.gitpod.io//set-new-pass/${userId}
            
            \nEste enlace es válido solo por un tiempo limitado, así que asegúrate de restablecer tu contraseña pronto. Si tienes problemas para restablecer tu contraseña, no dudes en ponerte en contacto con nuestro equipo de soporte.
            
            \nGracias,
            \nEl equipo de ComMeet.`,
        };

        const servicioID = 'service_yrjx7ri';
        const plantillaID = 'template_7tphbsi';
        const userID = 'DSeMYPcDEYnErZESa';

        emailjs.send(servicioID, plantillaID, mensaje, userID)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });


    };

    const getUserChecked = async () => {
        const BACKEND_URL = process.env.BACKEND_URL;

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: emailFP,
            }),
        };
        try {
            const res = await fetch(`${BACKEND_URL}/api/password-reset`, requestOptions);

            if (res.status !== 200) {
                alert("An error has occurred while checking the user");
                return false;
            }
            const data = await res.json();
            console.log(data)
            sendEmail(data.email, data.user_id)

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="card ">
            <div className="card-body p-5 text-center">
                <p className='logo-form'>ComMeet</p>
                <label className='label-forgot-pass'>
                    Correo electrónico:
                    <br />
                    <input className='input-forgot-pass form-control my-2' type="email" value={emailFP} onChange={handleEmailChange} />
                </label>
                <br />
                <p>Si estás registrado, recibirás un correo electrónico con un enlace y un token que deberás ingresar para recuperar tu contraseña. </p>
                <button type='submit' className='forgot-pass-btn' onClick={() => { getUserChecked() }}>Enviar</button>
            </div>
        </div>
    )
}