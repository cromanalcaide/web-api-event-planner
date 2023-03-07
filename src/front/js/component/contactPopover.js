import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Popover, PopoverHeader, PopoverBody, Input } from "reactstrap";
import "../../styles/sidebarleft.css"

export const AddContactPopover = (props) => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const userId= JSON.parse(localStorage.getItem('userId'))
    const user_id = parseInt(userId.id);

    const handleClick = () =>{
        if (name !== "" && email !== "") {
            actions.addNewContact(name, email, user_id)
            actions.getUserContacts()
            setName("")
            setEmail("")
            actions.getUserContacts()
          }
    }

       
    return (
        <Popover className="add-contact" placement="right" isOpen={props.isOpen} target={props.target}>
            <PopoverHeader className="add-contact-header">Agregar un nuevo contacto<i className="ms-2 fa-solid fa-xmark close-btn" onClick={props.onClose} ></i></PopoverHeader>
            <PopoverBody>
                <Input name="name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <Input className="mt-2" name="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="add-btn mt-3" onClick={handleClick}>Agregar</button>
            </PopoverBody>
        </Popover>
    );
}
    
