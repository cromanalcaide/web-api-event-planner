import React, { useState, useRef, useEffect } from 'react';
import { Geocoding } from './geocoding.js';

export const NextEventsMap = () => {
    const [map, setMap] = useState(null);
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState('');
    const inputRef = useRef(null);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        const initMap = () => {
            const center = { lat: 41.3760204, lng: 2.1685669 };
            const map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center,
            });
            setMap(map);

            const marker = new window.google.maps.Marker({
                position: center,
                map: map,
            });
        };

        if (window.google) {
            initMap();
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
            script.defer = true;
            document.body.appendChild(script);

            window.initMap = initMap;

            return () => {
                document.body.removeChild(script);
                delete window.google;
            };
        }
    }, [apiKey]);

    return (
        <div>
            {/* <Geocoding setLatitude={setLatitude} setLongitude={setLongitude} /> */}
            <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                // setLatitude={setLatitude}
                // setLongitude={setLongitude}
                ref={inputRef}
            />
            <div id="map" style={{ height: '500px' }} />
        </div>
    );
};
