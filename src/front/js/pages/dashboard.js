import React from "react";
import { Nextdate } from "../component/nextdate";
import { Printeventslist } from "../component/printeventslist"
import "../../styles/dashboard.css"


export const Dashboard = () => {
    return(
            <div className = "row dash-div">
                <Nextdate/> 
                <Printeventslist/>
            </div>)
};