import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/mapcomponent2.css";

export const MapComponent3 = () => {
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 51.509, lng: -0.08 },
      zoom: 15,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: 51.509, lng: -0.08 },
      map: map,
      title: "Has clickado aquí",
    });

    const infowindow = new window.google.maps.InfoWindow({
      content: "Has clickado aquí",
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    const onMapClick = (e) => {
      marker.setPosition(e.latLng);
      infowindow.setContent("Has clickado en " + e.latLng.toString());
      infowindow.open(map, marker);
    };

    map.addListener("click", onMapClick);
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
