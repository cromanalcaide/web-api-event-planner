import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import {LeftSideBar} from "../component/sidebarleft"
import { ViewTitle } from "../component/viewTitle";
import { useNavigate } from "react-router-dom";


export const Private = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState("")
    const navigate = useNavigate();

    const getUser = async () => {
      const user = await actions.getUserData();
      setUserData(user);
    };
      
    const token = localStorage.getItem("token")
    useEffect(() => {
      if (!token) { 
        navigate("/login");
      } else {
        getUser();
      }
    }, [token, navigate]);

    
    return (
      
        <div> {token && token != "" && token != undefined ? (
          <div className="dash-container">
            <div className="column">
                <LeftSideBar />
            </div>
            <div className="col">
              <ViewTitle title="Dashboard" className="dash-title"/>
              <button className="btn add-event"><i className="fa-solid fa-plus plus-btn"></i>Crear Evento</button>
            </div>
            {/* <div className="col">
              sidebar de la derecha
            </div> */}
          </div> 
        ) : (
        <div> You need to login to enter this page </div> 
        )}

        </div>
    )
};