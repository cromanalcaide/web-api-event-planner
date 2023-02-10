import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

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
            <div>
                You are IN
            </div>
        ) : (
        <div> You need to login to enter this page </div> 
        )}

        </div>
    )
};