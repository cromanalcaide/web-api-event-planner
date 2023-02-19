import React, {Component, useState} from "react";
import { Jumbotron } from "../component/jumbotron";
import { Description } from "../component/description";
import { CookiePopUp } from "../component/cookiepopup";



export const Home = () => {


	return (
		<>
			<div>
				<Jumbotron />
				<Description />
				<CookiePopUp />
			</div>
			 
		</>
	);
};
