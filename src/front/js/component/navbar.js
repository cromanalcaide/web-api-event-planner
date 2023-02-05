import React from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<p className="navbar-brand">ComMeet</p>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<Link to="/" className="link">
							<span className="nav-link" aria-current="page" href="#">HOME</span>
							{/* <hr className="nav-line border border-2 opacity-100" /> */}
						</Link>
						<Link to="" className="link">
							<span className="nav-link" href="#">¿QUÉ ES COMMEET?</span>
						</Link>
						<Link to="/contact" className="link">
							<span className="nav-link" href="#">CONTACTO</span>
						</Link>
						<Link to="/login" className="link">
							<span className="nav-link">LOGIN/REGISTRO</span>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};
