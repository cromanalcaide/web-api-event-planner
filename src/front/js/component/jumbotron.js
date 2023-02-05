import React from 'react'
import { Link } from 'react-router-dom'

import jumbimage1 from "../../img/jumbimg1.png"
import jumbimage2 from "../../img/jumbimg2.png"
import jumbimage3 from "../../img/jumbimg3.png"

import "../../styles/jumbotron.css"

export const Jumbotron = () => {

    return (
        <section className="vh-100 bg">
            <div class="container col-xxl-8 px-4 py-5">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div class="col-10 col-sm-8 col-lg-6">
                        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={jumbimage1} class="d-block w-100" alt="..."/>
                                </div>
                                <div class="carousel-item">
                                    <img src={jumbimage2} class="d-block w-100" alt="..."/>
                                </div>
                                <div class="carousel-item">
                                    <img src={jumbimage3} class="d-block w-100" alt="..."/>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="lc-block mb-3">
                            <div editable="rich">
                                <h1 class="hero-text fw-bold display-5">Con <span>ComMeet</span> ya no tienes más excusas!</h1>
                            </div>
                        </div>
                        <div class="lc-block mb-3">
                            <div editable="rich">
                                <p class="hero-subtext lead">Organizá tu evento o salida de forma rápida y sencilla!. </p>
                            </div>
                        </div>
                        <div class="lc-block d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link to="/register">
                                <button type="button" className="start-btn btn btn-primary btn-lg px-4 me-md-2">Comienza ahora <i class="fa-solid fa-arrow-right"></i></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};






