import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/sidebarleft.css"
import { AddContactPopover } from "./contactPopover";
import { Button } from "reactstrap";


export const LeftSideBar = () => {
    const { store, actions } = useContext(Context);

    const [popoverOpen, setPopoverOpen] = useState(false);

    const togglePopover = () => {
        setPopoverOpen(!popoverOpen);
    };

    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userContacts = JSON.parse(localStorage.getItem('userContacts'));
    
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
                            <img src={userInfo.avatar_url} alt="hugenerd" width="30" height="30" className="user-img rounded-circle" />
                            <span className="user-name d-none d-sm-inline">{userInfo.name}</span>
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
                                        {userContacts.map((e) => {
                                            return (
                                            <li className="w-100  pt-1 pb-1" key={e.id}>
                                                <img src="https://res.cloudinary.com/dkcoownwg/image/upload/v1676742580/avatar_sxohxx.png" alt="hugenerd" width="25" height="25" className="rounded-circle" />
                                                <span className="contact-name d-none d-sm-inline px-2">{e.name} </span><i className="fa-icon fa-solid fa-pen-to-square"></i>
                                            </li> 
                                        );
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