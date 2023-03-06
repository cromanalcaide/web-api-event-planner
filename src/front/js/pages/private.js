import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { LeftSideBar } from "../component/sidebarleft"
import { ViewTitle } from "../component/viewTitle";
import { useNavigate } from "react-router-dom";
import { Nextevent } from "../component/nextevent";
import { CreateEventForm } from "../component/createevent";

import { PrintEventsList } from "../component/printEventsList";


export const Private = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState("")
  const [loading, setLoading] = useState(true)
  const [showCreateEvent, setShowCreateEvent] = useState(false);

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
      setLoading(false)
    }
  }, [token, navigate]);

  const handleCreateEventClick = () => {
    setShowCreateEvent(true);
  };

  return (
    <div>
      {loading ? (
        <div className="spinner-div" id="container">
          <svg viewBox="0 0 100 100">
            <circle id="spinner" cx="50" cy="50" r="45" />
          </svg>
        </div>
      ) : (
        <div>
          {token && token != "" && token != undefined ? (
            <div className="dash-container">
              <div className="column">
                <LeftSideBar />
              </div>
              <div className="col">
                <ViewTitle title="Dashboard" className="dash-title" />
                <button
                  className="add-event"
                  onClick={handleCreateEventClick}
                >
                  <i className="fa-solid fa-plus plus-btn"></i>Crear Evento
                </button>
                {!showCreateEvent ? (
                  <>
                    <Nextevent />
                    <PrintEventsList />
                  </>
                ) : (
                  <CreateEventForm className="create-event-container" />
                )}
              </div>
            </div>
          ) : (
            <div> You need to login to enter this page </div>
          )}
        </div>
      )}
    </div>
  );
};