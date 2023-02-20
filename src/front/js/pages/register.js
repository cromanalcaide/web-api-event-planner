import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCountries, getCities } from "countries-cities";
import { Navbar } from "../component/navbar"
import { Footer } from "../component/footer"

const countries = getCountries();


export const Register = () => {
  const { store, actions } = useContext(Context);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);


  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setCities(getCities(countryCode));
  };


  const formik = useFormik({
    initialValues: {
      typeName: '',
      typeEmailX: '',
      typePhone: '',
      typePasswordX: '',

    },
    validationSchema: Yup.object({
      typeName: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(20, 'El nombre no puede tener más de 20 caracteres')
        .required('Este campo es requerido'),
      typeEmailX: Yup.string().matches(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/, 'Correo electrónico inválido').required('Este campo es requerido'),
      typePhone: Yup.number("El teléfono debe ser numérico").required('Este campo es requerido'),
      typePasswordX: Yup.string()
        .min(6, 'Debe tener al menos 6 caracteres')
        .max(15, 'Debe tener máximo 15 caracteres')
        .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/, 'La contraseña deber tener 6 a 15 caracteres, 1 mayúscula, 1 minúscula y 1 número. No puede tener caracteres especiales').required('Este campo es requerido'),
    }),
    onSubmit: values => {
      actions.register(values.typeName, values.typeEmailX, values.typePasswordX, selectedCity, selectedCountry, values.typePhone);
      navigate("/login");
    },
  });

  return (
    <>
      <Navbar />
      <section className="vh-100 bg">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-10 col-lg-8 col-xl-8">
              <div className="card">
                <div className="card-body px-5 pt-5  text-center">
                  <div className="mb-md-5 mt-md-2">
                    <h2 className="title mb-2 pb-4">Registro</h2>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="row row-cols-2 ">
                        <div className="form-outline form-white">
                          <input
                            type="text"
                            id="typeName"
                            name="typeName"
                            className="form-control form-control-lg mb-4 mr-5"
                            placeholder="Nombre"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.typeName}
                          />
                          {formik.touched.typeName && formik.errors.typeName ? (
                            <div className="text-danger">{formik.errors.typeName}</div>
                          ) : null}
                        </div>
                        <div className="form-outline form-white ">
                          <input
                            type="email"
                            id="typeEmailX"
                            name="typeEmailX"
                            className="form-control form-control-lg mb-4 text-lowercase"
                            placeholder="Correo electrónico"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.typeEmailX}
                          />
                          {formik.touched.typeEmailX && formik.errors.typeEmailX ? (
                            <div className="text-danger">{formik.errors.typeEmailX}</div>
                          ) : null}
                        </div>
                        <div className="form-outline form-white ">
                          <select
                            id="typeCountry"
                            name="typeCountry"
                            className="form-select form-control form-control-lg mb-4"
                            value={selectedCountry}
                            onChange={handleCountryChange}>
                            <option value="">Seleccione un país</option>
                            {countries.map((country, id) => (
                              <option key={id} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-outline form-white ">
                          <select
                            id="typeCity"
                            name="typeCity"
                            className="form-select form-control form-control-lg mb-4"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                          >
                            <option value="">Seleccione una ciudad</option>
                            {cities.map((city, id) => (
                              <option key={id} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-outline form-white ">
                          <input
                            type="phone"
                            name="typePhone"
                            id="typePhone"
                            className="form-control form-control-lg mb-4 mr-5"
                            placeholder="Teléfono"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.typePhone}
                          />
                          {formik.touched.typePhone && formik.errors.typePhone ? (
                            <div className="text-danger">{formik.errors.typePhone}</div>
                          ) : null}
                        </div>
                        <div className="form-outline form-white mb-5">
                          <input
                            type="password"
                            id="typePasswordX"
                            name="typePasswordX"
                            className="form-control form-control-lg mb-4"
                            placeholder="Contraseña"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.typePasswordX}
                          />
                          {formik.touched.typePasswordX && formik.errors.typePasswordX ? (
                            <div className="text-danger">{formik.errors.typePasswordX}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="check-bt d-flex form-check justify-content-center mx-5">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" required />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                          Para registrarte debes aceptar nuestros
                          <Link className="terms-link" to="/termsandconditions">
                            {" "}Términos y condiciones
                          </Link>
                        </label>
                      </div>
                      <button
                        className="lg-btn btn-primary btn-lg px-5 "
                        type="submit">
                        Registrarme
                      </button>
                    </form>
                  </div>
                  <div className="pb-2">
                    <p className="mb-0">
                      ¿Ya tienes una cuenta?
                    </p>
                    <Link to="/login" className="reg-link">
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
      <Footer />
    </>

  );
};
