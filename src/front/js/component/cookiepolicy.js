import React, { useState } from "react";
import "../../styles/cookiepolicy.css"
import { Link } from "react-router-dom";

export const CookiePolicy = () => {
    const [showPopUp, setShowPopUp] = useState(true);

    const handleClose = () => {
		setShowPopUp(false);
	};

    if (!showPopUp) {
		return null;
	}

    return (
        <div>
            {showPopUp && (
                <div className="cookies-popup row-2 d-flex v-100 justify-content-center align-items-center">
                    <p className="cookie-text">
                        Utilizamos cookies para mejorar la experiencia del usuario. Al continuar navegando,
                        aceptas nuestra 
                        <Link className="text-decoration-none" to="/cookies-policy">
                            {" "}política de cookies
                        </Link>
                    </p>
                    <button
                        className="btn cookie-btn"
                        onClick={handleClose}>
                        Acepto
                    </button>
                </div>
            )}
        </div>
    );
};

