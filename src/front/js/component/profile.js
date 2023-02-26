import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { LeftSideBar } from "./sidebarleft";
import "../../styles/profile.css"

export const Profile = () => {
    const { store, actions } = useContext(Context);
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
    const [password, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
    return (
        <div className="view">
            <div className="col-3">
                    <LeftSideBar/>
            </div>
            <div className="col-6">
                <div className="profile-container">
                    <div className="row line-data align-items-center mx-3 mb-5">
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
                                <input className="user-edit-form" type="text" defaultValue={user?.email} disabled={!fieldStatus.email}
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
                                    <input
                                        className="user-edit-form"
                                        type={showPassword ? "text" : "password"}
                                        disabled={fieldStatus.password === "password" ? !showPassword : false}
                                        value={password}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <i
                                        className={`fa-icon fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    ></i>
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
                        <button className="del-account btn mt-5 justify-content-end px-3">Eliminar Cuenta</button>
                    </div>
                </div>
            </div>
        </div>
    )
}