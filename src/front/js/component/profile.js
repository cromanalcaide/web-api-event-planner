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
        <>
            <LeftSideBar />
            <div className="container">
                <div className="user-avatar">
                    <img src={user?.avatar_url} alt="hugenerd" width="50" height="50" className="user-img rounded-circle" />
                    <input type="text" defaultValue={user?.name} disabled={!fieldStatus.name}
                        onChange={(e) => setNewValue(e.target.value)} ></input>
                    <i className={`fa-icon fa-solid ${fieldStatus["name"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["name"] ? "" : "disabled"}`}
                        onClick={() => {
                            if (fieldStatus["name"]) {
                                handleSave();
                            } else {
                                handleEditField("name");
                            }
                        }}>
                    </i>
                </div>
                <div className="edit-info">
                    <div className="line-data">
                        <label>Correo Electrónico : </label>
                        <input type="text" defaultValue={user?.email} disabled={!fieldStatus.email}
                            onChange={(e) => setNewValue(e.target.value)}></input>
                        <i className={`fa-icon fa-solid ${fieldStatus["email"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["email"] ? "" : "disabled"}`}
                            onClick={() => {
                                if (fieldStatus["email"]) {
                                    handleSave();
                                } else {
                                    handleEditField("email");
                                }
                            }}>
                        </i>
                    </div>
                    <div className="line-data">
                        <label>Contraseña Nueva: </label>
                        <input type="text" placeholder="Escribe aquí la nueva contraseña" value={password}
                             onChange={(e) => setNewPassword(e.target.value)}></input>
                    </div>
                    <div className="line-data">
                        <label>País : </label>
                        <input type="text" defaultValue={user?.country} disabled={!fieldStatus.country}
                            onChange={(e) => setNewValue(e.target.value)}></input>
                        <i className={`fa-icon fa-solid ${fieldStatus["country"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["country"] ? "" : "disabled"}`}
                            onClick={() => {
                                if (fieldStatus["country"]) {
                                    handleSave();
                                } else {
                                    handleEditField("country");
                                }
                            }}>
                        </i>
                    </div>
                    <div className="line-data">
                        <label>Ciudad : </label>
                        <input type="text" defaultValue={user?.city} disabled={!fieldStatus.city}
                            onChange={(e) => setNewValue(e.target.value)}></input>
                        <i className={`fa-icon fa-solid ${fieldStatus["city"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["city"] ? "" : "disabled"}`}
                            onClick={() => {
                                if (fieldStatus["city"]) {
                                    handleSave();
                                } else {
                                    handleEditField("city");
                                }
                            }}>
                        </i>
                    </div>
                    <div className="line-data">
                        <label>Teléfono : </label>
                        <input type="text" defaultValue={user?.phone} disabled={!fieldStatus.phone}
                            onChange={(e) => setNewValue(e.target.value)}></input>
                        <i className={`fa-icon fa-solid ${fieldStatus["phone"] ? "fa-check" : "fa-pen-to-square"} ${fieldStatus["phone"] ? "" : "disabled"}`}
                            onClick={() => {
                                if (fieldStatus["phone"]) {
                                    handleSave();
                                } else {
                                    handleEditField("phone");
                                }
                            }}>
                        </i>
                    </div>
                </div>
                <div className="del-account">
                    <button>Eliminar Cuenta</button>
                </div>
            </div>
        </>
    )
}