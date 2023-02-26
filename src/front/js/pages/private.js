import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import {LeftSideBar} from "../component/sidebarleft"
import { ViewTitle } from "../component/viewTitle";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState("")
    // const token = localStorage.getItem("token");

    const getUser = async () => {
      const user = await actions.getUserData();
      setUserData(user);
    };
      
    useEffect(() => {
      store.token && store.token != "" && store.token != undefined && getUser();
    }, [store.token]);

    
    return (
      
        <div> {store.token && store.token != "" && store.token != undefined ? (
          <div className="dash-container">
            <div className="col-3">
                <LeftSideBar className="side-bar"/>
            </div>
            <div className="col">
              <ViewTitle title="Dashboard"/>
            </div>
          </div> 
        ) : (
        <div> You need to login to enter this page </div> 
        )}

        </div>
    )
};