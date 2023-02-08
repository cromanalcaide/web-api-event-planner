import React from "react";
import { Link } from "react-router-dom";
import background from "../../img/footerbg.png"

import "../../styles/footer.css"

export const Footer = () => {

	return (
		<footer className="text-center text-lg-start" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
			<div className="container p-4 pb-0">
				<section className="">
					<div className="row">
						<div className="col-md-2 col-lg-2 col-xl-2 mt-3 left-div">
							<h5 className="logo mb-4 font-weight-bold">ComMeet</h5>
							<p>Organizar eventos nunca <br/> fue tan fácil...</p>
							<div className="trademark">
								©4Geeks Academy 2023
							</div>
						</div>
						<hr className="w-100 clearfix d-md-none" />
						<div className="col-md-2 col-lg-2 col-xl-2 mt-3">
							<h6 className="text-uppercase mb-4 font-weight-bold mt-2">INFORMACIÓN</h6>
							<p> info@commeet.com</p>
							<p> Madrid, España	</p>
							<p>	+34 911 234 567	</p>
						</div>
						<hr className="w-100 clearfix d-md-none" />
						<div className="col-md-3 col-lg-2 col-xl-2 right-div" >
							<Link to="/register" className="text-decoration-none">	
								<h6 className="link mb-4 font-weight-bold">REGISTRO</h6>
							</Link>
							<Link to="/contact" className="text-decoration-none">
								<h6 className="link mb-4 font-weight-bold">CONTACTO</h6>
							</Link>
						</div>
						<hr className="w-100 clearfix d-md-none" />
						<div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end sm-div">
							<div className="row">
								<div className="box">
									<button className="btn btn-floating m-1 text-black"role="button">
										<i className="fa-brands fa-facebook-f"></i>
									</button>
								</div>
								<div className="box">
									<button	className="btn btn-floating m-1 text-black"role="button">
										<i className="fa-brands fa-twitter"></i>
									</button>
								</div>
								<div className="box">
									<button className="btn btn-floating m-1 text-black" role="button">
										<i className="fa-brands fa-google"></i>
									</button>
								</div>	
								<div className="box">
									<button	className="btn btn-floating m-1 text-black"role="button">
										<i className="fa-brands fa-instagram"></i>
									</button>
								</div>	
							</div>
						</div>
					</div>
				</section>
			</div>
		</footer>
	);
};