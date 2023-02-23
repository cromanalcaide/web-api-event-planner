import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/sidebarleft.css"
import { AddContactPopover } from "./contactPopover";


export const LeftSideBar = () => {
    const { store, actions } = useContext(Context);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [editingContactId, setEditingContactId] = useState(null);
    const [updatedName, setUpdatedName] = useState();
    const [updatedEmail, setUpdatedEmail] = useState();

    function handleEditContact(contactId) {
        setEditingContactId(contactId);
    }

    function handleSaveContact(contactId, updatedName, updatedEmail) {
        actions.editContact(contactId, updatedName, updatedEmail)
        setEditingContactId(null);
    }

    const togglePopover = () => {
        setPopoverOpen(!popoverOpen);
    };

    const navigate = useNavigate();

    const userContacts = store.userContacts
    const user = store.user.result
    console.log("this is user", user)

    useEffect(() => {
        actions.getUserContacts();
        actions.getUserInfo()
    }, [])

    const handleClick = () => {
        actions.logout()
        navigate('/')
    }

    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <h3 className="sidebar-logo">ComMeet</h3>
                        <div className="d-flex align-items-center text-decoration-none">
                            <img src={user?.avatar_url} alt="hugenerd" width="30" height="30" className="user-img rounded-circle" />
                            <span className="user-name d-none d-sm-inline">{user?.name}</span>
                        </div>

                        <div className="pt-3">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link align-middle">
                                        <i className="fa-icon fa-solid fa-user"></i> <span className="ms-1 d-none d-sm-inline">Mi perfil</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard" className="nav-link align-middle">
                                        <i className="fa-icon fa-solid fa-calendar-week"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <button className="nav-link align-middle" onClick={handleClick}>
                                        <i className="fa-icon fa-solid fa-arrow-right-from-bracket"></i><span className="ms-1 d-none d-sm-inline">Cerrar Sesión</span></button>
                                </li>
                            </ul>
                            <hr />
                        </div>
                        <div className="contacts-div pt-5 d-flex align-items-center">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                                <li>
                                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                        <i className="fa-icon fa-solid fa-address-book"></i><span className="contact-title d-none d-sm-inline px-2 ">Contactos</span> </a>
                                    <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                        {userContacts.map((contact) => {
                                            if (editingContactId === contact.id) {
                                                return (
                                                    <li key={contact.id}>
                                                        <input type="text" defaultValue={contact.name} onChange={(event) => setUpdatedName(event.target.value)} />
                                                        <input type="text" defaultValue={contact.email} onChange={(event) => setUpdatedEmail(event.target.value)} />
                                                        <button onClick={() => handleSaveContact(contact.id, updatedName, updatedEmail)}>Guardar</button>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={contact.id}>
                                                        <img src="https://res.cloudinary.com/dkcoownwg/image/upload/v1676742580/avatar_sxohxx.png" alt="hugenerd" width="25" height="25" className="rounded-circle" />
                                                        <span className="contact-name d-none d-sm-inline px-2">{contact.name} </span>
                                                        {/* <span>{contact.email}</span> */}
                                                        <i className="fa-icon fa-solid fa-pen-to-square" onClick={() => handleEditContact(contact.id)}></i>
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </li>
                                <button className="btn add-contact-btn pt-2" id="popoverButton" onClick={togglePopover}><i className="fa-solid fa-plus px-2"></i>Añadir Contacto</button>
                                <AddContactPopover isOpen={popoverOpen} target="popoverButton" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 