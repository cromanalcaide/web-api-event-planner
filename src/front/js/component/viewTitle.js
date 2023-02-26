import React from "react";
import "../../styles/private.css"


export const ViewTitle = (title) => {

    return (
        <div className="view-title-container">
            <span className="view-title"> {title.title} </span>
        </div>
    )
}