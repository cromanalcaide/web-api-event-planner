import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Geocoding } from "../component/geocoding";

import "../../styles/eventsform.css"



export const Eventsform = () => {
  

  return (
    <div className="eventsform-form">
      <Geocoding/>
    </div>
  );
};

