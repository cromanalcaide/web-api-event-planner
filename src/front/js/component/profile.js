import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { LeftSideBar } from "./sidebarleft";
import { useNavigate } from "react-router-dom";
import { ViewTitle } from "./viewTitle";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../styles/profile.css"

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [fieldStatus, setFieldStatus] = useState({
        name: false,
        email: false,
        country: false,
        city: false,
        phone: false
    });

    const [fieldValues, setFieldValues] = useState({
        name: user?.name || "",
        email: user?.email || "",
        country: user?.country || "",
        city: user?.city || "",
        phone: user?.phone || ""
    });

    const [newValue, setNewValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const handleDeleteAccount = () => {
        actions.deleteUser()
        navigate("/");
    }

    const user = store.user.result

    const handleEditField = (fieldName) => {
        setFieldValues({
            ...fieldValues,
            [fieldName]: user[fieldName],
        });
        setFieldStatus({
            ...fieldStatus,
            [fieldName]: true
        });
    }

    const handleSave = async (fieldName) => {
        await actions.editUserInfo(fieldName, newValue)
        setFieldStatus({ ...fieldStatus, [fieldName]: false });
    }

    const formik = useFormik({
        initialValues: {
            typePasswordX: '',

        },
        validationSchema: Yup.object({
            typePasswordX: Yup.string()
                .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/, 'La contraseña deber tener 6 a 15 caracteres, 1 mayúscula, 1 minúscula y 1 número. No puede tener caracteres especiales'),
        }),
        onSubmit: (values) => {
            const fieldName = "password" 
            actions.editUserInfo(fieldName, values.typePasswordX);
            alert("Contraseña modificada correctamente")
            console.log(fieldName, values.typePasswordX)
        },
    });

    return (
        <div className="view">
            <div className="col-3 sidebar-column">
                <LeftSideBar />
            </div>
            <div className="row">
                <ViewTitle title="Mi perfil" />

                <div className="col-6">
                    <div className="profile-container">
                        <div className="row line-data align-items-center mx-3 my-3 ">
                            <div className="col-1">
                                <img src={user?.avatar_url} alt="hugenerd" width="80" height="80" className="user-avatar rounded-circle" />
                            </div>
                            <div className="col-7">
                                <input className="form-control-sm fs-5 ms-5 name-form" type="text" defaultValue={user?.name} disabled={!fieldStatus.name}
                                    onChange={(e) => setNewValue(e.target.value)} ></input>
                                <i className={`fa-icon fa-solid ${fieldStatus["name"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["name"] ? "" : "disabled"}`}
                                    onClick={() => {
                                        if (fieldStatus["name"]) {
                                            handleSave("name");
                                        } else {
                                            handleEditField("name");
                                        }
                                    }}>
                                </i>
                            </div>
                        </div>
                        <div className="edit-info">
                            <div className="row line-data my-3">
                                <div className="col-3 ms-5">
                                    <label>Correo Electrónico :</label>
                                </div>
                                <div className="col-5">
                                    <input className="user-edit-form" type="email" defaultValue={user?.email} disabled={!fieldStatus.email}
                                        onChange={(e) => setNewValue(e.target.value)}></input>
                                    <i className={`fa-icon fa-solid ${fieldStatus["email"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["email"] ? "" : "disabled"}`}
                                        onClick={() => {
                                            if (fieldStatus["email"]) {
                                                handleSave("email");
                                            } else {
                                                handleEditField("email");
                                            }
                                        }}>
                                    </i>
                                </div>
                            </div>
                            <div className="line-data my-3">
                                <div className="row line-data">
                                    <div className="col-3 ms-5">
                                        <label>Nueva Contraseña : </label>
                                    </div>
                                    <div className="col-5">
                                        <form onSubmit={formik.handleSubmit}>
                                            <input
                                                id="typePasswordX"
                                                name="typePasswordX"
                                                className="user-edit-form"
                                                type={showPassword ? "text" : "password"}
                                                disabled={fieldStatus.password === "password" ? !showPassword : false}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.typePasswordX}
                                            />
                                            <i className={`fa-icon fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                                                onClick={() => setShowPassword(!showPassword)}
                                            ></i>
                                            <button className="btn px-0" type="submit"><i className="fa-solid fa-check"></i></button>
                                            {formik.touched.typePasswordX && formik.errors.typePasswordX ? (
                                                <div className="text-danger">{formik.errors.typePasswordX}</div>
                                            ) : null}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="line-data my-3">
                                <div className="row line-data">
                                    <div className="col-3 ms-5">
                                        <label>País : </label>
                                    </div>
                                    <div className="col-5">
                                        <input className="user-edit-form" type="text" defaultValue={user?.country} disabled={!fieldStatus.country}
                                            onChange={(e) => setNewValue(e.target.value)}></input>
                                        <i className={`fa-icon fa-solid ${fieldStatus["country"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["country"] ? "" : "disabled"}`}
                                            onClick={() => {
                                                if (fieldStatus["country"]) {
                                                    handleSave("country");
                                                } else {
                                                    handleEditField("country");
                                                }
                                            }}>
                                        </i>
                                    </div>
                                </div>
                            </div>
                            <div className="line-data my-3">
                                <div className="row line-data">
                                    <div className="col-3 ms-5">
                                        <label>Ciudad : </label>
                                    </div>
                                    <div className="col-5">
                                        <input className="user-edit-form" type="text" defaultValue={user?.city} disabled={!fieldStatus.city}
                                            onChange={(e) => setNewValue(e.target.value)}></input>
                                        <i className={`fa-icon fa-solid ${fieldStatus["city"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["city"] ? "" : "disabled"}`}
                                            onClick={() => {
                                                if (fieldStatus["city"]) {
                                                    handleSave("city");
                                                } else {
                                                    handleEditField("city");
                                                }
                                            }}>
                                        </i>
                                    </div>
                                </div>
                            </div>
                            <div className="line-data my-3">
                                <div className="row line-data">
                                    <div className="col-3 ms-5">
                                        <label>Teléfono : </label>
                                    </div>
                                    <div className="col-5">
                                        <input className="user-edit-form" type="text" defaultValue={user?.phone} disabled={!fieldStatus.phone}
                                            onChange={(e) => setNewValue(e.target.value)}></input>
                                        <i className={`fa-icon fa-solid ${fieldStatus["phone"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["phone"] ? "" : "disabled"}`}
                                            onClick={() => {
                                                if (fieldStatus["phone"]) {
                                                    handleSave("phone");
                                                } else {
                                                    handleEditField("phone");
                                                }
                                            }}>
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="del-account btn mt-5 justify-content-end px-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setShowModal(true) }}>Eliminar Cuenta</button>
                            {showModal == true ? (
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">¿Estás seguro?</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                Si eliminas tu cuenta los eventos que creaste y los invitados a los mismos seguirán siendo visibles para los otros participantes.
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="button" className="btn btn-primary" onClick={handleDeleteAccount}>Eliminar Cuenta</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}