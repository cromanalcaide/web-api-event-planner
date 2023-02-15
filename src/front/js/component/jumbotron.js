import React from 'react'
import { Link } from 'react-router-dom'

import jumbimage1 from "../../img/jumbimg1.png"
import jumbimage2 from "../../img/jumbimg2.png"
import jumbimage3 from "../../img/jumbimg3.png"

import "../../styles/jumbotron.css"

export const Jumbotron = () => {

    return (
        <section className="bg d-flex justify-content-center">
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center hero">
                    <div className="col-10 col-sm-8 col-lg-6 hero-imgs">
                        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={jumbimage1} className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src={jumbimage2} className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src={jumbimage3} className="d-block w-100" alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6 hero-content">
                        <div className="lc-block mb-3">
                            <div editable="rich">
                                <h1 className="hero-text fw-bold display-5">Con <span>ComMeet</span> ya no tienes más excusas!</h1>
                            </div>
                        </div>
                        <div className="lc-block mb-3">
                            <div editable="rich">
                                <p className="hero-subtext lead">Organizá tu evento o salida de forma rápida y sencilla!. </p>
                            </div>
                        </div>
                        <div className="lc-block d-grid gap-2 d-md-flex justify-content-md-start button-div">
                            <Link to="/register">
                                <button type="button" className="start-btn btn btn-primary btn-lg px-4 me-md-2">Comienza ahora <i className="arrow fa-solid fa-arrow-right"></i></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};






