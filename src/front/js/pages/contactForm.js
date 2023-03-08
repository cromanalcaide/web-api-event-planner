import React, { useState, useRef } from "react";
import contact from "../../img/contact.png"
import "../../styles/contact.css";
import emailjs from 'emailjs-com';
import { Navbar } from "../component/navbar"
import { Footer } from "../component/footer"


export const ContactForm = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);



    const sendEmail = (e) => {
        e.preventDefault();

        if (name && email && message) {
            emailjs.sendForm('service_yrjx7ri', 'template_4c8z3k2', form.current,'DSeMYPcDEYnErZESa')
                .then((result) => {
                    console.log('El mensaje ha sido enviado con éxito', result.text);
                    setShowMessage(true);
                }, (error) => {
                    console.log('Error al enviar correo', error.text);
                });
            setMessage('')
            setEmail('')
            setName('')
        }
        else {
            console.log('Por favor complete todos los campos');
        }

    };

    return (
        <>
            <Navbar />
            <section className="vh-100 bg">
                <form ref={form} onSubmit={sendEmail}>
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                                <div className="card">
                                    <div className="card-body px-5 pt-5  text-start">
                                        <div className="row row-cols-2 ">
                                            <div className="mb-md-5 mt-md-2">
                                                <h1 className="title pb-2">Contáctanos</h1>
                                                <h6 className="sub-title mb-2 pb-4">¿En qué podemos ayudarte? </h6>
                                                {showMessage ? <p className="form-message"><b>Su mensaje ha sido enviado correctamente. Muchas gracias por contactarse con el equipo de ComMeet.</b></p> : null}
                                                <input
                                                    type="text"
                                                    id="typeName"
                                                    name="user_name"
                                                    className="cont-input form-control form-control-lg mb-4 mr-5"
                                                    placeholder="Nombre"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    id="typeEmailX"
                                                    name="user_email"
                                                    className="cont-input form-control form-control-lg mb-4 text-lowercase"
                                                    placeholder="Correo electrónico"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <textarea
                                                    type="text-area"
                                                    id="typeCountry"
                                                    name="message"
                                                    className="text-area cont-input form-control form-control-lg mb-4 mr-5"
                                                    placeholder="Te leemos..."
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                />
                                                <button className="d-grid gap-2 form-btn btn-lg px-5" type="submit">
                                                    Enviar
                                                </button>

                                            </div>
                                            <div className="w-50 p-3 text-start">
                                                <img className="contact-img w-100 p-1" src={contact} alt="contact illustration" />
                                                <p className="contact-info ps-5 ms-5 mb-0 mt-5"><i className="fa-solid-c fa-solid fa-location-dot"></i> 123, Madrid, España</p> <br />
                                                <p className="contact-info ps-5 ms-5 mb-0" ><i className="fa-solid-c fa-solid fa-phone"></i>911 123 456</p> <br />
                                                <p className="contact-info ps-5 ms-5"><i className="fa-solid-c fa-solid fa-envelope"></i>info@commeet.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <Footer />
        </>
    );
};