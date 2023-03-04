
import React, { useState, useRef, useEffect } from 'react';

export const Geocoding = () => {
    const [address, setAddress] = useState('');
    console.log(address)
    const inputRef = useRef(null);
    const apiKey = process.env.REACT_APP_GOOGLEPLACES_API_KEY;
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            const autocomplete = new 
            window.google.maps.places.Autocomplete(inputRef.current);
            autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            const selectedAddress = 
            place.formatted_address;
            setAddress(selectedAddress);
            
            const geocoder = new 
            window.google.maps.Geocoder();
            geocoder.geocode({ address: selectedAddress }, 
            (results, status) => {

                    if (status === "OK") { 
                        
                        console.log(`Latitud: ${results[0].geometry.location.lat()}, Longitud: ${results[0].geometry.location.lng()}`);
                    } else {
                        console.error("No se pudo obtener la ubicación para la dirección especificada");
                    }
                });
            });
           
        };

        return () => {
            document.body.removeChild(script);
        }}, [apiKey]);
        return (
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Location</label>
                <input
                    className="form-control"
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ref={inputRef}
                />
            </div>
        );
};