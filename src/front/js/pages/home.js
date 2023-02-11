import React, {useState} from "react";
import { Jumbotron } from "../component/jumbotron";
import { Description } from "../component/description";
import { CookiePolicy } from "../component/cookiepolicy";



export const Home = () => {


	return (
		<>
			<div>
				<Jumbotron />
				<Description />
				<CookiePolicy />
			</div>
			 
		</>
	);
};
