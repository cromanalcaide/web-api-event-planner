import React, { useState } from "react";
import contact from "../../img/contact.png"
import "../../styles/contact.css";


export const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    return (
        <section className="vh-100 bg">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                        <div className="card">
                            <div className="card-body px-5 pt-5  text-start">
                                <div className="row row-cols-2 ">
                                    <div className="mb-md-5 mt-md-2">
                                        <h1 className="title pb-2">Contáctanos</h1>
                                        <h6 className="sub-title mb-2 pb-4">¿En qué podemos ayudarte? </h6>
                                        <input
                                            type="text"
                                            id="typeName"
                                            className="form-control form-control-lg mb-4 mr-5"
                                            placeholder="Nombre"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <input
                                            type="email"
                                            id="typeEmailX"
                                            className="form-control form-control-lg mb-4"
                                            placeholder="Correo electrónico"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <textarea
                                            type="text-area"
                                            id="typeCountry"
                                            className="text-area form-control form-control-lg mb-4 mr-5"
                                            placeholder="Te leemos..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button className="d-grid gap-2 lg-btn btn-primary btn-lg px-5" type="submit">
                                            Enviar
                                        </button>
                                    </div>
                                    <div className="w-50 p-3 text-start">
                                        <img className="contact-img w-100 p-1" src={contact} alt="contact illustration" />
                                        <p className="contact-info ps-5 ms-5 mb-0 mt-5"><i className="fa-solid fa-location-dot"></i> 123, Madrid, España</p> <br/>
                                        <p className="contact-info ps-5 ms-5 mb-0" ><i class="fa-solid fa-phone"></i>911 123 456</p> <br/>
                                        <p className="contact-info ps-5 ms-5"><i class="fa-solid fa-envelope"></i>info@commeet.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};