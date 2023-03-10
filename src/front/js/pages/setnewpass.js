import React, {useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../styles/setnewpass.css"
import { Navbar } from "../component/navbar";

export const SetNewPass = () => {
    const { store, actions } = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const params = useParams()

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            typePasswordX: '',

        },
        validationSchema: Yup.object({
            typePasswordX: Yup.string()
                .min(6, 'Debe tener al menos 6 caracteres')
                .max(15, 'Debe tener máximo 15 caracteres')
                .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/, 'La contraseña deber tener 6 a 15 caracteres, 1 mayúscula, 1 minúscula y 1 número. No puede tener caracteres especiales').required('Este campo es requerido'),
        }),
        onSubmit: async (values) => {
            try {
                const setPassSuccesful = await actions.setNewPassword(params.theid, values.typePasswordX);
                if (setPassSuccesful) {
                   
                    navigate("/login");

                } else {
                    setError("Ha ocurrido un error con los datos ingresados")
                }
            } catch (error) {
                console.log(error);
                setError("Ha ocurrido un error cambiando la contraseña. Por favor revisa la información ingresada e inténtalo nuevamente")
            }
        },
    });

   


    return (
        <>
            <div className="card-set-pass ">
                <Navbar />
                <div className="card-body-set-pass p-5 text-center">
                    <p className='logo-form'>ComMeet</p>
                    <label className='label-set-new-pass'>
                        Ingresa la nueva contraseña:
                        <br />
                    </label>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="set-new-div">
                            <input
                                type={showPassword ? "text" : "password"}
                                disabled={formik.values.typePasswordX === "formik.values.typePasswordX" ? !showPassword : false}
                                id="typePasswordX"
                                name="typePasswordX"
                                className="set-new-pass-input form-control mb-4"
                                placeholder="Nueva contraseña"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.typePasswordX}
                            />
                            <i className={`showPass fa-icon fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                        {formik.touched.typePasswordX && formik.errors.typePasswordX ? (
                            <div className="text-danger">{formik.errors.typePasswordX}</div>
                        ) : null}

                        <br />
                        <button type='submit' className='forgot-pass-btn' >Enviar</button>

                    </form>
                </div>
            </div>
        </>
    )
}