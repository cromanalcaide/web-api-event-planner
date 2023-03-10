import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar"
import { Footer } from "../component/footer"
import { ForgotPass} from "../component/forgotpass"

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginSuccesful = await actions.login(email, password);
      if (loginSuccesful) {
        navigate("/private");
      } else {
        setError("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      console.log(error);
      setError("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  
  return (
    <>
      <Navbar />
      <section className="vh-100 bg">
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-10 col-md-6 col-lg-4 col-xl-4 ">
              {showForgotPassword ? (
                <ForgotPass/>
              ) : (
                <div className="card ">
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 ">
                      <h2 className="title-login mb-2 pb-5">Ingreso</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline form-white mb-2 ml-2 d-flex justify-content-center">
                          <input
                            type="email"
                            id="typeEmailX"
                            className="lg-input form-control-lg mb-4 text-lowercase"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-outline form-white mb-3 d-flex justify-content-center">
                          <input
                            type={showPassword ? "text" : "password"}
                            disabled={password === "password" ? !showPassword : false}

                            id="typePasswordX"
                            className="lg-input-pass form-control-lg mb-5"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i className={`showPass fa-icon fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                            onClick={() => setShowPassword(!showPassword)}
                          ></i>
                        </div>
                        <button
                          className="lg-btn btn-lg px-5 "
                          type="submit"
                        >
                          Ingresar
                        </button>
                        {error && <div className="text-danger mt-3">{error}</div>}
                      </form>
                    </div>
                    <div className="pb-2">
                      <div className="forgot-pass-link">
                        <button className=" btn mb-0" onClick={handleForgotPasswordClick}>
                          Olvidaste tu contraseña?
                        </button>
                      </div>
                    </div>
                    <div className="pb-2">
                      <p className="mb-0">
                        Aún no tienes una cuenta?
                      </p>
                      <Link to="/register" className="reg-link">
                        <span className=" reg-link mb-5">
                          Registrate
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section >
      <Footer />
    </>
  );
};