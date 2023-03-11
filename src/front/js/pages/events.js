import React from "react";
import { Nextevent } from "../component/nextevent";
import { Printeventslist } from "../component/printeventslist";
import { Calendar } from "../component/calendar";
import "../../styles/events.css"


export const Events = () => {
    return(
            <div className = "row dash-div">
                <Nextevent/> 
                <Printeventslist/>
                <Calendar/>
            </div>)
};