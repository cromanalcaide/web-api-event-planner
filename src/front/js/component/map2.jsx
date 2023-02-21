import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/mapcomponent2.css";

export const MapComponent2 = () => {
  useEffect(() => {
    const map = L.map("map").setView([51.509, -0.08], 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // function onMapClick(e) {
    //   alert("You clicked the map at " + e.latlng);
    // }

    // map.on("click", onMapClick);

    var popup = L.popup();

    const onMapClick = (e) => {
      popup
        .setLatLng(e.latlng)
        .setContent("Has clickado en" + e.latlng.toString())
        .openOn(map);
    };

    map.on("click", onMapClick);
  }, []);

  return (
    <div className="mapCard card col-l-5 col-md-5 col-sm-10 col-xs-10">
      <div className="card-body">
        <p className="card-title">Ubicación de tus próximos eventos</p>
      </div>
      <div className="mapContainer">
        <div id="map"></div>
      </div>
      <div className="bg-white"></div>
    </div>
  );
};
