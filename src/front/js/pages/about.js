import React from "react";
import { Quees } from "../component/quees";
import { OurTeam } from "../component/ourteam";
import { Navbar } from "../component/navbar"
import { Footer } from "../component/footer"
import "../../styles/quees.css"


export const About = () => {
	return (
		<>
		<Navbar/>
			<div className="about">
				<Quees />
				<OurTeam />
			</div>
		<Footer/>
		</>
	);
};
