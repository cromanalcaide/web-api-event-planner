import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";
import "../../styles/register.css";
import { Link } from "react-router-dom";

export const Register = () => {
  //   const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  

  //   const navigate = useNavigate();


  const handleClick = () => {
    //     actions.login(email, password);
    //     navigate("/private");
  };

  return (
    <section className="vh-100 bg">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-10 col-lg-8 col-xl-8">
            <div className="card">
              <div className="card-body px-5 pt-5  text-center">
                <div className="mb-md-5 mt-md-2">
                  <h2 className="title mb-2 pb-4">Registro</h2>
                  <div class="row row-cols-2 ">  
                    <div className="form-outline form-white">
                      <input
                        type="text"
                        id="typeName"
                        className="form-control form-control-lg mb-4 mr-5"
                        placeholder="Nombre"
                        value={name}
                        onChange= {(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-outline form-white ">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg mb-4"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange= {(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-outline form-white ">
                      <input
                        type="text"
                        id="typeCountry"
                        className="form-control form-control-lg mb-4 mr-5"
                        placeholder="País"
                        value={country}
                        onChange= {(e) => setCountry(e.target.value)}
                      />
                    </div>
                    <div className="form-outline form-white ">
                      <input
                        type="city"
                        id="typeCity"
                        className="form-control form-control-lg mb-4"
                        placeholder="Ciudad"
                        value={city}
                        onChange= {(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="form-outline form-white ">
                      <input
                        type="phone"
                        id="typePhone"
                        className="form-control form-control-lg mb-4 mr-5"
                        placeholder="Teléfono"
                        value={phone}
                        onChange= {(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-outline form-white mb-5">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg mb-4"
                        placeholder="Contraseña"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                      />
                    </div>
                    
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
                    Registrarme
                  </button>
                </div>
                <div className="pb-2">
                  <p className="mb-0">
                    ¿Ya tienes una cuenta?
                  </p>

                  <Link to="/login">
                    <span className="reg-link ">
                      Ingresa
                    </span>
                  </Link>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
