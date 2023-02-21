import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Popover, PopoverHeader, PopoverBody, Input } from "reactstrap";
import "../../styles/sidebarleft.css"

export const AddContactPopover = (props) => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [id, setId] = useState()

    const userInfo= JSON.parse(localStorage.getItem('userInfo'))
    console.log(userInfo.id)
 
    const user_id = parseInt(userInfo.id);
    console.log(user_id)

    const handleClick = () =>{
        actions.addNewContact(name, email, user_id)
        setName("")
        setEmail("")
    }

    return (
        <Popover className="add-contact" placement="right" isOpen={props.isOpen} target={props.target}>
            <PopoverHeader className="add-contact-header">Agrega el Nombre y Correo electrónico del nuevo contacto</PopoverHeader>
            <PopoverBody>
                <Input name="name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <Input name="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="btn justify-content-center" onClick={handleClick}><i className="fa-solid fa-plus px-2"></i>Agregar</button>
            </PopoverBody>
        </Popover>
    );
}
    
