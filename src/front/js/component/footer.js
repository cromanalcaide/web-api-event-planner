import React from "react";
import { Link } from "react-router-dom";

import "../../styles/footer.css"

export const Footer = () => {

	return (
		<footer className="text-center text-lg-start footer">
			<div className="container p-4 pb-0">
				<section className="">
					<div className="row">
						<div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
							<h5 className="logo mb-4 font-weight-bold">ComMeet</h5>
							<p>Organizar eventos nunca <br/> fue tan fácil...</p>
						</div>
						<hr className="w-100 clearfix d-md-none" />
						<div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
							<h6 className="text-uppercase mb-4 font-weight-bold">INFORMACIÓN</h6>
							<p> info@commeet.com</p>
							<p> Madrid, España	</p>
							<p>	+34 911 234 567	</p>
						</div>
						<hr className="w-100 clearfix d-md-none" />
						<div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-5">
							<Link to="/register" className="text-decoration-none">	
								<h6 className="link mb-4 font-weight-bold">REGISTRO</h6>
							</Link>
							<Link to="/contact" className="text-decoration-none">
								<h6 className="link mb-4 font-weight-bold">CONTACTO</h6>
							</Link>
						</div>
						<hr className="w-100 clearfix d-md-none" />
					</div>
				</section>
				<hr className="my-3" />
				<section className="p-3 pt-0">
					<div className="row d-flex align-items-center">
						<div className="col-md-7 col-lg-8 text-center text-md-start">
							<div className="p-3">
								©4Geeks Academy 2023
							</div>
						</div>
						<div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
							<button className="btn btn-floating m-1 text-black"role="button">
								<i class="fa-brands fa-facebook-f"></i>
							</button>
							<button	className="btn btn-floating m-1 text-black"role="button">
								<i className="fa-brands fa-twitter"></i>
							</button>
							<button className="btn btn-floating m-1 text-black" role="button">
								<i className="fa-brands fa-google"></i>
							</button>
							<button	className="btn btn-floating m-1 text-black"role="button">
								<i className="fa-brands fa-instagram"></i>
							</button>
						</div>
					</div>
				</section>
			</div>
		</footer>
	);
};