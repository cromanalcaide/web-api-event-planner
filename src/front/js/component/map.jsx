import React, { useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "../../styles/mapcomponent.css";

export const MapComponent = () => {
  const mapElement = useRef(null);
  const center = [4, 44.4];

  useEffect(() => {
    const map = tt.map({
      key: "EexLvDRGKsJnz6qWU1FpK5YmUgbbsZC1",
      container: mapElement.current,
      center: center,
      zoom: 10,
    });

    new tt.Marker().setLngLat(center).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section>
        <div className="col-l-5 col-md-5 col-sm-10 col-xs-10">
            <div className="mapComponent" ref={mapElement}></div>
        </div>
    </section>
  );
};
