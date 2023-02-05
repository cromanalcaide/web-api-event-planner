import React, { useContext } from "react";
// import { Context } from "../store/appContext";
import { Jumbotron } from "../component/jumbotron";
import { Description } from "../component/description";



export const Home = () => {
	// const { store, actions } = useContext(Context);

	return (
		<div>
			<Jumbotron />
			<Description />
		</div>
	);
};
