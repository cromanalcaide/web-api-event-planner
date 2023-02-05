import React from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css"

export const Navbar = () => {

	const items = document.querySelectorAll("ul li");
	items.forEach((item) => {
  	item.addEventListener("click", () => {
    document.querySelector("li.active").classList.remove("active");
    item.classList.add("active");
  	});
	});

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<p className="navbar-brand">ComMeet</p>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<ul>
							<li class="active">
								<Link to="/" className="link">
									<span className="nav-link" aria-current="page" href="#">HOME</span>
								</Link>
							</li>
							<li>	
								<Link to="" className="link">
									<span className="nav-link" href="#">¿QUÉ ES COMMEET?</span>
								</Link>
							</li>
							<li>		
								<Link to="/contact" className="link">
									<span className="nav-link" href="#">CONTACTO</span>
								</Link>
							</li>	
							<li>
								<Link to="/login" className="link">
									<span className="nav-link">LOGIN/REGISTRO</span>
								</Link>
							</li>	
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
