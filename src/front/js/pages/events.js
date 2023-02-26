import React from "react";
import { Nextevent } from "../component/nextevent";
import { Printeventslist } from "../component/printeventslist"
import "../../styles/events.css"


export const Events = () => {
    return(
            <div className = "row dash-div">
                <Nextevent/> 
                <Printeventslist/>
            </div>)
};