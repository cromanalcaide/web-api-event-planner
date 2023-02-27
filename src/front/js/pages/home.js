import React, {Component, useState} from "react";
import { Jumbotron } from "../component/jumbotron";
import { Description } from "../component/description";
import { CookiePopUp } from "../component/cookiepopup";
import { Navbar } from "../component/navbar"
import { Footer } from "../component/footer"


export const Home = () => {


	return (
		<>
			<Navbar/>
			<div>
				<Jumbotron />
				<Description />
				<CookiePopUp />
			</div>
			<Footer/>
		</>
	);
};
