import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import L from 'leaflet';
import "../../styles/mapcomponent.css";

export const MapComponent = () => {
    const { store, actions } = useContext(Context);
  
    const params = useParams();
    const userId = JSON.parse(localStorage.getItem('userId'))
  
    let presentEvent = store.events.filter(el => el.id == params.theid);
    
    var latitud = presentEvent[0]?.lati
    var longitud = presentEvent[0]?.longi
    console.log(latitud, longitud)


    useEffect(() => {
        if (longitud && latitud) {
            const map = L.map("map").setView([longitud, latitud], 15);
            var marker = L.marker([longitud, latitud]).addTo(map);

            marker.bindPopup("<b>¡El evento es aquí!</b>").openPopup();

    
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
    
            var popup = L.popup();
    
            const onMapClick = (e) => {
                popup
                    .setLatLng(e.latlng)
                    .setContent("Has clickado en" + e.latlng.toString())
                    .openOn(map);
            };
    
            map.on("click", onMapClick);
        }
    }, [longitud, latitud]);

    return (
        <div className="map-div">
            <div className="title-div">
                <p className="map-title">Ubicación del evento</p>
            </div>
            <div className="mapContainer">
                <div id="map"></div>
            </div>
            <div className="bg-white"></div>
        </div>
    );
};