import React, { useEffect, useContext } from "react";
import "../../styles/mapcomponent2.css";
import { Context } from "../store/appContext";

export const MapComponent2 = () => {

    const { store } = useContext(Context);
    const events = store.events;
    // const latitude = events.latitude;
    // const longitude = events.longitude;
    const latitude = 51.509
    const longitude = -0.08

    useEffect(() => {
        const map = L.map("map").setView([latitude, longitude], 15);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const popup = L.popup();

        const onMapClick = (e) => {
            popup
                .setLatLng(e.latlng)
                .setContent("Has clickado en " + e.latlng.toString())
                .openOn(map);
        };

        map.on("click", onMapClick);
    }, []);

    return (
        <div className="mapCard card col-l-5 col-md-5 col-sm-10 col-xs-10">
            <div className="card-body">
                <p className="card-title">Ubicación del evento</p>
            </div>
            <div className="mapContainer">
                <div id="map"></div>
            </div>
            <div className="bg-white"></div>
        </div>
    );
};