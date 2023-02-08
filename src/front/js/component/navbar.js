import React, {useState} from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css"

export const Navbar = () => {

	const [activeButton, setActiveButton] = useState(1)

	const handleClick = (id)=> {
		setActiveButton(id)
	};

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<p className="navbar-brand">ComMeet</p>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<ul>
							<li className={activeButton === 1 ? 'active' : ''} onClick={() => handleClick(1)}>
								<Link to="/" className="link">
									<span className="nav-link">HOME</span>
								</Link>
							</li>
							<li className={activeButton === 2 ? 'active' : ''} onClick={() => handleClick(2)}>	
								<Link to="" className="link">
									<span className="nav-link">¿QUÉ ES COMMEET?</span>
								</Link>
							</li>
							<li className={activeButton === 3 ? 'active' : ''} onClick={() => handleClick(3)}>		
								<Link to="/contact" className="link">
									<span className="nav-link">CONTACTO</span>
								</Link>
							</li>	
							<li className={activeButton === 4 ? 'active' : ''} onClick={() => handleClick(4)}>
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
