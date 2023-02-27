import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css"

export const Navbar = () => {

	const [activeButton, setActiveButton] = useState("")

	const handleClick = (id) => {
		setActiveButton(id)
	};

	return (
		<nav className="navbar navbar-expand-lg fixed-top">
			<div className="container-fluid">
				<p className="navbar-brand">ComMeet</p>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
					</svg></span>
				</button>
			<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
				<div className="navbar-nav">
					<ul className="nav-ul navbar-nav ">
						<li id="nav-li-1" className="active">
							<Link to="/" className="nav-link">
								<span className="nav-item">INICIO</span>
							</Link>
						</li>
						<li id="nav-li-2" className='active'>
							<Link to="/about" className="nav-link">
								<span className="nav-item">¿QUÉ ES COMMEET?</span>
							</Link>
						</li>
						<li id="nav-li-3" className='active'>
							<Link to="/contact" className="nav-link">
								<span className="nav-item">CONTACTO</span>
							</Link>
						</li>
						<li id="nav-li-4" className='active'>
							<Link to="/login" className="nav-link">
								<span className="nav-item">INGRESO/REGISTRO</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		</nav >
	);
};
