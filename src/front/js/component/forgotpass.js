import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import CryptoJS from 'crypto-js';
import "crypto-js/aes";
// import Base64 from 'crypto-js/enc-base64';
// import Base64 from "crypto-js/enc-base64.js";
// import { AES } from "crypto-js";
import emailjs from 'emailjs-com';



export const ForgotPass = () => {
    const [emailFP, setEmailFP] = useState('');

    var CryptoJS = require("crypto-js");
    console.log(CryptoJS.HmacSHA1("Message", "Key"));

    const handleEmailChange = (event) => {
        setEmailFP(event.target.value);
    }

    // const decipherToken = (encryptedToken) => {
    //     const encodedCiphertext = encryptedToken.ciphertext;
    //     const encodedNonce = encryptedToken.nonce;
    //     const encodedTag = encryptedToken.tag;
    //     const key = "una clave de 16 bytes";

    //     // Decodifica los valores de la respuesta JSON desde base64
    //     const ciphertext = CryptoJS.enc.Base64.parse(encodedCiphertext);
    //     const nonce = CryptoJS.enc.Base64.parse(encodedNonce);
    //     const tag = CryptoJS.enc.Base64.parse(encodedTag);

    //     // Cifra el mensaje utilizando la etiqueta de autenticación
    //     const encrypted = AES.encrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
    //       mode: CryptoJS.mode.EAX,
    //       nonce: nonce,
    //       tag: tag,
    //     });

    // Devuelve el mensaje cifrado en base64
    //     return encrypted.toString();
    //   };

    const sendEmail = (email, decryptedToken) => {
        const templateParams = {
            to_email: email,
            reset_token: decryptedToken,
        };
        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.log("Email sending failed:", error);
            });
    };

    const getTokenAndSendEmail = async () => {
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
                alert("An error has occurred while getting token");
                return false;
            }
            const data = await res.json();
            console.log(data)
            //   const decryptedToken = decipherToken(data.encrypted_token);
            //   sendEmail(data.email, decryptedToken);
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
                <button type='submit' className='forgot-pass-btn' onClick={() => { getTokenAndSendEmail() }}>Enviar</button>
            </div>
        </div>
    )
}