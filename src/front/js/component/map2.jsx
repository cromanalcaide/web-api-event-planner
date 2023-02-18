import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/mapcomponent2.css";

export const MapComponent2 = () => {
  useEffect(() => {
    const map = L.map("map").setView([51.509, -0.08], 15);

    let polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047],
    ]).addTo(map);

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
        .setContent("badabim badabum " + e.latlng.toString())
        .openOn(map);
    };

    map.on("click", onMapClick);
  }, []);

  return (
    <div className="mapCard card col-l-5 col-md-5 col-sm-10 col-xs-10">
      <div className="card-body">
        <h5 className="card-title">Texto de la polaroid</h5>
      </div>
      <div className="mapContainer">
        <div id="map" onClick></div>
      </div>
      <div className="bg-white"></div>
    </div>
  );
};
