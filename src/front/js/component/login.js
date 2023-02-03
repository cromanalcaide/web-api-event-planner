import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(email, password);
    navigate("/private");
  };

  return (
    <section className="vh-100 bg">
      <div className="container h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col-10 col-md-6 col-lg-4 col-xl-4 ">
            <div className="card ">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 ">
                  <h2 className="title mb-2 pb-5">Login</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-2 ml-2 d-flex justify-content-center">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg mb-4"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-outline form-white mb-3 d-flex justify-content-center">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg mb-5"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    {/* <p className="small mb-5 pb-lg-2">
                      <a className="text-black-50" href="#!">
                        Olvidaste tu contraseña?
                      </a>
                    </p> */}
                    <button
                      className="lg-btn btn-primary btn-lg px-5 "
                      type="submit"
                    >
                      Ingresar
                    </button>
                  </form>
              </div>

              <div className="pb-2">
                <p className="mb-0">
                  Aún no tienes una cuenta?
                </p>

                <Link to="/register">
                  <span className="reg-link mb-5">
                    Registrate
                  </span>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section >
  );
};