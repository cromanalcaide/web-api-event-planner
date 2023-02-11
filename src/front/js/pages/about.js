import React from "react";
import { Quees } from "../component/quees";
import { OurTeam } from "../component/ourteam";

import "../../styles/quees.css"


export const About = () => {
	return (
		<div className="about">
			<Quees />
			<OurTeam />
		</div>
	);
};
