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
    const [avatars, setAvatars] = useState({});


    const handleEditContact = (contactId) => {
        setEditingContactId(contactId);
    }

    const handleSaveContact = (contactId, updatedName, updatedEmail) => {
        actions.editContact(contactId, updatedName, updatedEmail)
        setEditingContactId(null);
    }

    const togglePopover = () => {
        setPopoverOpen(!popoverOpen);
    };

    const navigate = useNavigate();

    const userContacts = store.userContacts
    const user = store.user.result

    useEffect(() => {
        actions.getUserContacts();
        actions.getUserInfo()
    }, [])

    const handleClick = () => {
        actions.logout()
        navigate('/')
    }

    const handleDelete = (contactId) => {
        actions.deleteContact(contactId)
        console.log(contactId)
    }

    // const getAvatars = async () => {
    //     await actions.getAllUsers();
    //     const users = store.allUsers;
    //     console.log("trae los usuarios", users)
    //     const avatars = {};
    //     users?.forEach(user => {
    //         if (user.avatar_url) {
    //             avatars[user.email] = user.avatar_url;
    //         }
    //     });
    //     return avatars;

    // }; 

    // const contactIsUserWAvatar = async (userContacts, avatars) => {
    //     console.log("uc",userContacts, "av", avatars)
    //     const userAvatars = [];
    //     userContacts.forEach((contact) => {
    //       if (avatars[contact.email]) {
    //         userAvatars.push({
    //           email: contact.email,
    //           avatar_url: avatars[contact.email],
    //         });
    //       }
    //     });
    //     return userAvatars;
    // }

    // const fetchUserAvatars = async () => {
    //     const avatars = await getAvatars();
    //     const userContacts = await store.userContacts // función que devuelve los contactos del usuario logueado
    //     console.log("userCont",userContacts)
    //     const userAvatars = await contactIsUserWAvatar(userContacts, avatars);
    //     console.log("contacts:", userContacts,"avatars", userAvatars)
    //     setAvatars(userAvatars);
    // };


    // useEffect(() => {
    //     fetchUserAvatars();
    //   }, []);


    return (
        <div className="left-side-container">
            <div className="row">
                <div className="col sidebar-column">
                    <div className="sidebar-column-2 d-flex flex-column align-items-start align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/">
                            <button className="btn"><h4 className="sidebar-logo-com text-black mb-5">ComMeet</h4></button>
                        </Link>
                        <div className="d-flex align-items-center text-decoration-none">
                            <img src={user?.avatar_url} alt="hugenerd" width="30" height="30" className="user-img rounded-circle" />
                            <span className="user-name d-none d-sm-inline">{user?.name}</span>
                        </div>

                        <div className="pt-3">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link-side btn align-middle">
                                        <i className="fa-icon fa-solid fa-user"></i> <span className="ms-1 d-none d-sm-inline">Mi perfil</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/private" className="nav-link-side btn align-middle">
                                        <i className="fa-icon fa-solid fa-calendar-week me-1"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <button className="nav-link-side btn align-middle" onClick={handleClick}>
                                        <i className="fa-icon fa-solid fa-arrow-right-from-bracket"></i><span className="ms-1 d-none d-sm-inline">Cerrar Sesión</span></button>
                                </li>
                            </ul>
                            <hr />
                        </div>
                        <div className="contacts-div pt-5 d-flex align-items-start">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start align-items-sm-start">
                                <li>
                                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link-side btn">
                                        <i className="fa-icon fa-solid fa-address-book"></i><span className="contact-title d-none d-sm-inline px-2 ">Contactos</span> </a>
                                    <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                        {userContacts.map((contact, index) => {
                                            if (editingContactId === contact?.id) {
                                                return (
                                                    <li className="edit-contact" key={index}>
                                                        <input className="edit-contact-info my-2" type="text" defaultValue={contact.name} onChange={(event) => setUpdatedName(event.target.value)} />
                                                        <input className="edit-contact-info" type="text" defaultValue={contact?.email} onChange={(event) => setUpdatedEmail(event.target.value)} />
                                                        <button className="save-edit-btn mt-2" onClick={() => handleSaveContact(contact?.id, updatedName, updatedEmail)}>Guardar</button>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={index} className="py-1">
                                                        <img src={contact?.avatar_url ? contact?.avatar_url : "https://res.cloudinary.com/dkcoownwg/image/upload/v1677503257/avatar_knpmj6.png"} width="25" height="25" className="rounded-circle" />
                                                        <span className="contact-name d-none d-sm-inline px-2 ">{contact?.name} </span>
                                                        <i className="fa-icon fa-solid fa-pen-to-square" onClick={() => handleEditContact(contact?.id)}></i>
                                                        <i className="trash-icon fa-regular fa-trash-can" onClick={() => handleDelete(contact?.id)}></i>
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </li>
                                <button className="btn add-contact-btn pt-2" id="popoverButton" onClick={togglePopover}><i className="fa-solid fa-plus px-2"></i><span className="ms-1 d-none d-sm-inline">Añadir Contacto</span></button>
                                <AddContactPopover isOpen={popoverOpen} target="popoverButton" onClose={togglePopover} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 